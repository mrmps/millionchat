import { kv } from '@vercel/kv'
import {
  OpenAIStream,
  StreamingTextResponse,
} from 'ai'
import OpenAI from 'openai'
import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import Exa from 'exa-js'
import { Ratelimit } from "@upstash/ratelimit";

import { z } from 'zod'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(100, "180 m"),
})



export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  let newData = json.dataOriginal;
  const userId = (await auth())?.user.id
  const author = await auth()

  console.log('User ID:', userId)
  console.log('Author:', author)

  if (!userId) {
    return new Response('Please sign in', {
      status: 401
    })
  }

  const ip = req.headers.get("x-forwarded-for") ?? ""
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too many requests. Limit is 40 requests every 3 hours. To increase your limit, contact support.', {
      status: 429
    })
  }

  if (previewToken) {
    openai.apiKey = previewToken
  }

  if (!process.env.EXA_API_KEY) {
    return new Response('Please set the EXA_API_KEY environment variable', {
      status: 500
    })
  }

  const exa = new Exa(process.env.EXA_API_KEY)

  //   const SingleResultSchema = z.object({
  //     title: z.string().nullable(),
  //     url: z.string(),
  //     publishedDate: z.string(),
  //     author: z.string(),
  //     id: z.string(),
  //     highlights: z.array(z.string()), // Updated to an array of strings
  // });

  //   const ResultsSchema = z.object({
  //     results: z.array(SingleResultSchema),
  //     autopromptString: z.string().nullable(),
  //   })

  const autoPromptedResults = await exa.searchAndContents(
    JSON.stringify(messages),
    {
      useAutoprompt: true,
      includeDomains: ['twitter.com', 'x.com'],
      highlights: {
        hightlightsPerUrl: 1,
        numSentences: 2,
        query: messages[messages.length - 1].content
      }
    }
  )

  if (messages && messages.length > 0) {
    newData.push({
      id: messages[messages.length - 1]?.id ?? null, //this is the user message id
      autoprompt: autoPromptedResults.autopromptString || null,
      tweets: autoPromptedResults.results.map(result => result.url)
    })
  }

  console.log('newData after pushing:', newData)
  function cleanText(text: string) {
    const removedEnd = text.replace('<|endoftext|>', '')
    const result = removedEnd.replace(/(\|.*\|)|(<\/div>).*/, '')

    console.log('result after cleaning:', result)
    console.log('result length:', result.length)

    return result
  }

  const messagesWithoutId = messages.map(
    (message: { role: string; content: string }) => {
      return {
        role: message.role,
        content: message.content
      }
    }
  )

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messagesWithoutId.slice(0, -1),
      {
        role: 'system',
        content: `Using the following context: ${JSON.stringify(autoPromptedResults.results.map(result => cleanText(result.highlights[0])))} answer the following question: ${messages[messages.length - 1].content}`
      }
    ],
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    onFinal: async completion => {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        dataOriginal: newData,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}

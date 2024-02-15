import { type Message, JSONValue } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { Tweet } from 'react-tweet'
import { CarouselSpacing } from './carousel-spacing'


type Data = {
  id: string | null;
  autoprompt: string;
  tweets: string[];
}[];

export interface ChatList {
  messages: Message[],
  data?: JSONValue[] | undefined;
  isLoading: boolean
}


export function ChatList({ messages, data, isLoading }: ChatList) {
  if (!messages.length) {
    return null
  }

  function getEverythingAfterLastSlash(url: string) {
    return url?.split('/').pop()
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => {
        const previousMessageId = messages[index-1]?.id;
        const relatedData = (data as Data)?.find((m: any) => m.id === previousMessageId);
        const tweetUrl = relatedData?.tweets.filter((t: any) => getEverythingAfterLastSlash(t)?.length == 19);
        let tweetIds = tweetUrl ? tweetUrl.map((t: string) => getEverythingAfterLastSlash(t)).filter(Boolean) : [];
        let t = tweetIds.filter((id: string | undefined): id is string => id !== undefined)
        

        return (
          <div key={index}>
            <ChatMessage message={message} />
            {/* <div>{JSON.stringify(data)}</div> */}
            {index < messages.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )}
            {message.role === 'assistant' && !(isLoading && index === messages.length - 1) && t && <CarouselSpacing tweets={t} />}
          </div>
        );
      })}
    </div>
  )
}

import { type Message, JSONValue } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
  data?: JSONValue[] | undefined
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

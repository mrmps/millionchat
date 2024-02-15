import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import type { Message } from 'ai'

export default function NewPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const id = nanoid()

  const firstMessage = {
    id: nanoid(),
    role: 'user' as const,
    content: Array.isArray(searchParams.q) ? searchParams.q.join(' ') : searchParams.q || 'You are a helpful assistant.',
  }

  return <Chat id={id} initialMessages={[firstMessage]} />
  // firstMessage={searchParams.q ? firstMessage : undefined}

  
}


'use client'

import { type SetStateAction, useEffect, useRef, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import TextareaAutosize from 'react-textarea-autosize'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

export const SearchTextarea = () => {
  const router = useRouter()
  const [textareaHeight, setTextareaHeight] = useState(44) // Default height
  const [isTextareaActive, setIsTextareaActive] = useState(false)
  const [textareaContent, setTextareaContent] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null) // Typed ref

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current?.focus()
    }
  }, [])

  const handleTextareaChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setTextareaContent(e.target.value)
  }

  const handleFocus = () => {
    setIsTextareaActive(true)
  }

  const handleBlur = () => {
    setIsTextareaActive(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // do nothing
    } else if (e.key === 'Enter' && !e.metaKey) {
      e.preventDefault()
      router.push(`/new?q=${textareaContent}`)
    }
  }

  const buttonColorClass =
    isTextareaActive && textareaContent ? 'text-white' : 'text-zinc-400'

  return (
    <>
    <div className="m-auto flex w-full max-w-lg flex-col" >
      <div
        className="min-h-12 relative z-10 flex items-start justify-center rounded-3xl px-2 shadow-sm shadow-black"
        style={{
          boxShadow: 'inset 0 -6px 12px rgba(0, 0, 0, 0.85)', // More pronounced shadow for a deeper indentation effect
          background: 'linear-gradient(to right, #1C1C1E, #1C1C1C, #1C1C1E)' // Gradient background for visual depth
        }}
      >
        {/* Left Section with Inset Shadow */}
        <div
          className="flex flex-col items-center justify-center rounded-l-full"
          style={{ boxShadow: 'inset -2px 0 4px rgba(0, 0, 0, 0.75)' }} // Increased shadow for consistent indentation
        >
          <div className="relative -ml-2 mt-[3px] flex">
            <Image
              alt="Avatar"
              className="animate-rotate relative flex size-10 shrink-0 items-center justify-center rounded-full"
              src="/magic-ball.png"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div
          className="flex min-w-0 flex-1 items-center self-stretch"
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adding a shadow for a raised effect
            margin: '2px', // Optional: Slight margin for visual separation
            borderRadius: '8px' // Optional: Soften edges
          }}
        >
          <div
            id="textarea-container"
            style={{
              height: textareaHeight,
              transition: 'height 0.3s ease-out'
            }}
            className="relative flex min-h-full w-full items-center"
          >
            <label htmlFor="home-prompt" className="sr-only">
              Prompt
            </label>
            <div className="relative flex min-w-0 flex-1 self-start mr-3">
              <TextareaAutosize
                id="home-prompt"
                maxLength={1000}
                className="color-picker min-w-[50%] flex-[1_0_50%] resize-none overflow-auto border-0 bg-transparent py-3 pl-2 text-base text-white shadow-none outline-none ring-0 selection:bg-[#caf807] selection:text-black placeholder:text-zinc-400 focus:ring-0 disabled:bg-transparent disabled:opacity-80 sm:min-h-[15px] sm:leading-6 md:text-sm"
                spellCheck="false"
                placeholder="Ask anything"
                minRows={1}
                maxRows={20}
                onHeightChange={height => setTextareaHeight(height)}
                onChange={handleTextareaChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                ref={textareaRef}
              />
            </div>
            <button
              type="button"
              id="send-button"
              className={`flex items-center ${buttonColorClass}`}
            >
              <span className="sr-only">Send</span>
              <PaperAirplaneIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
      {textareaContent && (
        <div className="text-sm text-white bg-zinc-900 p-2 rounded-md shadow-lg flex items-center mt-2"
        style={{
          boxShadow: 'inset 0 -6px 12px rgba(0, 0, 0, 0.85)', // More pronounced shadow for a deeper indentation effect
          background: 'linear-gradient(to right, #1C1C1E, #1C1C1C, #1C1C1E)' // Gradient background for visual depth
        }}
        >
          <Search className="size-5 mr-2" />
          <p className="font-bold truncate max-w-[15ch]">{`${textareaContent}`}</p>
          <Button
            type="button"
            id="ask-copilot-button"
            className="ml-2 flex items-center"
          >
            <span className="sr-only">Ask Copilot</span>
            <Button className="size-5" />
          </Button>
        </div>
      )}
    </div>

    </>
  )
}

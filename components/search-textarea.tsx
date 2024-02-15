"use client"

import { type SetStateAction, useEffect, useRef, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/navigation';

export const SearchTextarea = () => {
  const router = useRouter();
  const [textareaHeight, setTextareaHeight] = useState(44); // Default height
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const [textareaContent, setTextareaContent] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Typed ref

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current?.focus();
    }
  }, []);

  const handleTextareaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTextareaContent(e.target.value);
  };

  const handleFocus = () => {
    setIsTextareaActive(true);
  };

  const handleBlur = () => {
    setIsTextareaActive(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // do nothing
    } else if (e.key === 'Enter' && !e.metaKey) {
      e.preventDefault();
      router.push(`/new?q=${textareaContent}`);
    }
  };

  // Determine button color based on textarea content and activity
  const buttonColorClass = isTextareaActive && textareaContent ? 'text-white' : 'text-zinc-400';

  return (
    <div id="textarea-container" style={{ height: textareaHeight, transition: 'height 0.3s ease-out' }} className="relative flex min-h-full w-full items-center">
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
          onHeightChange={(height) => setTextareaHeight(height)}
          onChange={handleTextareaChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />
      </div>
      <button type="button" id="send-button" className={`flex items-center ${buttonColorClass}`}>
        <span className="sr-only">Send</span>
        <PaperAirplaneIcon className="size-5" />
      </button>
    </div>
  );
};

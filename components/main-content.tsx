import { SearchTextarea } from "./search-textarea";
import Image from "next/image";

export const MainContent = () => {
  return (
    <main className="flex-1 overflow-auto bg-[#F8F8F7]">
      <h1 className="sr-only">ChatWithBirdApp</h1>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0 mx-auto my-10 mt-36">
        <a
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          {/* <Twitter className="h-5 w-5 text-[#1d9bf0]" /> */}
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing Precedent
          </p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
        >
          Search Twitter with AI
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          Discover relevant tweets or chat with our Twitter AI
        </p>
      </div>
      <div className="my-12 flex items-center justify-center pb-[26vh]">
        <div className="absolute flex w-full justify-center px-6">
          

            
              <form className="size-full">
             
                <SearchTextarea />
             
              </form>
     
          <div className="absolute top-full mx-auto mt-6 flex max-w-full flex-wrap items-center justify-center gap-2 whitespace-nowrap px-4 text-sm">
            <button className="inline-flex select-none items-center gap-1 whitespace-nowrap rounded-full border border-zinc-200 px-2 py-0.5 hover:border-zinc-400 hover:bg-zinc-200">
              Get inspirations
            </button>
            <button className="inline-flex select-none items-center gap-1 whitespace-nowrap rounded-full border border-zinc-200 px-2 py-0.5 hover:border-zinc-400 hover:bg-zinc-200">
              Check latest news
            </button>
            <button className="inline-flex select-none items-center gap-1 whitespace-nowrap rounded-full border border-zinc-200 px-2 py-0.5 hover:border-zinc-400 hover:bg-zinc-200">
              Research a topic
            </button>
            <button className="inline-flex select-none items-center gap-1 whitespace-nowrap rounded-full border border-zinc-200 px-2 py-0.5 hover:border-zinc-400 hover:bg-zinc-200">
              Explain a concept
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
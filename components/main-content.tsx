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
          <div
            className="min-h-12 relative z-10 m-auto flex w-full max-w-lg items-start justify-center rounded-3xl px-2 shadow-sm shadow-black"
            style={{
              boxShadow: "inset 0 -6px 12px rgba(0, 0, 0, 0.85)", // More pronounced shadow for a deeper indentation effect
              background:
                "linear-gradient(to right, #1C1C1E, #1C1C1C, #1C1C1E)", // Gradient background for visual depth
            }}
          >
            {/* Left Section with Inset Shadow */}
            <div
              className="flex flex-col items-center justify-center rounded-l-full"
              style={{ boxShadow: "inset -2px 0 4px rgba(0, 0, 0, 0.75)" }} // Increased shadow for consistent indentation
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
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adding a shadow for a raised effect
                margin: "2px", // Optional: Slight margin for visual separation
                borderRadius: "8px", // Optional: Soften edges
              }}
            >
              <form className="size-full">
                <SearchTextarea />
              </form>
            </div>
          </div>
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
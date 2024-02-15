"use client"

import * as React from 'react'
import { useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Tweet } from 'react-tweet'

interface CarouselSpacingProps {
  tweets: string[]
}

interface SafeTweetProps {
  id: string
  options?: object
  onError?: (error: Error) => void
}

// Modified SafeTweet component
const SafeTweet = ({ id, options, onError }: SafeTweetProps) => {
  return <Tweet id={id} onError={onError} />;
};

// Modified CarouselSpacing component
export function CarouselSpacing({ tweets }: CarouselSpacingProps) {
  const [errorTweetIds, setErrorTweetIds] = useState<Set<string>>(new Set());

  const handleError = (id: string) => (error: Error) => {
    console.error(error);
    setErrorTweetIds(new Set(errorTweetIds.add(id)));
  };

  return (
    <Carousel className="w-full max-w-sm sm:max-w-full mx-auto">
      <CarouselContent>
        {tweets.map((tweet: string, index: number) => {
          if (errorTweetIds.has(tweet)) {
            return null; // Skip rendering this CarouselItem if an error occurred
          }

          return (
            <CarouselItem key={index} className="ml-8 md:basis-1/2 lg:basis-10/12">
              <div className="p-1">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <SafeTweet id={tweet} onError={handleError(tweet)} />
                </CardContent>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
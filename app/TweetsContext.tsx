'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

export interface Tweet {
  id: number;
  userId: number;
  username: string;
  content: string;
  createdAt: string;
}

interface TweetsContextType {
  tweets: Tweet[];
  addTweet: (tweet: Tweet) => void;
  updateTweet: (tweet: Tweet) => void;
  deleteTweet: (id: number) => void;
}

const TweetsContext = createContext<TweetsContextType | undefined>(undefined);

export function TweetsProvider({ children }: { children: React.ReactNode }) {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setTweets(data.map((post: any) => ({
        id: post.id,
        userId: post.userId,
        username: `user${post.userId}`,
        content: post.body,
        createdAt: new Date().toISOString(),
      }))))
  }, []);

  const addTweet = (newTweet: Tweet) => {
    setTweets(prevTweets => [newTweet, ...prevTweets]);
  }

  const updateTweet = (updatedTweet: Tweet) => {
    setTweets(prevTweets => prevTweets.map(tweet => 
      tweet.id === updatedTweet.id ? updatedTweet : tweet
    ));
  }

  const deleteTweet = (id: number) => {
    setTweets(prevTweets => prevTweets.filter(tweet => tweet.id !== id));
  }

  return (
    <TweetsContext.Provider value={{ tweets, addTweet, updateTweet, deleteTweet }}>
      {children}
    </TweetsContext.Provider>
  );
}

export function useTweets() {
  const context = useContext(TweetsContext);
  if (context === undefined) {
    throw new Error('useTweets must be used within a TweetsProvider');
  }
  return context;
}
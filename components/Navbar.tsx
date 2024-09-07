'use client';

import PostButton from './PostButton';

export default function Navbar() {
  return (
    <header className="sticky top-0 container max-w-[1024px] mx-auto py-4 bg-background">
      <nav className="flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium font-sans">@social/network</h1>
        </div>
        <PostButton />
      </nav>
    </header>
  );
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Pen } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { usePosts } from '@/app/PostsContext'

export default function PostButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('')
    const { addPost } = usePosts()

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleSubmit = async () => {
        if (text.trim()) {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        body: text,
                        userId: 0,  // Set userId to 0 for the current user
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                const newPost = await response.json();
                addPost({...newPost, userId: 0});  // Ensure userId is 0 in the added post
                setText('');
                setIsOpen(false);
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full relative"
                    name="post"
                >
                    <Plus size={16} className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <Pen size={16} className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 mx-2">
                <textarea
                    rows={3}
                    className="w-full outline-none resize-none h-full"
                    placeholder="What's on your mind?"
                    onChange={handleTextChange}
                    value={text}
                    maxLength={100}
                    onKeyDown={handleKeyDown}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                    <p>
                        <span className="font-semibold">Enter</span> to post.
                    </p>
                    <p>
                        {text.length}/100
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    )
}
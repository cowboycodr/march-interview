'use client';

import { usePosts, Post } from '@/app/PostsContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  username: string;
}

export default function Posts() {
  const { posts, updatePost, deletePost } = usePosts();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editBody, setEditBody] = useState('');
  const [users, setUsers] = useState<{ [key: number]: User }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const userIds = Array.from(
        new Set(posts.map((post) => post.userId).filter((id) => id !== 0))
      );
      const userPromises = userIds.map((id) =>
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
          res.json()
        )
      );
      const userResults = await Promise.all(userPromises);
      const userMap = userResults.reduce(
        (acc, user) => {
          acc[user.id] = user;
          return acc;
        },
        {} as { [key: number]: User }
      );
      setUsers(userMap);
    };

    fetchUsers();
  }, [posts]);

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setEditBody(post.body);
  };

  const handleUpdate = async (post: Post) => {
    if (post.userId === 0) {
      // For locally created posts, only update local state
      const updatedPost = { ...post, body: editBody };
      updatePost(updatedPost);
      setEditingId(null);
    } else {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              id: post.id,
              title: post.title,
              body: editBody,
              userId: post.userId,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }
        );

        if (response.ok) {
          // If server update is successful, update local state
          const updatedPost = { ...post, body: editBody };
          updatePost(updatedPost);
          setEditingId(null);
        } else {
          throw new Error('Failed to update post on the server');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const postToDelete = posts.find((post) => post.id === id);
    if (!postToDelete) return;

    if (postToDelete.userId === 0) {
      // For locally created posts, only delete from local state
      deletePost(id);
    } else {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          // If server deletion is successful, delete from local state
          deletePost(id);
        } else {
          throw new Error('Failed to delete post on the server');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const getUserDisplay = (userId: number) => {
    if (userId === 0) return 'You';
    return users[userId]?.username.toLowerCase() || `User ${userId}`;
  };

  return (
    <div>
      {posts.map((post) => (
        <div className="py-4 border-t space-y-2" key={post.id}>
          {editingId === post.id ? (
            <div className="space-y-2">
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <div className="space-x-2">
                <Button onClick={() => handleUpdate(post)}>Save</Button>
                <Button variant="outline" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p>{post.body}</p>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Posted by{' '}
                  <span className="font-bold">
                    {getUserDisplay(post.userId)}
                  </span>{' '}
                  • Post <span className="font-bold">{post.id}</span>
                </p>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(post)}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(post.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

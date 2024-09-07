# Social Network CRUD Application

This is a Next.js application that demonstrates CRUD operations on posts using the JSONPlaceholder API.

## Features

- View all posts
- Create new posts (assigned to user ID 0)
- Edit posts (only for posts with user ID 0)
- Delete posts (only for posts with user ID 0)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Implementation Notes

- The application uses a context provider (`PostsContext`) to manage the global state of posts.
- CRUD operations are simulated using the JSONPlaceholder API.
- New posts are assigned a user ID of 0, which allows them to be edited and deleted by the current user.
- Edit and delete operations are only available for posts with a user ID of 0.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

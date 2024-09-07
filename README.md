# Social Network CRUD Application

This is a Next.js application that demonstrates CRUD operations on posts using the JSONPlaceholder API.

## Features

- View all posts from JSONPlaceholder API
- Create new posts (assigned to user ID 0)
- Edit posts (for this demo, all posts can be edited)
- Delete posts (all posts can be deleted)
- Responsive design using Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

> Also it is hosted on Vercel, you can check it out [here](https://march-interview-xi.vercel.app/)

## Implementation Notes

- The application uses a context provider (`PostsContext`) to manage the global state of posts.
- CRUD operations are simulated using the JSONPlaceholder API.
- New posts are assigned a user ID of 0, which allows them to be edited and deleted by the current user.
- Edit and delete operations are only available for posts with a user ID of 0.

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- Radix UI primitives

## API Integration

This project uses the JSONPlaceholder API for simulating CRUD operations on posts. The API endpoints used are:

- GET /posts: Fetch all posts
- GET /users: Fetch all users
- POST /posts: Create a new post
- PUT /posts/{id}: Update an existing post
- DELETE /posts/{id}: Delete a post

## Notes

I made the app more of a twitter clone, by ommitting the title. I also gave the user the ability to edit/delete ANYONE's post so that it would better showcase the CRUD functionality.

Since the API is ephemeral, and the data is not persisted, all edits/deletes are stored locally.

Additionally, the user's posts are created with a user ID of 0, which allows them to be edited and deleted by the current user.

If I was planning on releasing this project to the public, I would have added authentication and authorization, so that each user can only edit/delete their own posts. Additionally, I would aggregate the users/ and the posts so that their would not be a flicker on the initial page load. 

Also the UI is a little experimental (the post input popover) because this is a demo and I wanted to try something new.

There is definitely some room for improvement, but I wanted to get it in front of you as fast as possible. If there are any questions, modifications, or suggestions, please let me know.

Thank you for your time and consideration!
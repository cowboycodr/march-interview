export async function getPosts() {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/users'),
  ]);

  const posts = await postsResponse.json();
  const users = await usersResponse.json();

  const postsWithUsers = posts.map((post: any) => {
    const user = users.find((user: any) => user.id === post.userId);
    return {
      ...post,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    };
  });

  return postsWithUsers;
}
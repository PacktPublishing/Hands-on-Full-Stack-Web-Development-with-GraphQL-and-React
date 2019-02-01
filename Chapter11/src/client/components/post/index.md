Post example:

```js
  const post = {
    id: 3,
    text: "This is a test post!",
    user: {
      avatar: "/uploads/avatar1.png",
      username: "Test User"
    }
  };

  <Post key={post.id} post={post} />
```
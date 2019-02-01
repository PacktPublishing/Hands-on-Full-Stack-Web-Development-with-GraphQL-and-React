const typeDefinitions = `
  type User {
    id: Int
    avatar: String
    username: String
  }

  type Post {
    id: Int
    text: String
    user: User
  }

  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }

  type Chat {
    id: Int
    messages: [Message]
    users: [User]
    lastMessage: Message
  }

  type PostFeed {
    posts: [Post]
  }

  input PostInput {
    text: String!
  }
  
  input UserInput {
    username: String!
    avatar: String!
  }

  input ChatInput {
    users: [Int]
  }

  input MessageInput {
    text: String!
    chatId: Int!
  }

  type Response {
    success: Boolean
  }

  type UsersSearch {
    users: [User]
  }
  
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
    addChat (
      chat: ChatInput!
    ): Chat
    addMessage (
      message: MessageInput!
    ): Message
    updatePost (
      post: PostInput!
      postId: Int!
    ): Post
    deletePost (
      postId: Int!
    ): Response
  }

  type RootQuery {
    posts: [Post]
    chats: [Chat]
    chat(chatId: Int): Chat
    postsFeed(page: Int, limit: Int): PostFeed
    usersSearch(page: Int, limit: Int, text: String!): UsersSearch
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
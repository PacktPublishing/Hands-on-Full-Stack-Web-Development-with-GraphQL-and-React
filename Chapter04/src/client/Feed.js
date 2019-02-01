import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from "react-apollo";
import InfiniteScroll from 'react-infinite-scroller';

const GET_POSTS = gql`
  query postsFeed($page: Int, $limit: Int) { 
    postsFeed(page: $page, limit: $limit) { 
      posts {
        id
        text
        user {
          avatar
          username
        }
      }
    }
  }
`;

const ADD_POST = gql`
  mutation addPost($post : PostInput!) {
    addPost(post : $post) {
      id
      text
      user {
      username
      avatar
    }
  }
}`;

export default class Feed extends Component {
    state = {
        postContent: '',
        hasMore: true,
        page: 0,
    }
    handlePostContentChange = (event) => {
        this.setState({postContent: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            id: this.state.posts.length + 1,
            text: this.state.postContent,
            user: {
                avatar: '/uploads/avatar3.png',
                username: 'Fake User'
            }
        };
        this.setState((prevState) => ({
            posts: [newPost, ...prevState.posts],
            postContent: ''
        }));
    }
    loadMore = (fetchMore) => {
        const self = this;
        const { page } = this.state;
       
        fetchMore({
          variables: {
            page: page+1,
          },
          updateQuery(previousResult, { fetchMoreResult }) {
            if(!fetchMoreResult.postsFeed.posts.length) {
              self.setState({ hasMore: false });
              return previousResult;
            }
       
            self.setState({ page: page + 1 });
            
            const newData = {
              postsFeed: {
                __typename: 'PostFeed',
                posts: [
                  ...previousResult.postsFeed.posts,
                  ...fetchMoreResult.postsFeed.posts
                ]
              }
            };
            return newData;
          }
        });
    }
    render() {
        const self = this;
        const { postContent, hasMore } = this.state;
      
        return (
            <Query query={GET_POSTS} variables={{page: 0, limit: 10}}>
                {({ loading, error, data, fetchMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return error.message;

                const { postsFeed } = data;
                const { posts } = postsFeed;
      
                return (
                    <div className="container">
                        <div className="postForm">
                            <Mutation mutation={ADD_POST}
                                update = {(store, { data: { addPost } }) => {
                                    const variables = { page: 0, limit: 10 };
                                    const data = store.readQuery({ query: GET_POSTS, variables });
                                    data.postsFeed.posts.unshift(addPost);
                                    store.writeQuery({ query: GET_POSTS, variables, data });
                                }}
                                optimisticResponse= {{
                                    __typename: "Mutation",
                                    addPost: {
                                        __typename: "Post",
                                        text: postContent,
                                        id: -1,
                                        user: {
                                            __typename: "User",
                                            username: "Loading...",
                                            avatar: "/public/loading.gif"
                                        }
                                    }
                                }}>
                                    {addPost => (
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            addPost({ variables: { post: { text: postContent } } }).then(() => {
                                                self.setState((prevState) => ({
                                                postContent: ''
                                                }));
                                            });
                                            }}>
                                            <textarea value={postContent} onChange={self.handlePostContentChange} placeholder="Write your custom post!"/>
                                            <input type="submit" value="Submit" />
                                        </form>
                                    )}
                            </Mutation>
                        </div>
                        <div className="feed">
                            <InfiniteScroll
                                loadMore={() => self.loadMore(fetchMore)}
                                hasMore={hasMore}
                                loader={<div className="loader" key={"loader"}>Loading ...</div>}
                            >
                                {posts.map((post, i) =>
                                    <div key={post.id} className={"post " + (post.id < 0 ? "optimistic": "")}>
                                        <div className="header">
                                            <img src={post.user.avatar} />
                                            <h2>{post.user.username}</h2>
                                        </div>
                                        <p className="content">
                                            {post.text}
                                        </p>
                                    </div>
                                )}
                            </InfiniteScroll>
                        </div>
                    </div>
                )
            }}
          </Query>
        )
    }
}
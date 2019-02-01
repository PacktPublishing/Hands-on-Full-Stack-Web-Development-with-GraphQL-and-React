import React, { Component } from 'react';
import PostsQuery from './components/queries/postsFeed';
import AddPostMutation from './components/mutations/addPost';
import FeedList from './components/post/feedlist';
import PostForm from './components/post/form';

export default class Feed extends Component {
  render() {
    const query_variables = { page: 0, limit: 10};
 
    return (
      <div className="container">
        <AddPostMutation variables={query_variables}>
          <PostForm />
        </AddPostMutation>
        <PostsQuery variables={query_variables}>
          <FeedList/>
        </PostsQuery>
      </div>
    )
  }
}
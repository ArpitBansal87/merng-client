import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import useFormElements from "../utils/useFormElements";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const { inputs, handleInputChange, handleSubmit } = useFormElements(
    {
      body: " ",
    },
    createPostCallback
  );

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: inputs,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log(data.getPosts);
      console.log(result.data);
      //   data.getPosts.push(result.data.createPosts);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      inputs.body = " ";
    },
  });

  function createPostCallback(event) {
    createPost();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={handleInputChange}
            value={inputs.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{marginBottom: 20}}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;

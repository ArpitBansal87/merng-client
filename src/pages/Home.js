import React, { useContext, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { Button, Grid, Transition, Icon } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY, GET_TRAKT_AUTH_URL } from "../utils/graphql";
import { convertQueryString } from "../utils/utils";

function Home(props) {
  const { user, trakt_access_token, loginTrakt } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const traktData = useQuery(GET_TRAKT_AUTH_URL);
  const params = convertQueryString(props.location.search);

  useEffect(() => {
    if (params.code) {
      loginTrakt(params.code);
      props.history.push("/");
    }
  }, [params, props, loginTrakt]);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
        {user ? (
          traktData.data ? (
            trakt_access_token ? (
              <Button color="google plus" floated="right">
                Trakt Authorized <Icon name="unlinkify" />
              </Button>
            ) : (
              <Button
                color="google plus"
                as="a"
                href={traktData.data.traktLogin.url}
                floated="right"
              >
                <Icon name="linkify" />
                Authorize Trakt
              </Button>
            )
          ) : (
            <Button>Loading</Button>
          )
        ) : (
          <></>
        )}
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;

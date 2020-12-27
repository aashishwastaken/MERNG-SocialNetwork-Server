import React, { useContext } from 'react';
import { useQuery } from "@apollo/client";
import { Grid, Transition } from 'semantic-ui-react';

import '../App.css';
import PostCard from '../components/PostCard';
import NewPost from '../components/NewPost';
import { AuthContext } from '../context/auth';
import {FETCH_POSTS_QUERY} from '../utils/graphqlQueries';
//console.log(document.getElementsByClassName('ui red right floated button'));

export default function Home() {
     const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    if (data) {

        console.log(data);
        return (


            <Grid columns={3} >
                <Grid.Row className="titleTop">
                    <h1 >Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {user && (<Grid.Column id="newPost" style={{ marginBottom: "1.8em" }}>
                        <NewPost />
                    </Grid.Column>)}

                <Transition.Group animation="fly right">
                    {(loading) ? <h4>Loading....</h4> : (data.getPosts ? data.getPosts.map(x => (
                        <Grid.Column key={x.id} style={{ marginBottom: "1.8em" }}>
                            <PostCard post={x} />
                        </Grid.Column>
                    )
                    ) : <h4>Loading...</h4>
                    )
                    }
                </Transition.Group>
                </Grid.Row>

            </Grid>
        );
    }
    return (<h4>Loading...</h4>);

}

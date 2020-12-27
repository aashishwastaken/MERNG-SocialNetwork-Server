import { gql, useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react'
import { Card,Label, Grid, Image, Form, Button, Icon, Transition } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth';
import '../App.css';
import MyPopup from '../utils/MyPopup';

export default function SinglePost(props) {
    const { user } = useContext(AuthContext);

    const postId = props.match.params.postId;
    console.log(postId);

    const { data } = useQuery(FETCH_POST, {
        variables: { postId }
    });
    let commentRef = useRef(null);
    let [comment, setComment] = useState("");
    const [createComment] = useMutation(ADD_COMMENT, {
        update(proxy, result) {
            console.log(result);
            setComment('');
            commentRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })


    let postMarkup;
    if (!data) {
        postMarkup = (<p>Loading...</p>);
    } else {
        const { id, username, body, comments, likes, commentsCount, likesCount, createdAt } = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            size="large"
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card style={{ padding: "1em" }} fluid>
                            <Card.Header style={{ fontWeight: "800" }}>{username}</Card.Header>
                            <Card.Meta>{moment(Number(createdAt)).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>


                            <Card.Content>
                                <LikeButton user={user} post={{ postId: id, likes, likesCount }} />

                                <MyPopup content="Comment" >
                                <Button labelPosition='right' onClick={()=>commentRef.current.focus()}>
                                    <Button basic color='blue'>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label as='a' basic color='blue' style={{height:'2.55rem'}} pointing='left'>
                                        {commentsCount}
                                    </Label>
                                </Button>
                                </MyPopup>
                                {(user && user.username === username && (<DeleteButton postId={id} callback={() => props.history.push("/")} />))}


                            </Card.Content>

                        </Card>
                        <Card fluid>
                            <Card.Content>

                                <h4>Write a Comment</h4>
                                <Form className="commentInput">
                                    <input
                                        type="text"
                                        placeholder="Noooooice!!"
                                        name="commentField"
                                        value={comment}
                                        ref={commentRef}
                                        onChange={(event) => setComment(event.target.value)}
                                    />

                                    <Button type="submit"
                                        disabled={comment.trim() === '' ? true : false}
                                        primary
                                        style={{ margin: 5 }}
                                        onClick={() => createComment()}>
                                        Post</Button>
                                </Form>

                            </Card.Content>
                        </Card>
                        <Transition.Group animation="fly down">
                            {comments.map(x => (
                                <Card fluid key={x.id} style={{ padding: 10 }}>

                                    <Card.Header><h3>{x.username}</h3></Card.Header>
                                    <Card.Meta>{moment(x.createdAt).fromNow()}</Card.Meta>
                                    <Card.Content>
                                        {x.body}
                                        {user && user.username === x.username && (<DeleteButton postId={id} commentId={x.id} />)}
                                    </Card.Content>
                                </Card>
                            ))
                            }
                        </Transition.Group>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );

    }


    return postMarkup;
}

const FETCH_POST = gql`
    query getPost($postId:String!){
  getPost(postId:$postId){
      id
    username
    body
    comments{id username body createdAt}
    likes{username createdAt}
    commentsCount
    likesCount
    createdAt
  }
}`;

const ADD_COMMENT = gql`
mutation createComment($postId:String!,$body:String!){
    createComment(postId:$postId,body:$body){
        id
        comments{ id username body createdAt}
        commentsCount
    }
}`;
import React, {  useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';
import MyPopup from '../utils/MyPopup';

export default function LikeButton({ user, post: { postId, likes, likesCount } }) {

const [liked, setLiked]=useState(false);

const [likePost]=useMutation(LIKE_POST,{
   onError(err){
       console.warn(err);
   },
    variables:{postId:postId}
})

useEffect(()=>{
if(user && likes.find((x) => x.username === user.username)){
    setLiked(true);
}else
    setLiked(false);
},[user,likes]);

    const LikeBtn = user ? (
        liked?(<Button color='teal' >
            <Icon name='heart' />
        </Button>) 
        : (<Button color='teal' basic >
            <Icon name='heart' />
        </Button>))
       :(<Button as={Link} to="/login" color='teal' basic>
              <Icon name='heart' />
        </Button>);


    return (
        <MyPopup content={liked?'Unlike':'Like'} >
        
            <Button as='div' labelPosition='right' onClick={likePost}>
            {LikeBtn}
                <Label as='a' basic color='teal' pointing='left'>
                    {likesCount}
                </Label>
            </Button>
        
        </MyPopup>
    )
}

const LIKE_POST=gql`
    mutation likePost($postId:String!){
  likePost(postId:$postId){
    id
    likes{
      username
      
    }
    likesCount
  }
}`;
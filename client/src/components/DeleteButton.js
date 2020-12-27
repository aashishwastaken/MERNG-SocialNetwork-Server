import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import MyPopup from '../utils/MyPopup';

export default function DeleteButton({ postId,commentId, callback }) {
  let [confirmed, setConfirmed] = useState(false);
  const SELECTED_MUTATION=(commentId)?DELETE_COMMENT:DELETE_POST;
  const [deletePostAndComment] = useMutation(SELECTED_MUTATION, {
    update(proxy) {
      setConfirmed(false);

      if(!commentId){
        proxy.modify({
          fields: {
            getPosts(presentPosts=[],{readField}){
              //console.warn(presentPosts[0]);
              return presentPosts.filter(p=>p.__ref!=="Post:"+postId);
            }
          }
        });
      }
      if (callback)
        callback();
    },
    variables: { postId,commentId }
  });

  return (<>
  <MyPopup content={commentId?'Delete Comment':'Delete Post'}>
    <Button as="div" floated="right" color="red" onClick={() => setConfirmed(true)}>
      <Icon name="trash" style={{ margin: 0 }} />
    </Button>
  </MyPopup>
    <Confirm
      open={confirmed}
      onCancel={() => setConfirmed(false)}
      onConfirm={()=>deletePostAndComment()} />

  </>);

}

const DELETE_POST = gql`
mutation deletePost($postId:String!){
  deletePost(postId:$postId)
}`;

const DELETE_COMMENT=gql`
  mutation deleteComment($postId:String!,$commentId:String!){
    deleteComment(postId:$postId,commentId:$commentId){
      id
      comments{
        id
        username
        body
        createdAt
      }
      username
      commentsCount
    }
  }
`;
import {gql} from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  {
       getPosts{
     id
    username
    createdAt
    body
    comments{
      id
      username
    	createdAt
   	  body
    }
    commentsCount
    likes{
      username
   	 	createdAt
    }
    likesCount
    
  }
  }
`;
   
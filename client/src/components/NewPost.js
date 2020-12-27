import React, {  useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

import { gql, useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import {FETCH_POSTS_QUERY} from '../utils/graphqlQueries';

const ADD_POST = gql`
mutation createPost($body:String!){
  createPost(body:$body){
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

export default function NewPost(props) {

    //let context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    //console.log(errors);

    const { values, onSubmit, onChange } = useForm(addPostCallback, {
        body: ""
    });

    const [createPost, { loading }] = useMutation(ADD_POST, {
        update(proxy, result) {
            setErrors('');
           // console.log(result);

            proxy.modify({
                fields: {
                  getPosts(existingPostRefs = [], { readField }) {
                    const newPostRef = proxy.writeQuery({
                      data: result.data.createPost,
                      query:FETCH_POSTS_QUERY
                    });
                    return [...existingPostRefs, newPostRef];
                  }
                }
              });

            values.body = "";
        },
        onError(err) {
            
        //console.log(err.graphQLErrors);
            setErrors(err.graphQLErrors[0].message);
        },
        variables: values
    });



    function addPostCallback() {
        createPost();
    }


    return (

        <Form style={{ float: "left", margin: "auto" }} onSubmit={onSubmit} error className={loading ? 'forms loading' : ' forms'}>

            <Form.Input fluid
                style={{ width: '170%' }}
                type="text"
                label="Whats on your mind?"
                placeholder="Hi!"
                name="body"
                value={values.body}
                onChange={onChange}
            //error={(errors.body)?true:false}
            />

<Button type="submit" fluid primary>
                Add Post
                </Button>

{errors.length>0?(<Message 
    style={{width:'170%'}}
   error  
   list={[errors]}
   />):(<div></div>)}


            
        </Form>

    )
}

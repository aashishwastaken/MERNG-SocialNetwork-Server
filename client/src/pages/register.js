import React, { useContext, useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import {useForm} from '../utils/hooks';
import {AuthContext} from '../context/auth';

const REGISTER_USER = gql`
mutation register($username:String!,
    							$email:String!,
                                $password:String!,
                                $confirmPassword:String!){
   register(registerInput:{username:$username,
    					  email:$email,
                          password:$password,
                          confirmPassword:$confirmPassword}){
    id
    username
    email
    token
    createdAt
    
  }
}`;

export default function Register(props) {
    let context=useContext(AuthContext);
    const [errors,setErrors]=useState({});
   // console.log("errors=>"+JSON.stringify(errors));
   
const {values, onSubmit,onChange}=useForm(registerUser,{ 
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
});

    const [addUser, { loading }] = useMutation(REGISTER_USER,{
        update(proxy,result){
            setErrors({});
            context.login(result.data.register);
            props.history.push('/');
        },
        onError(err){
           
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    });



function registerUser(){
    addUser();
}

   
    return (
        <div>
            <Form onSubmit={onSubmit} error className={loading?'forms loading':' forms'}>
                <h2>Register</h2>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Enter username"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    error={(errors.username)?true:false}
                />
                <Form.Input
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    error={(errors.email)?true:false}

                />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Enter Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    error={(errors.password)?true:false}
                />
                <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Enter password again"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={(errors.confirmPassword)?true:false}

                />


{Object.values(errors).length>0?(<Message
      error
      header='Errors'
      list={Object.values(errors)}
    />):<div></div>}

                <Button type="submit" fluid primary>
                    Register
                </Button>
            </Form>
        </div>
    )
}

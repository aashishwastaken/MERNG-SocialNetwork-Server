
const gql = require('graphql-tag');
const mongoose = require('mongoose');


const Posts = require('../models/posts');

const typeDefs = gql`

type Post{
    id:ID!
    username:String!
    createdAt:String!
    body:String!
    comments:[Comment]!
    likes:[Like]!
    commentsCount:Int!
    likesCount:Int!
    userPicture:String
} 
type Comment{
    id:ID!
    username:String!
    body:String!
    createdAt:String!
}
type Like{
    username:String!
    createdAt:String!
}
type User{
    id:ID!
    username:String!
    email:String!
    token:String!
    picture:String
    createdAt:String!
}

input RegisterInput{
    username:String!
    email:String!
    password:String!
    confirmPassword:String!

}

input LoginInput{
    username:String!
    password:String!
}

type Mutation{
    register(registerInput:RegisterInput):User!,
    login(loginInput:LoginInput):User!,
    googleLogin(code:String!):User!,
    createPost(body:String!):Post!,
    deletePost(postId:String!):String!,
    createComment(postId:String!,body:String!):Post!,
    deleteComment(postId:String!,commentId:String!):Post!,
    likePost(postId:String!):Post!


}

type Query{
    getPosts:[Post]!
    getPost(postId:String!):Post!
}
`;

module.exports = typeDefs;
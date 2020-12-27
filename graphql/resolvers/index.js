const postResolvers=require('./posts');
const userResolvers=require('./users');
const commentsAndLikesResolvers=require('./commentsAndLikes');
module.exports={
    Post:{
        commentsCount:(parent)=>parent.comments.length,
        likesCount:(parent)=>parent.likes.length
    },
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsAndLikesResolvers.Mutation
    }

};
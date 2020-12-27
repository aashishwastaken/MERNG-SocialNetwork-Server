const posts = require('../../models/posts');
const Posts = require('../../models/posts');
const { checkAuth } = require('../../utils/check-auth');

module.exports = {
    Mutation: {
        async createComment(root, { postId, body }, context) {

            const user = checkAuth(context);
            let post = await Posts.findById(postId);
            if (post) {
                post.comments.push({
                    body,
                    username: user.username,
                    createdAt: new Date().toUTCString()
                });
                await post.save();
                return post;
            } else {
                throw new Error('Post not found');
            }


        },

        async deleteComment(root, { postId, commentId }, context) {
            const user = checkAuth(context);
            let post = await Posts.findById(postId);
            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id == commentId);
                try {
                    if (post.comments[commentIndex].username === user.username) {
                        post.comments.splice(commentIndex, 1);
                        post.save();
                        return post;

                    } else {
                        throw new Error('Action not allowed');
                    }
                } catch (err) {
                    throw new Error('Comment not found');
                }
            } else {
                throw new Error('Post not found');
            }
        },
        async likePost(root,{postId},context){
            const user=checkAuth(context);
            try{
            let post=await Posts.findById(postId);
           let liked= post.likes.find(like=>like.username===user.username);
           if(liked){
                post.likes=post.likes.filter(x=>x.username!==user.username);
           }else{
               post.likes.push({
                   username:user.username,
                   createdAt:new Date().toUTCString()
               });
             }

             post.save();
             return post;
            }catch(err){
                throw new Error(err);
            }
        }
    }

}
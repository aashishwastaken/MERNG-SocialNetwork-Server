const { AuthenticationError } = require('apollo-server');

const Posts = require('../../models/posts');
const { checkAuth } = require('../../utils/check-auth');


module.exports = {
    Query: {
        async getPosts() {
            try {
                return await Posts.find({}).sort({ createdAt: 'desc' });
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(root, { postId }) {
            try {
                const post = Posts.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {

        async createPost(root, { body }, context) {
            //console.log(context);
            const user = checkAuth(context);
			if(body.trim()==''){
				 throw new Error('Body cannot be empty');
			}
            let post = new Posts({
                body,
                user: user._id,
                username: user.username,
                userPicture:user.picture?user.picture:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'

            });
            let res = await post.save();
            if (!res) {
                throw new Error('Post could not be added');
            }

            return res;

        },
        async deletePost(root, { postId }, context) {

            const user = checkAuth(context);
            try {
                let postUser = await Posts.findById(postId);
                if (postUser.username === user.username) {
                    let res = await Posts.deleteOne({ _id: postId });
                    if (!res) {
                        throw new Error('Post could not be deleted');
                    }
                    return 'Post deleted successfully';
                }
                throw new AuthenticationError('Action not allowed');



            } catch (err) {
                throw new Error(err);
            }
        }
    }
};
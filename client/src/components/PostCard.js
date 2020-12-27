import React, { useContext } from 'react';
import { Button, Card, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/MyPopup';

const PostCard = (props) => {
  const { user } = useContext(AuthContext);
  const post = props.post;


  return (<Card.Group>
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{post.username}</Card.Header>

        <Card.Meta as={Link} to={`/posts/${post.id}`}>{moment(Number(post.createdAt)).fromNow()}</Card.Meta>
        <Card.Description>
          {post.body}
        </Card.Description>
      </Card.Content>
      <Card.Content >

        <LikeButton user={user} post={{ postId: post.id, likes: post.likes, likesCount: post.likesCount }} />
        <MyPopup content="Comment" >
        <Button labelPosition='right' as={Link} to={`/posts/${post.id}`}>
          <Button basic color='blue'>
            <Icon name='comments' />

          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {post.commentsCount}
          </Label>
        </Button>
</MyPopup>
        {user && user.username === post.username && (<DeleteButton postId={post.id} />)}



      </Card.Content>
    </Card>
  </Card.Group>
  )
};

export default PostCard;
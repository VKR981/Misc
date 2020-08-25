import React, { Component } from 'react'
import { Search, Icon, Container, Header, Segment, Button, Item, } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

function Postmain(props){
  const postslist = useSelector(state => state)
  console.log(props.match.params.like)
  let like=''
  if(props.match.params.like=='like'){
    like='true'
  }
  else if(props.match.params.like=='dislike') { like='false' }
    return (<div>
      <Container>
     {postslist.map(post=>((like===post.like)&&(<div><Header as='h1' textAlign='center'>{post.title}</Header>
     <Segment padded='very'>{post.content}</Segment>
     <Button icon primary={post.like=='true'}>
        <Icon name='thumbs up outline' />
        Like
      </Button>
      <Button icon  primary={post.like=='false'}>
        <Icon name='thumbs down outline' />
        Dislike
      </Button>
     </div>)
))} 

</Container>
    </div>)
}

export default Postmain;
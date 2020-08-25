import _ from 'lodash'
import React, { useState }  from 'react'
import { Search, Grid, Input, Icon, Segment, Button, Container, Item, Menu, Header, } from 'semantic-ui-react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import copyposts from '../actions/index.jsx'
import { Link } from "react-router-dom";


var source = []




const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }
    case 'UPDATE_LIST':
      return {...state}

    default:
      throw new Error()
  }
}

function SearchExampleStandard() {
  const postslist = useSelector(state => state)
  const dispatch1=useDispatch();
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [like, setLike] = useState('');
  const [id, setId] = useState('');
  
  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    axios.get('http://my-json-server.typicode.com/VKR981/demo/posts/').then(res=>{ source = res.data; dispatch1(copyposts(res.data));  dispatch({type:'UPDATE_LIST'});  })
    
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, []);
  



  return (
    <div >
      
      <Container>
        
      <Menu secondary>
        <Menu.Item
          name='Create post'
          as={Link} to="/createpost"
          
        />
        <Menu.Item
          name='Liked'
          as={Link} to="/posts/like"
          
        />
        <Menu.Item
          name='Disliked'
          as={Link} to="/posts/dislike"
          
        />
        <Menu.Menu position='right'>
          <Menu.Item>
          <Search
      centered textAlign='right'
          floated="right"
          loading={loading}
          onResultSelect={(e, data) =>{
            console.log(data.result);
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title }); setId(data.result.id); setTitle(data.result.title); setContent(data.result.content); setLike(data.result.like); console.log(like)}
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}

        />
          </Menu.Item>
          <Menu.Item
            name='logout'
            
            
          />
        </Menu.Menu>
      </Menu>
      </Container>

        {(title!=='')&&(<div><Header as='h1' textAlign='center'>{title}</Header>
        <Container>
        <Segment padded='very'>{content}</Segment>
        
        <Button icon primary={like=='true'}>
        <Icon name='thumbs up outline' />
        Like
      </Button>
      <Button icon  primary={like=='false'}>
        <Icon name='thumbs down outline' />
        Dislike
      </Button>
        </Container></div>)}
    </div>
  )
}

export default SearchExampleStandard
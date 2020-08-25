import React, { Component } from 'react'
import { Form, Container } from 'semantic-ui-react';
import Axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { connect } from "react-redux";
import copyposts from '../actions/index.jsx'
import { Link } from "react-router-dom";

class createpost extends Component
{


    constructor(props) {
        super(props);
        this.state = {
         title: "",
          desc: "",
          
    
    
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
      }
    
      
      handleChange(event) {
        // console.log(event.target);
        this.setState({
          [event.target.name]: event.target.value
        });
        
      }

      handleSubmit(event){
        let id = this.props.postslist.length+1
        let data=this.props.postslist
        console.log(data)
        data.push({
          id:id,
          title: this.state.title,
          content: this.state.desc,
          like:''
        })
        this.props.copyposts(data)
        console.log(data)
          Axios.post('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              id:id,
              title: this.state.title,
              content: this.state.desc,
              like:''
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.data).then(json => console.log(json));
      }
      componentWillMount(){
        
      }
    render(){
        return(
            <div className='createpost'>
              <Container>
                <h3>create new post</h3>
            <Form >
    <Form.Group widths='equal'>
      <Form.Input fluid label='Title' placeholder='Title' name='title' onChange={this.handleChange} />
    </Form.Group>
    <Form.TextArea label='Description' placeholder='...' name='desc' onChange={this.handleChange}/>
    
    
    <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
    <Form.Button as={Link} to="/">Back</Form.Button>
    
  </Form>

  </Container>
  </div>
        )
    }
}

const mapStateToProps = state => ({
  postslist: state
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addUser: (person) => {
//       dispatch(addUser(person))
//     },
//   }
// }

export default connect(mapStateToProps,{copyposts})(createpost);
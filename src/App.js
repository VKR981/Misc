import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchExampleStandard from './components/search'
import createpost from './components/createpost'
import postmain from './components/postmain'
import { Button } from 'semantic-ui-react';


import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";



function App(props) {
  return (
    <div>

      <Router>

        {/* <Route exact path="/reviews/:isbn/:title/:author/:avgrating/:totalratings/:reviews/:year" component={} /> */}
        {/* <Route exact path="/explore/:query" component={Bookitem} />
        <Route exact path="/home" component={Bookitem} /> */}
        <Route exact path="/" component={SearchExampleStandard} />
        <Route exact path="/createpost" component={createpost} />
        <Route exact path="/posts/:like" component={postmain} />
        
      </Router>
    </div>

  );
}


export default App;

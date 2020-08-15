import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter } from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import NavComponent from './Etc/NavComponent';
import { Blog } from './Pages/Blog';
import {UserData} from './Pages/UserData';
import { AdminData } from './Pages/AdminData';


function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavComponent />
      <Switch>
        <Route path="/UserData" component={UserData} />
        <Route path="/AdminData" component={AdminData} />
        <Route path="/Blog" component={Blog} />
        </Switch>
    </div>
    </HashRouter>
  );
}

export default App;

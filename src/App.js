import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import Login from "./Login";
import { useStateValue } from './StateProvider';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [{user}] = useStateValue();

  return (
    <Router>
      {!user?(
        <Login />
      ) : (
        <>
          <div className="App">
            <Header />
            <div className="app_body">
              <Sidebar />

              <Switch>
                <Route path="/room/:roomId">
                  <Chat />
                </Route>

                <Route path="/">
                  <div className="app_main">
                    <h1>Welcome</h1>
                  </div>
                </Route>
              </Switch>

            </div>
          </div>
        </>
      )}
      
    </Router>
    
  );
}

export default App;

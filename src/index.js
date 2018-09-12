import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from "react-redux";

import Store from './stores';

import Nav from './components/nav';
import List from './components/list';
import Featured from './components/featured';
import Settings from './components/settings';
import Default from './components/pagenotfound';

var App = document.getElementById('root');

ReactDOM.render(
    <Provider store={Store}>
        <div>
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={List} />
                        <Route exact path="/home" component={List} />
                        <Route path="/featured" component={Featured} />
                        <Route path="/settings" component={Settings} />
                        <Route component={Default} />
                    </Switch>
                </div>
            </Router>
        </div>
    </Provider>
    ,
    App
)
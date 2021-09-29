import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFound from '../NotFound/NotFound';
import PartPage from '../PartPage/PartPage';
import './App.scss';

const title = 'Store Parts';

const App: React.FunctionComponent = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <h1 className="title">{title}</h1>
                <Switch>
                    <Route path="/" exact component={HomePage}></Route>
                    <Route path="/part-page/:name" component={PartPage}></Route>
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;

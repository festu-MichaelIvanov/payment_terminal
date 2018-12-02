import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CellOperatorBalance from './CellOperatorBalance';
import CellOperators from './CellOperators';
import Login from './Login';


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/cell-operators/" component={CellOperators}/>
                    <Route exact path="/cell-operators/:id/" component={CellOperatorBalance}/>
                    <Route exact path="/login/" component={Login}/>
                    <Route exact path="/" component={Login}/>
                </div>
            </Router>
        );
    }
}

export default App
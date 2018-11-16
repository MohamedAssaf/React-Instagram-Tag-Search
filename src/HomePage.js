import React, { Component } from 'react';
import './App.css';
import qs from 'query-string';
import { Redirect } from 'react-router-dom';
import * as _ from 'lodash';

let authToken;
class HomePage extends Component {
    constructor(props) {
        super(props);
        authToken = qs.parse(window.location.hash);
    }
    redirect() {
        if(_.isEmpty(authToken)){
            return (
                <Redirect to="/" />
            )
        }
    }
    render() {
        return (
            <div>
                {this.redirect()}
                <h1>HEYYYY</h1>
            </div>
        )
    }
}

export default HomePage;

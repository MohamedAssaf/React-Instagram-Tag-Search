import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthTokenChanged } from './Actions';
import qs from 'query-string';
import * as _ from 'lodash';
import './App.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        let authToken = qs.parse(window.location.hash);
        this.props.AuthTokenChanged(authToken);
    }
    redirect() {
        if (this.props.authToken) {
            console.log(this.props.authToken.access_token);
        }
        if (_.isEmpty(this.props.location.hash)) {
            return (
                <Redirect to="/" />
            )
        }
    }

    render() {
        return (
            <div>
                {this.redirect()}
                <h1>Heyyy</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.authToken
    }
}

export default connect(mapStateToProps, { AuthTokenChanged })(HomePage);

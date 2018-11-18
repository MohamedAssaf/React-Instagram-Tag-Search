import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthTokenChanged, TagsChanged, ToggleSearchMode } from './Actions';
import qs from 'query-string';
import * as _ from 'lodash';
import './App.css';

class HomePage extends Component {
    searchResults = {};
    constructor(props) {
        super(props);
        let authToken = qs.parse(window.location.hash);
        this.props.AuthTokenChanged(authToken);
    }

    search(event) {
        event.preventDefault();
        let tags = this.props.tags.split(" ");
        let urls = [];
        let replies = [];
        _.forEach(tags, (tag) => {
            urls.push(`https://api.instagram.com/v1/tags/${tag}/media/recent?access_token=276779180.f4c3474.efdb4c44585740a08597f9f406126d85`)
        })
        urls.map(url => fetch(url).then(response => {
            response.json().then(respBody => {
                replies.push(respBody);
            })
        }));
        Promise.all(urls).then(allData => {
            console.log(replies);
            this.props.ToggleSearchMode();
        });

    }

    tagChanged(event) {
        this.props.TagsChanged(event.target.value);
        console.log(this.props.authToken)
    }

    returnToSearchMode() {
        this.props.ToggleSearchMode();
    }
    
    
    redirect() {
        //if the page is called with empty parameters or no parameters at all 
        if (_.isEmpty(this.props.location.hash)) {
            return (
                <Redirect to="/" />
            )
        }
    }

    renderHelper() {
        if (this.props.searchMode) {
            return (
                <div>
                    <h1>Heyyyy</h1>
                    <button onClick={this.returnToSearchMode.bind(this)} > Search Again! </button>
                </div>
            )
        }
        return (
            <form onSubmit={this.search.bind(this)}>
                <label>
                    Tags:
                <input type="text" value={this.props.tags} onChange={this.tagChanged.bind(this)} />
                </label>
                <button type="submit" value="Submit">Let's fire this baby up </button>

            </form>
        )
    }

    render() {
        return (
            <div className="App App-header" >
                {this.redirect()}
                {this.renderHelper()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.authToken,
        tags: state.tags,
        searchMode: state.searchMode
    }
}

export default connect(mapStateToProps, { AuthTokenChanged, TagsChanged, ToggleSearchMode })(HomePage);

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthTokenChanged, TagsChanged, ToggleSearchMode, StoreSearchResult } from './Actions';
import qs from 'query-string';
import * as _ from 'lodash';
import './App.css';

let value = "Hey";
class HomePage extends Component {
    constructor(props) {
        super(props);
        let authToken = qs.parse(window.location.hash);
        this.props.AuthTokenChanged(authToken);
    }

    async search(event) {
        this.props.ToggleSearchMode();
        let searchResult = {};
        event.preventDefault();
        let tags = this.props.tags.split(" ");
        await _.forEach(tags, async tag => {
            let data = await fetch(`https://api.instagram.com/v1/tags/${tag}/media/recent?access_token=${this.props.authToken.access_token}`);
            data.json().then((response) => {
                if (!_.isEmpty(response.data)) {
                    _.forEach(response.data, (post) => {
                        let { user } = post;
                        if (!searchResult[user.full_name]) {
                            searchResult[user.full_name] = 1;
                        }
                        else {
                            searchResult[user.full_name] += 1;
                        }
                        this.props.StoreSearchResult(searchResult);
                        console.table(this.props.searchResult);
                    });
                };
            });
        })
    }

    tagChanged(event) {
        this.props.TagsChanged(event.target.value);
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

    renderHelper(props) {
        if (this.props.searchMode) {
            let { searchResult } = this.props;
            if (!_.isEmpty(searchResult)) {
                let users = Object.keys(searchResult).map(function (key) {
                    return { username: key, value: searchResult[key] };
                });
                return(
                    <ul>
                        {users.map(user => {
                            return(
                            <li>
                                {`${user.username} : ${user.value}`}
                            </li>)
                        })}
                        <button className="Button CenterButton" onClick={this.returnToSearchMode.bind(this)} > Search Again! </button>
                    </ul>
                )
            }
            // for(let username in searchResult){
            //     if( searchResult.hasOwnProperty(username)){

            //     }
            // }

            return (
                <div>
                    {/* {for(let key in this.props.searchResult ){
                        
                    }} */}
                    <button className="Button" onClick={this.returnToSearchMode.bind(this)} > Search Again! </button>
                </div>
            )
        }
        return (
            <form onSubmit={this.search.bind(this)}>
                <label className="Label" >
                    Tags:
                <input className="TextBox" type="text"  value={this.props.tags} onChange={this.tagChanged.bind(this)} />
                </label>
                <button className="Button" type="submit" value="Submit">Search ? </button>
            </form>
        )
    }

    render() {
        return (
            <div className="App App-header" >
                {this.redirect()}
                {this.renderHelper(this.props)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.authToken,
        tags: state.tags,
        searchMode: state.searchMode,
        searchResult: state.searchResult
    }
}

export default connect(mapStateToProps, { AuthTokenChanged, TagsChanged, ToggleSearchMode, StoreSearchResult })(HomePage);

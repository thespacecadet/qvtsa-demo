/**
 * Created by spacecadet on 06.09.18.
 */
import React, {Component} from 'react'
import {Control, Form} from 'react-redux-form'
import store from '../store';
import {connect} from 'react-redux'

const grabToken = (url) => //takes the access token from the url
{   const myString = 'access_token=';
    return url.slice(url.indexOf(myString)+ myString.length)};

const isTagFound = function (pictags, formtags) { //checks if two arrays share any element
    return formtags.some(function (v) {
        return pictags.indexOf(v) >= 0;
    });
};

const areAllTagsFound = function (pictags, formtags) { //checks if picture has all tags of form
    let isfound = true;
    for (var x=0;x<formtags.length;x++){
        if (formtags[x] !== '') {
            if (!pictags.includes(formtags[x])) {
                return false
            }
        }
    }
    return isfound;
};

const checkiflogged = (url) => //warn us when not logged in
{if (url.includes("access_token")) {
    console.log("we are logged in!")
}

else{
    document.getElementById("logger").innerHTML = "you need to log in first!" //does not work, breaks if not logged in
}};

class Instaform extends Component {
    constructor()
    {
        super();
        this.state ={
            mylink:null,
            data:null,
        }
    }

    handleSubmit(){ //gets called when submit button is clicked
        let a = document.getElementById('instapics');
        a.innerHTML = ''; //erase all prior content
        let url = window.location.href; //take the current url
        checkiflogged(url); //check if access token is on url
        let accessToken = grabToken(url); //take the token from the url
        const apiLink = 'https://api.instagram.com/v1/users/self/media/recent/?access_token='; //hardcoded api call
        this.state.mylink = apiLink.concat(accessToken); //add correct access token to it
        let data;
        fetch(this.state.mylink).then((resp)=> resp.json().then( //api call
            function(json) {
                data = json;
                let ourtags = []; //manually adding our tags to this array
                ourtags[0] = store.getState().tags.tag1;
                ourtags[1] = store.getState().tags.tag2;
                ourtags[2] = store.getState().tags.tag3;
                let i;
                for (i=0;i<data.data.length; i++){ //go through each found media (picture)
                    if (areAllTagsFound(data.data[i].tags,ourtags)) { // if current picture has any of the searched tags
                        document.getElementById('instapics').insertAdjacentHTML('afterbegin', '<img src="' + data.data[i].images.low_resolution.url + '" />');

                    }
                }
            }
            ));
    }

    render(){
        return (
            <div>
                <Form model="tags" onSubmit={(tags) => this.handleSubmit(tags)}>
                <h2>Enter user and tags to view</h2>
                <div className="form-group">
                    <label htmlFor="tags.tag1">Tag 1:</label>
                    <Control.text model="tags.tag1" id="tags.tag1" placeholder="Add Tag"/>
                    <label htmlFor="tags.tag2">Tag 2:</label>
                    <Control.text model="tags.tag2" id="tags.tag2" placeholder="Add Tag"/>
                    <label htmlFor="tags.tag3">Tag 3:</label>
                    <Control.text model="tags.tag3" id="tags.tag3" placeholder="Add Tag"/>
                    <button type= "submit" className="btn btn-primary btn-lg">Submit!</button>
                    <div id="logger"></div>
                    <div id="instapics"></div>
                </div>
                </Form>
            </div>

        )
    }


}

export default connect() (Instaform)
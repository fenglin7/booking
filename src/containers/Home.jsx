import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fire from '../utils/fire';

import logo from '../assets/logo.svg';



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }
    componentWillMount() {
        /* Create reference to messages in Firebase Database */
        let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let message = { text: snapshot.val(), id: snapshot.key };
            this.setState({ messages: [message].concat(this.state.messages) });
        })
    }
    addMessage(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push(this.inputEl.value);
        this.inputEl.value = ''; // <- clear the input
    }
    render() {
        return (
            <div>
                Hi there this is home<br />
                <img src={logo} className="App-logo" alt="logo" />
                <br />
                <Link to='/listings'>Listings</Link>
                <div>
                    <h2>FIREBASE form</h2>
                    <form onSubmit={this.addMessage.bind(this)}>
                        <input type="text" ref={el => this.inputEl = el} />
                        <input type="submit" />
                        <ul>
                            { /* Render the list of messages */
                                this.state.messages.map(message => <li key={message.id}>{message.text}</li>)
                            }
                        </ul>
                    </form>
                </div>
            </div>
        )
    }
}

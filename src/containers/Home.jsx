import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fire from '../utils/fire';

import logo from '../assets/logo.svg';

import * as homeActions from '../features/home'

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getFireBaseMessages()
    }

    addMessage(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push(this.inputEl.value);
        this.inputEl.value = ''; // <- clear the input
    }
    render() {
        const {
            messages
        } = this.props
        return (
            <div>
                Hi there this is home<br />
                <img src={logo} className="App-logo" alt="logo" />
                <br />
                <Link to='/listings'>Listings</Link>
                <div>
                    <h2>Message Board</h2>
                    <form onSubmit={this.addMessage.bind(this)}>
                        <input type="text" ref={el => this.inputEl = el} />
                        <input type="submit" />
                        <ul>
                            { /* Render the list of messages */
                                messages.map(message => <li key={message.id}>{message.text}</li>)
                            }
                        </ul>
                    </form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    messages: state.home.messages
})

const mapDispatchToProps = dispatch => ({
    getFireBaseMessages: () => dispatch(homeActions.getFireBaseMessages()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import * as homeActions from '../../features/home'
import { Button, Row, Col, Grid, Input, FormGroup, Label } from '@smooth-ui/core-sc'
import { addMessage } from '../../redux/actions/messageActions'
import SC from './styles.js'

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    handleAdd = (e) => {
        e.preventDefault();
        this.props.addMessage(this.addMsg.value)
        this.addMsg.value = '';
    }
    renderMessages = () => {
        const {
            messages
        } = this.props

        const messagesList = !isLoaded(messages)
            ? 'Loading'
            : isEmpty(messages)
                ? 'Messages list is empty'
                : Object.keys(messages).map(
                    (key, id) => (
                        <SC.Messages key={key} id={id}>{messages[key]}</SC.Messages>
                    )
                )
        return (
            <div>
                <h1>Messages</h1>
                <ul>
                    {messagesList}
                </ul>
            </div>
        )
    }
    render() {
        return (
            <Grid gutter={50}>
                <Row>
                    <Col>
                        <h2>Message Board</h2>
                        <form onSubmit={this.handleAdd}>
                            <FormGroup>
                                <Label htmlFor="addMessages">Add Messages</Label>
                                <Input control type="text" innerRef={el => this.addMsg = el} />
                            </FormGroup>
                            <Button type="submit">Add Message</Button>


                        </form>

                    </Col>

                </Row>
                <Row>
                    <Col>
                        <ul>
                            {this.renderMessages()}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Placeholder: Browse Bookings
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Placeholder: Render bookings here
                    </Col>
                </Row>
            </Grid>
        )
    }
}


const mapStateToProps = state => {
    console.log('state', state)
    return {
        messages: state.firebase.data.messages
    }
}

const mapDispatchToProps = dispatch => ({
    addMessage: msg => dispatch(addMessage(msg)),
})

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default compose(
    firebaseConnect([
        'messages'
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(Home)
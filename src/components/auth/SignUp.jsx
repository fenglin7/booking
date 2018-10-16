import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { FormGroup, Row, Col, Grid, Label, Input, Button, ControlFeedback } from '@smooth-ui/core-sc'
import * as routes from '../../constants/routes';
import { signUp } from '../../redux/actions/authActions'

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    firstName: '',
    lastName: ''
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.passwordOne,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        }
        console.log('newUser', newUser)
        this.props.signUp(newUser)
    }
    render() {
        const { authError, auth } = this.props
        if (auth.uid) return <Redirect to='/' />
        const {
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            firstName === '' ||
            lastName === '';
        return (
            <Grid gutter={50}>
                <Row justifyContent="center">
                    <Col xs={12} md={6}>
                        <h2>Sign Up</h2>
                        <form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    control
                                    id='email'
                                    value={email}
                                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                                    type="text"
                                    placeholder="Email Address"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="passwordOne">Password</Label>
                                <Input
                                    control
                                    id='passwordOne'
                                    value={passwordOne}
                                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                                    type="password"
                                    placeholder="Password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="passwordTwo">Confirm Password</Label>
                                <Input
                                    control
                                    id='passwordTwo'
                                    value={passwordTwo}
                                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    control
                                    id='firstName'
                                    value={firstName}
                                    onChange={event => this.setState(byPropKey('firstName', event.target.value))}
                                    type="text"
                                    placeholder="First Name"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    control
                                    id='lastName'
                                    value={lastName}
                                    onChange={event => this.setState(byPropKey('lastName', event.target.value))}
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </FormGroup>

                            <Button disabled={isInvalid} type="submit">Sign Up</Button>
                            {authError && <p>{authError.message}</p>}

                        </form>
                    </Col>
                </Row>
            </Grid>);
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: newUser => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)

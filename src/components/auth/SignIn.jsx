import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { FormGroup, Row, Col, Grid, Label, Input, Button, ControlFeedback } from '@smooth-ui/core-sc'
import { signIn } from '../../redux/actions/authActions'

export class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailValid: false,
            validPassword: false,
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const cred = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.signIn(cred)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { authError, auth } = this.props
        if (auth.uid) return <Redirect to='/' />
        return (
            <Grid gutter={50}>
                <Row justifyContent="center">
                    <Col xs={12} md={6}>
                        <h2>Sign in</h2>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input control id="email" onChange={this.handleChange} />
                                {/* <ControlFeedback valid>Looks good!</ControlFeedback> */}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type='password' control id="password" onChange={this.handleChange} />
                                {/* <ControlFeedback valid={false}>It is required.</ControlFeedback> */}
                            </FormGroup>
                            <Button type='submit' >Sign In </Button>
                            {authError && <p>{authError.message}</p>}
                            <br /><br />
                            <Link to='/signup' >New User? Sign Up here</Link>
                        </form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}


const mapStateToProps = state => ({
    authError: state.auth.authError,
    auth: state.firebase.auth
})

const mapDispatchToProps = dispatch => {
    return {
        signIn: creds => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

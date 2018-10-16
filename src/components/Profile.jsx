import React, { Component } from 'react'
import { connect } from 'react-redux'

// import * as homeActions from '../features/home'
import { Row, Col, Grid } from '@smooth-ui/core-sc'

export class Home extends Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount() {

    //     if (user != null) {
    //       user.providerData.forEach(function (profile) {
    //         console.log("Sign-in provider: " + profile.providerId);
    //         console.log("  Provider-specific UID: " + profile.uid);
    //         console.log("  Name: " + profile.displayName);
    //         console.log("  Email: " + profile.email);
    //         console.log("  Photo URL: " + profile.photoURL);
    //       });
    //     }
    // }

    render() {
        return (
            <Grid gutter={50}>
                <Row justifyContent="center">
                    <Col xs={12} md={6}>
                        Logged In!
                    </Col>
                </Row>
            </Grid>
        )
    }
}


const mapStateToProps = state => ({
    messages: state.home.messages
})



export default connect(mapStateToProps, null)(Home)

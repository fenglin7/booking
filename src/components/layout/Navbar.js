import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { Row, Col } from '@smooth-ui/core-sc'

import SC from './styles.js'

const Navbar = (props) => {
    const { auth, profile } = props
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
        <Row justifyContent="flex-start" backgroundColor="#FF434C" alignItems="center">
            <Col xs={2} gutter={20}>
                <SC.SignInLink to='/' >
                    <h2>Booking</h2>
                </SC.SignInLink>
            </Col>
            {/* <Col xs={6} justifyContent="flex-start">
                    <SC.Search size='sm' placeholder="Search.." />
                </Col> */}
            <Col>
                {links}
            </Col>
        </Row>
    )
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)
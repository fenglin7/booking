import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../redux/actions/authActions'
import { Row, Col } from '@smooth-ui/core-sc'
import SC from './styles'

const SignedInLinks = (props) => {
    const { profile } = props
    console.log('profile', profile)
    return (
        <Row justifyContent="flex-end" alignItems="center" >
            <Col xs={2}><SC.NavStyled to='/createListing'>New Listing</SC.NavStyled></Col>
            <Col xs={2}><SC.AStyled onClick={props.signOut}>Log Out</SC.AStyled></Col>
            <Col xs={1}><SC.Initials to='/'>{profile && profile.initials}</SC.Initials></Col>

        </Row>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from '@smooth-ui/core-sc'
import SC from './styles'


const SignedOutLinks = () => {
    return (
        <Row justifyContent="flex-end">
            <Col xs={2}><SC.NavStyled to='/signup'>Sign Up</SC.NavStyled></Col>
            <Col xs={2}><SC.NavStyled to='/signin'>Log In</SC.NavStyled></Col>
        </Row>
    )
}

export default SignedOutLinks
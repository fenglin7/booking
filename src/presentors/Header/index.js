import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Input, Box } from '@smooth-ui/core-sc'
import SC from './styles.js'
import Navigation from '../../containers/Navigation'
export default class Header extends Component {
    // isAuthenticated() {
    //     if (this.props.accessToken && this.props.castToken) return true
    //     return false
    // }

    // renderUserAuthLinks() {
    //     const { signout } = this.props

    //     return (this.isAuthenticated()) ? (
    //         <ul className='nav-links right'>
    //             <li className='show-for-medium'><Link to='/profile'><img src='/images/ico-profile.png' /></Link></li>
    //             <li><a onClick={ event => signout(event) }>Sign out</a></li>
    //         </ul>
    //     ) : (
    //         <ul className='nav-links right'>
    //             <li className='show-for-medium'><Button className='primary' href='/signup'>Sign up</Button></li>
    //             <li><Link to='/signin'>Sign in</Link></li>
    //         </ul>
    //     )
    // }

    // renderMobileUserAuthLinks() {
    //     return (this.isAuthenticated()) ? (
    //         <li><Link to='/profile'>Profile</Link></li>
    //     ) : (
    //         <li><Link to='/signup'>Sign up</Link></li>
    //     )
    // }

    // renderPurchaseLink() {
    //     const { showPurchasePopup } = this.props

    //     return (this.isAuthenticated()) ? (
    //         <li><Link to='/purchase'>Purchase</Link></li>
    //     ) : (
    //         <li><a onClick={ () => { showPurchasePopup() } }>Purchase</a></li>
    //     )
    // }
    // renderRedeemLink() {
    //     const { showRedeemPopup } = this.props

    //     return (this.isAuthenticated()) ? (
    //         <li><Link to='/redemption'>Redeem</Link></li>
    //     ) : (
    //         <li><a onClick={ () => { showRedeemPopup() } }>Redeem</a></li>
    //     )
    // }

    render() {
        // const { dropdown, toggleDropdown } = this.props
        // const dropdownStatus = (dropdown) ? 'dropdown-active' : 'dropdown-inactive'

        return (
            <>
            <Row justifyContent="flex-start" backgroundColor="#FF434C" alignItems="center">
                <Col xs={2} gutter={20}>
                    <SC.SignInLink to='/' >
                        <h2>Booking</h2>
                    </SC.SignInLink>
                </Col>
                <Col xs={6} justifyContent="flex-start">
                    <SC.Search size='sm' placeholder="Search.." />
                </Col>
                <Col xs={2}>
                    <SC.SignInLink to='signup' >Sign Up</SC.SignInLink>
                </Col>
                <Col xs={2}>
                    <SC.SignInLink to='signin' >Sign In</SC.SignInLink>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Navigation/>
                </Col>
            </Row>
            </>
        )
    }
}

// const mapStateToProps = state => ({
//     accessToken: state.authentication.accessToken,
//     castToken: state.authentication.castToken,
//     dropdown: state.header.dropdown
// })

// const mapDispatchToProps = dispatch => ({
//     signout: (event) => {
//         event.preventDefault()
//         dispatch(actions.signout())
//     },
//     showPurchasePopup: () => { dispatch(actions.showPopup('/purchase', <SigninFirstPopup header='Purchase'/>)) },
//     showRedeemPopup: () => { dispatch(actions.showPopup('/redemption', <SigninFirstPopup header='Redeem'/>)) },
//     toggleDropdown: () => { dispatch(actions.toggleHeaderDropdown()) }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(HeaderView)

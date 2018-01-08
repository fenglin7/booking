import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import actions from '../../actions/index'

import SigninFirstPopup from '../PopupContent/SigninFirst/SigninFirst.jsx'
import Button from '../Button/Button.jsx'

export class HeaderView extends Component {
    isAuthenticated() {
        if (this.props.accessToken && this.props.castToken) return true
        return false
    }

    renderUserAuthLinks() {
        const { signout } = this.props

        return (this.isAuthenticated()) ? (
            <ul className='nav-links right'>
                <li className='show-for-medium'><Link to='/profile'><img src='/images/ico-profile.png' /></Link></li>
                <li><a onClick={ event => signout(event) }>Sign out</a></li>
            </ul>
        ) : (
            <ul className='nav-links right'>
                <li className='show-for-medium'><Button className='primary' href='/signup'>Sign up</Button></li>
                <li><Link to='/signin'>Sign in</Link></li>
            </ul>
        )
    }

    renderMobileUserAuthLinks() {
        return (this.isAuthenticated()) ? (
            <li><Link to='/profile'>Profile</Link></li>
        ) : (
            <li><Link to='/signup'>Sign up</Link></li>
        )
    }

    renderPurchaseLink() {
        const { showPurchasePopup } = this.props

        return (this.isAuthenticated()) ? (
            <li><Link to='/purchase'>Purchase</Link></li>
        ) : (
            <li><a onClick={ () => { showPurchasePopup() } }>Purchase</a></li>
        )
    }
    renderRedeemLink() {
        const { showRedeemPopup } = this.props

        return (this.isAuthenticated()) ? (
            <li><Link to='/redemption'>Redeem</Link></li>
        ) : (
            <li><a onClick={ () => { showRedeemPopup() } }>Redeem</a></li>
        )
    }

    render() {
        const { dropdown, toggleDropdown } = this.props
        const dropdownStatus = (dropdown) ? 'dropdown-active' : 'dropdown-inactive'

        return (
            <div>
                <div className='header'>
                    <div className='row'>
                        <div className='small-12 column'>
                            <Link className='singtel_logo' to='/'>Singtel</Link>
                            <div className='menu-part'>
                                <a onClick={() => toggleDropdown()}
                                    href='#'
                                    className={`menu-button show-for-small-only ${dropdownStatus}`}>
                                    Menu
                                </a>
                                <ul className='nav-links left show-for-medium'>
                                    { this.renderPurchaseLink() }
                                    { this.renderRedeemLink() }
                                    <li><Link to='/faq'>FAQ</Link></li>
                                </ul>
                            </div>
                            <div className='authentication-part'>
                                { this.renderUserAuthLinks() }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row mobile-menu-dropdown show-for-small-only active ${dropdownStatus}`}>
                    <ul className='small-12 column'>
                        { this.renderPurchaseLink() }
                        { this.renderRedeemLink() }
                        <li><Link to='/faq'>FAQ</Link></li>
                        { this.renderMobileUserAuthLinks() }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    castToken: state.authentication.castToken,
    dropdown: state.header.dropdown
})

const mapDispatchToProps = dispatch => ({
    signout: (event) => {
        event.preventDefault()
        dispatch(actions.signout())
    },
    showPurchasePopup: () => { dispatch(actions.showPopup('/purchase', <SigninFirstPopup header='Purchase'/>)) },
    showRedeemPopup: () => { dispatch(actions.showPopup('/redemption', <SigninFirstPopup header='Redeem'/>)) },
    toggleDropdown: () => { dispatch(actions.toggleHeaderDropdown()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView)

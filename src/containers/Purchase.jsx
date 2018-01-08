import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions/index'
import WhiteWrapper from '../components/WhiteWrapper/WhiteWrapper.jsx'
import Button from '../components/Button/Button.jsx'
import MiniPackOptions from '../components/MiniPackOptions/MiniPackOptions.jsx'
import { formatDate, addDaysToDate } from '../utils/customizedMoment'

export class PurchaseView extends Component {
    componentDidMount() {
        const { fetchPackages } = this.props

        fetchPackages();
    }

    isInCart = (componentId) => {
        if (this.props.cart.findIndex(item => (
            item.componentId === componentId
        )) > -1) {
            return true
        }
        return false
    }

    renderDifferentTypesofPackages() {
        const { packages, selectMinipack, openContinueSubscriptionPopup, addToCart, removeFromCart } = this.props

        return packages.map((pack, index) => {
            let packageView
            switch (pack.paymentType) {
                case 'voucher':
                    packageView = (
                        <div key={index} className='package-wrapper row voucher'>
                            <img className='column medium-3' src={pack.icon} />
                            <div className='package-info column medium-7'>
                                <h2>{pack.title}</h2>
                                <p>{pack.description}</p>
                                {
                                    pack.scheduledComponent ? (
                                        <div className='package-detail'>
                                            <span className='mobile-block'><span className='label'>Enjoy access till:</span> <span>{formatDate(pack.endAt)}</span></span>
                                            <span className='mobile-block'><span className='label'>Next billing date:</span><span>{formatDate(addDaysToDate(pack.endAt, 1))}</span></span>
                                            <span className='mobile-block'><span className='label'>Amount:</span><span>S${pack.scheduledComponent.price}</span></span>
                                        </div>
                                    ) : (
                                        <div className='package-detail'>
                                            <span className='label'>Enjoy access till:</span> <span>{formatDate(pack.endAt)}</span>
                                            <a className='show-for-small-only' onClick={ () => { openContinueSubscriptionPopup(pack.provisionId, pack.packageId) } }>Continue my Subscription</a>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='status-section column medium-2'>
                                <div className='status-info '>
                                    <img src='/images/ico-green-tick.png' />
                                    <p className='large'>{ pack.scheduledComponent ? 'Subscribed' : 'Redeemed' }</p>
                                </div>
                                { !pack.scheduledComponent &&
                                    <div className='hide-for-small-only link-section'>
                                        <a onClick={ () => { openContinueSubscriptionPopup(pack.provisionId, pack.packageId) } }>Continue Subscription</a>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                    break
                case 'onepay2ds':
                    packageView = (
                        <div key={index} className='package-wrapper row onepay'>
                            <img className='column medium-3' src={pack.icon} />
                            <div className='package-info column medium-7'>
                                <h2>{pack.title}</h2>
                                <p>{pack.description}</p>
                                {
                                    pack.scheduledComponent ? (
                                        <div className='package-detail'>
                                            <span className='mobile-block'>
                                                <span className='label'>Next Billing date:</span>
                                                <span>{formatDate(addDaysToDate(pack.endAt, 1))}</span>
                                            </span>
                                            <span className='mobile-block'>
                                                <span className='label'>Next billing amount:</span>
                                                <span>S${pack.scheduledComponent.price}</span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className='package-detail'>
                                            <span>Enjoy subscription until:</span>
                                            <span>{formatDate(pack.endAt)}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='status-info column medium-2'>
                                <img src='/images/ico-green-tick.png' />
                                <p className='large'>Subscribed</p>
                            </div>
                        </div>
                    )
                    break
                default: {
                    const { price, duration } = pack.components[pack.selectedComponent]
                    packageView = (
                        <div key={index} className='package-wrapper row'>
                            <img className='column medium-3' src={pack.icon} />
                            <div className='package-info column medium-7'>
                                <h2>{pack.title}</h2>
                                <p>{pack.description}</p>
                                <MiniPackOptions
                                    selectedComponent={pack.selectedComponent}
                                    minipacks={pack.components}
                                    onClick={ (componentIndex) => { selectMinipack(index, componentIndex) } }/>
                            </div>
                            <div className='minipack-info column medium-2'>
                                <div>
                                    <h1 className='high-emphasis'>S${price}</h1>
                                    <p>every {duration} days</p>
                                </div>
                                {
                                    (this.isInCart(pack.components[pack.selectedComponent].id)) ?
                                        <a onClick={() => { removeFromCart(pack.components[pack.selectedComponent].id) }}>Remove From Cart</a>
                                        :
                                        <a onClick={() => { addToCart(pack) }}>Add to Cart</a>
                                }
                            </div>
                        </div>
                    )
                }
            }
            return packageView
        })
    }

    renderToasts() {
        const { toasts } = this.props
        const toastNotification = toasts.map((toast, index) => (
            <li key={index} className='toast hide-for-small-only'>
                <p><span>{toast.title} ({toast.duration} days recurring charging)</span> has been {(toast.isAddedToCart ? 'added to' : 'removed from')} your cart</p>
            </li>
        ))
        return <ul className='toastContainer'>{toastNotification}</ul>
    }

    render() {
        const { cart, removeFromCart, isCartOpen, toggleCart } = this.props
        const opened = (isCartOpen) ? 'opened' : ''

        return (
            <div className='purchase'>
                { this.renderToasts() }
                <div className='banner-image'>
                    <div className='row'>
                        <h1>Select your Packs</h1>
                        <p>Available in Selective Samsung Smart TV only</p>
                    </div>
                </div>
                <WhiteWrapper className='hide-for-small-only'>
                    <h2>Selected Packs</h2>
                    {(cart.length === 0) ? (
                        <div>
                            <p>Select your favourite pack + subscription plan.</p>
                            <Button className='disabled'>Next</Button>
                        </div>
                    ) : (
                        <div>
                            {cart.map((cartItem, index) => (
                                <div key={index} className='shopping-cart'>
                                    <p>{`${cartItem.title} (${cartItem.duration} days recurring charge)`}<i className='fa fa-lg fa-times' aria-hidden='true' onClick={() => removeFromCart(cartItem.componentId)}/></p>
                                </div>
                            ))}
                            <Button className='primary' href='/purchase/summary'>Next</Button>
                        </div>
                    )}
                </WhiteWrapper>
                <div className={`show-for-small-only ${opened}`} id='mobile-cart'>
                    {(cart.length === 0) ?
                        <div>
                            <div className='column small-7' onClick={toggleCart}>
                                <div className='column small-2'>
                                    { (isCartOpen) ?
                                    <i className='fa fa-angle-up fa-2x' aria-hidden='true'/>
                                    :
                                    <i className='fa fa-angle-down fa-2x' aria-hidden='true'/>
                                    }
                                </div>
                                <p className='column small-10'>
                                    Select a pack to continue
                                </p>
                            </div>
                            <div className='column small-5 right'>
                                <Button className='disabled'>Next</Button>
                            </div>
                        </div>
                    :
                        <div>
                            <div className='row'>
                                <div className='column small-7' onClick={toggleCart}>
                                    <div className='column small-2'>
                                        { (isCartOpen) ?
                                        <i className='fa fa-angle-up fa-2x' aria-hidden='true'/>
                                        :
                                        <i className='fa fa-angle-down fa-2x' aria-hidden='true'/>
                                        }
                                    </div>
                                    <p className='column small-10'>
                                        {cart.length} pack(s) selected
                                    </p>
                                </div>
                                <div className='column small-5 right'>
                                    <Button className='primary' href='/purchase/summary'>Next</Button>
                                </div>
                            </div>
                            <div className='scrollable'>
                                {cart.map((cartItem, index) => (
                                    <div key={index} className='row'>
                                        <p className='column small-10'>{`${cartItem.title} (${cartItem.duration} days recurring charge)`}</p>
                                        <div className='column small-1'><i className='fa fa-lg fa-times' aria-hidden='true' onClick={() => removeFromCart(cartItem.componentId)}/></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                { this.renderDifferentTypesofPackages() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    packages: state.packages.packages,
    cart: state.packages.cart,
    isCartOpen: state.packages.isCartOpen,
    toasts: state.packages.toasts
})

const mapDispatchToProps = dispatch => ({
    fetchPackages: () => dispatch(actions.fetchPackagesToDisplayOnPurchasePage()),
    selectMinipack: (packageIndex, componentIndex) => dispatch(actions.selectMinipack(packageIndex, componentIndex)),
    addToCart: pack => dispatch(actions.addToCart(pack)),
    removeFromCart: componentId => dispatch(actions.removeFromCartWithToast(componentId)),
    toggleCart: () => dispatch(actions.toggleCart()),
    openContinueSubscriptionPopup: (provisionId, packageId) => dispatch(actions.openContinueSubscriptionPopup(provisionId, packageId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseView)

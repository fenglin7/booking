import { push } from 'react-router-redux'
import React from 'react';
import queryString from 'query-string'
import * as types from '../constants/actionTypes'
import fetchData from '../utils/fetch'

import actions from '../actions/index'

import ContinueSubscription from '../components/PopupContent/ContinueSubscription/ContinueSubscription.jsx'

const API_URL = process.env.API_URL

export const updatePackages = packages => ({
    type: types.UPDATE_PACKAGES,
    packages
})

export const updateCart = pack => ({
    type: types.UPDATE_CART,
    pack
})

export const removeFromCart = componentId => ({
    type: types.REMOVE_FROM_CART,
    componentId
})

export const emptyCart = () => ({
    type: types.EMPTY_CART,
})

export const toggleCart = () => ({
    type: types.TOGGLE_CART,
})

export const addToToasts = packAddedToToasts => ({
    type: types.ADD_TO_TOASTS,
    packAddedToToasts
})

export const removeToast = () => ({
    type: types.REMOVE_TOAST
})

export const selectMinipack = (packageIndex, componentIndex) => ({
    type: types.SELECT_MINIPACK,
    packageIndex,
    componentIndex
})

export const paymentIsProcessing = status => ({
    type: types.PAYMENT_IS_PROCESSING,
    status
})

export const updateFailedProvisions = failedProvisions => ({
    type: types.UPDATE_FAILED_PROVISIONS,
    failedProvisions
})

export const clearFailedProvisions = () => ({
    type: types.CLEAR_FAILED_PROVISIONS,
})

export const getPurchasedPackageList = data => ({
    type: types.GET_PURCHASED_PACKAGE,
    data
})

export const updateContinueSubscriptionPackageInfo = (provisionId, packageId, packageInfo) => ({
    type: types.UPDATE_CONTINUE_SUBSCRIPTION_PACKAGE_INFO,
    provisionId,
    packageId,
    packageInfo
})

export const selectContinueSubscriptionMiniPack = componentIndex => ({
    type: types.SELECT_CONTINUE_SUBSCRIPTION_MINI_PACK,
    componentIndex
})

export const togglePurchaseAgreementInput = () => ({
    type: types.TOOGLE_PURCHASE_AGREEMENT_INPUT,
})

export const togglePurchaseDataPolicyInput = () => ({
    type: types.TOOGLE_PURCHASE_DATA_POLICY_INPUT,
})

// Redux thunk actions
export const addToCart = pack => (
    dispatch,
) => {
    const selectedComponent = pack.components[pack.selectedComponent]
    const packAddedToToasts = {
        title: pack.title,
        duration: selectedComponent.duration,
        isAddedToCart: true,
    }

    dispatch(addToToasts(packAddedToToasts))
    dispatch(updateCart(pack))
    setTimeout(() => dispatch(removeToast()), 2000)
}

export const removeFromCartWithToast = componentId => (
    dispatch,
    getState
) => {
    const cart = getState().packages.cart;
    const removedPack = cart.find(item => (
        item.componentId === componentId
    ))
    const packAddedToToasts = {
        title: removedPack.title,
        duration: removedPack.duration,
        isAddedToCart: false,
    }

    dispatch(addToToasts(packAddedToToasts))
    dispatch(removeFromCart(componentId))
    setTimeout(() => dispatch(removeToast()), 2000)
}

export const fetchPackagesToDisplayOnPurchasePage = () => (
    dispatch,
) => {
    const fetchPackageAvailableForPurchase = fetchData({
        method: 'GET',
        url: `${API_URL}/v1/user/purchase`,
        accessTokenRequired: true,
        successHandler(data) {
            return data
        },
        errorHandler(err) {
            console.log(err)
        }
    })

    const fetchProvisionedPackages = fetchData({
        method: 'GET',
        url: `${API_URL}/v1/user/provision`,
        accessTokenRequired: true,
        successHandler(data) {
            return data
        },
        errorHandler(err) {
            console.log(err)
        }
    })

    Promise.all([fetchPackageAvailableForPurchase, fetchProvisionedPackages])
    .then((packages) => {
        const purchasePackages = packages[0].packages
        const provisionedPackages = packages[1].provisions
        const mappedPurchasePackages = purchasePackages.map((pack) => {
            const components = pack.components.map(component => (
                {
                    id: component.id,
                    price: component.price,
                    duration: component.duration
                }
            ))
            return {
                paymentType: null,
                provisionId: null,
                packageId: pack.id,
                castPackageId: pack.castPackageId,
                icon: pack.icon,
                title: pack.title,
                description: pack.descriptionCheckout,
                components,
                selectedComponent: 0,
                endAt: null,
                scheduledComponent: null
            }
        })
        const mappedProvisionedPackages = provisionedPackages.map((provision) => {
            const scheduledComponent = provision.scheduledComponent ? {
                price: provision.scheduledComponent.price
            } : undefined

            return {
                paymentType: provision.paymentType,
                provisionId: provision.id,
                packageId: provision.package.id,
                castPackageId: provision.package.castPackageId,
                icon: provision.package.icon,
                title: provision.package.title,
                description: provision.package.descriptionCheckout,
                components: null,
                selectedComponent: null,
                endAt: provision.endAt,
                scheduledComponent
            }
        })
        const packagesToDisplayOnPurchasePage = mappedPurchasePackages.concat(mappedProvisionedPackages)
        dispatch(updatePackages(packagesToDisplayOnPurchasePage))
    })
}

const makePurchaseTransaction = (getState, dispatch, creditCardId) => {
    const { cart } = getState().packages

    fetchData({
        method: 'POST',
        url: `${API_URL}/v1/user/transaction`,
        accessTokenRequired: true,
        castTokenRequired: true,
        body: {
            components: cart.map(item => item.componentId),
            paymentType: 'onepay2ds',
            creditCard: creditCardId
        },
        successHandler(response) {
            switch (response.status) {

                case 'EP_SUCCESS': {
                    // need to check for provision status to know if provision failed or is successful & update the state tree respectively so that purchase complete can decide what to show
                    // clear this error on dismount
                    const failedProvisions = response.provisions.filter(
                        provision => provision.status === 'FAILURE'
                    ).map(provision => ({
                        provisionId: provision.id,
                        castPackageId: provision.package.castPackageId,
                        packageId: provision.package.id,
                        packageTitle: provision.package.title,
                        errorMessage: provision.description,
                    }))

                    console.log('failed provisions:', failedProvisions)
                    dispatch(updateFailedProvisions(failedProvisions))
                    dispatch(emptyCart())
                    dispatch(push('/purchase/complete'))
                    break;
                }
                case 'BP_FAILURE':
                case 'EP_FAILURE':
                default:
                    console.log('Make purchase transaction failed:', response)
                    dispatch(push('/purchase/fail'))
            }
        },
        errorHandler(err) {
            console.log('make purchase transaction error:', err)
            dispatch(push('/purchase/fail'))
        }
    })
}

const onePayAddCreditCard = (getState, dispatch, onePayCallbackUrl) => {
    fetchData({
        method: 'POST',
        url: `${API_URL}/v1/user/creditCard`,
        accessTokenRequired: true,
        body: {
            url: `${window.location.origin}${onePayCallbackUrl}`
        },
        successHandler(response) {
            window.location.href = response.redirectUrl
        },
        errorHandler(err) {
            console.log('one pay add credit card error:', err)
            dispatch(push('/purchase/fail'))
        }
    })
}

export const purchasePackage = () => (
    dispatch,
    getState
) => {
    const { agreementInput, dataPolicyInput } = getState().packages

    const errObj = {
        error: 'Purchase Validation Failure',
        meta: {
            messages: []
        }
    }
    const errMessages = errObj.meta.messages

    if (!agreementInput) {
        errMessages.push('You must agree with the Terms and Conditions')
    }

    if (!dataPolicyInput) {
        errMessages.push('You must agree with the Singtel Data Protection Policy')
    }

    if (errMessages.length !== 0) {
        // Frontend Validation for signup failed
        dispatch(actions.updateApplicationError(errObj))
    } else {
        dispatch(actions.paymentIsProcessing(true))

        fetchData({
            method: 'GET',
            url: `${API_URL}/v1/user/creditCard`,
            accessTokenRequired: true,
            successHandler(creditCards) {
                if (creditCards.length === 0) {
                    // there is no credit card (start one pay credit card flow)
                    onePayAddCreditCard(getState, dispatch, '/purchase/check')
                } else {
                    // start purchase flow
                    makePurchaseTransaction(getState, dispatch, creditCards[0].id)
                }
            },
            errorHandler(err) {
                console.log('purchase package error:', err)
                dispatch(push('/purchase/fail'))
            }
        })
    }
}

export const checkPurchase = () => (
    dispatch,
    getState
) => {
    const { router } = getState()
    const queryParams = queryString.parse(router.location.search)

    const creditCardEndCheck = () => {
        fetchData({
            method: 'POST',
            url: `${API_URL}/v1/user/creditCard/${queryParams.merchant_reference}`,
            accessTokenRequired: true,
            castTokenRequired: true,
            successHandler(response) {
                switch (response.status) {
                    case 'BP_SUCCESS':
                        creditCardEndCheck()
                        break;
                    case 'EP_SUCCESS': {
                        const creditCardId = response.id
                        makePurchaseTransaction(getState, dispatch, creditCardId)
                        break;
                    }
                    case 'BP_FAILURE':
                    case 'EP_FAILURE':
                    default: {
                        // Not necessary if we wish to just show a generic error message
                        // const err = {
                        //     meta: {
                        //         messages: [queryParams.failure_message.replace(/%20/g, ' ')]
                        //     }
                        // }
                        // dispatch(actions.updateApplicationError(err))
                        dispatch(push('/purchase/fail'))
                    }
                }
            },
            errorHandler(err) {
                console.log('check purchase error:', err)
                dispatch(push('/purchase/fail'))
            }
        })
    }

    creditCardEndCheck()
}

export const getAPIPurchasedPackage = () => (
    dispatch,
    getState
) => {
    fetch(`${process.env.API_URL}/v1/user/package?token=${getState().authentication.accessToken}`, {
        method: 'GET'
    })
    .then((response) => {
        if (!response.ok) {
            throw response
        }
        return response
    })
    .then(response => response.json())
    .then((data) => {
        dispatch(getPurchasedPackageList(data))
    })
    .catch((err) => {
        console.log(err)
        dispatch(push('/signin'))
    })
}

export const openContinueSubscriptionPopup = (provisionId, packageId) => (
    dispatch,
) => {
    fetchData({
        method: 'GET',
        url: `${API_URL}/v1/user/purchase/${packageId}`,
        accessTokenRequired: true,
        successHandler(packageInfo) {
            dispatch(updateContinueSubscriptionPackageInfo(provisionId, packageId, packageInfo))
            dispatch(actions.openPopup(<ContinueSubscription />))
        },
        errorHandler(err) {
            console.log('purchase package error:', err)
            dispatch(push('/error'))
        }
    })
}

const makeProvisionTransaction = (getState, dispatch) => {
    const { continueSubscriptionPackageInfo } = getState().packages
    const provisionId = continueSubscriptionPackageInfo.provisionId
    const scheduledComponentId = continueSubscriptionPackageInfo.components[continueSubscriptionPackageInfo.selectedComponentIndex].id

    fetchData({
        method: 'POST',
        url: `${API_URL}/v1/user/provision/${provisionId}`,
        body: {
            scheduledComponent: scheduledComponentId
        },
        accessTokenRequired: true,
        successHandler(response) {
            console.log('make provision transaction response:', response)
            if (response.scheduledComponent) {
                dispatch(push('/purchase/complete'))
            } else {
                dispatch(push('/purchase/fail'))
            }
        },
        errorHandler(err) {
            console.log('make provision transaction error:', err)
            dispatch(push('/purchase/fail'))
        }
    })
}

export const purchaseProvisionedPackage = () => (
    dispatch,
    getState
) => {
    fetchData({
        method: 'GET',
        url: `${API_URL}/v1/user/creditCard`,
        accessTokenRequired: true,
        successHandler(creditCards) {
            dispatch(actions.closePopup())
            if (creditCards.length === 0) {
                onePayAddCreditCard(getState, dispatch, '/continueSubscription/check')
            } else {
                makeProvisionTransaction(getState, dispatch)
            }
        },
        errorHandler(err) {
            dispatch(actions.closePopup())
            console.log('purchase package error:', err)
            dispatch(push('/purchase/fail'))
        }
    })
}

// refactor later - combine with checkPurchase
export const checkContinueSubscriptionAddCreditCard = () => (
    dispatch,
    getState
) => {
    const { router } = getState()
    const queryParams = queryString.parse(router.location.search)

    const creditCardEndCheck = () => {
        fetchData({
            method: 'POST',
            url: `${API_URL}/v1/user/creditCard/${queryParams.merchant_reference}`,
            accessTokenRequired: true,
            castTokenRequired: true,
            successHandler(response) {
                console.log('creditCardEndCheck', response)
                switch (response.status) {
                    case 'BP_SUCCESS':
                        creditCardEndCheck()
                        break;
                    case 'EP_SUCCESS': {
                        makeProvisionTransaction(getState, dispatch)
                        break;
                    }
                    case 'BP_FAILURE':
                    case 'EP_FAILURE':
                    default: {
                        dispatch(push('/purchase/fail'))
                    }
                }
            },
            errorHandler(err) {
                console.log('check purchase error:', err)
                dispatch(push('/purchase/fail'))
            }
        })
    }

    creditCardEndCheck()
}

import {
    UPDATE_PACKAGES,
    GET_PURCHASED_PACKAGE,
    SELECT_MINIPACK,
    UPDATE_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    TOGGLE_CART,
    ADD_TO_TOASTS,
    REMOVE_TOAST,
    PAYMENT_IS_PROCESSING,
    UPDATE_FAILED_PROVISIONS,
    CLEAR_FAILED_PROVISIONS,
    UPDATE_CONTINUE_SUBSCRIPTION_PACKAGE_INFO,
    SELECT_CONTINUE_SUBSCRIPTION_MINI_PACK,
    TOOGLE_PURCHASE_AGREEMENT_INPUT,
    TOOGLE_PURCHASE_DATA_POLICY_INPUT,
} from '../constants/actionTypes'
import { replaceAtIndexFromArray } from '../utils/arrayHelpers'


const packages = (
    state = {
        paymentIsProcessing: false,
        cart: [],
        toasts: [],
        packages: [],
        failedProvisions: [],
        continueSubscriptionPackageInfo: {},
        purchasedPackageList: [],
        isCartOpen: false,
        agreementInput: false,
        dataPolicyInput: false,
    },
    action
) => {
    switch (action.type) {
        case PAYMENT_IS_PROCESSING: {
            return {
                ...state,
                paymentIsProcessing: action.status
            }
        }
        case UPDATE_PACKAGES: {
            return {
                ...state,
                packages: action.packages
            }
        }
        case GET_PURCHASED_PACKAGE: {
            return {
                ...state,
                purchasedPackageList: action.data
            }
        }
        case SELECT_MINIPACK: {
            const modifiedPackages = state.packages.map((pack, index) => {
                if (action.packageIndex === index) {
                    return Object.assign(pack, {
                        selectedComponent: action.componentIndex
                    })
                }
                return pack
            })
            return {
                ...state,
                packages: modifiedPackages
            }
        }
        case UPDATE_CART: {
            const selectedComponent = action.pack.components[action.pack.selectedComponent]
            const packAddedToCart = {
                packageId: action.pack.packageId,
                castPackageId: action.pack.castPackageId,
                title: action.pack.title,
                componentId: selectedComponent.id,
                duration: selectedComponent.duration,
                price: selectedComponent.price
            }
            const packIndexInCart = state.cart.findIndex(item => item.packageId === action.pack.packageId)
            const isPackInCart = packIndexInCart > -1

            return {
                ...state,
                cart: (isPackInCart) ? replaceAtIndexFromArray(state.cart, packIndexInCart, [packAddedToCart]) : state.cart.concat([packAddedToCart])
            }
        }
        case REMOVE_FROM_CART: {
            const packIndexToRemove = state.cart.findIndex(item => (
                item.componentId === action.componentId
            ))
            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, packIndexToRemove), ...state.cart.slice(packIndexToRemove + 1)
                ]
            }
        }
        case EMPTY_CART: {
            return {
                ...state,
                cart: []
            }
        }
        case TOGGLE_CART: {
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        }
        case ADD_TO_TOASTS: {
            const toasts = state.toasts.concat(action.packAddedToToasts)

            return {
                ...state,
                toasts
            }
        }
        case REMOVE_TOAST: {
            const toasts = state.toasts.slice(1)

            return {
                ...state,
                toasts
            }
        }
        case UPDATE_FAILED_PROVISIONS: {
            return {
                ...state,
                failedProvisions: action.failedProvisions
            }
        }
        case CLEAR_FAILED_PROVISIONS: {
            return {
                ...state,
                failedProvisions: []
            }
        }
        case UPDATE_CONTINUE_SUBSCRIPTION_PACKAGE_INFO: {
            const mappedComponents = action.packageInfo.components.map(component => ({
                id: component.id,
                duration: component.duration,
                price: component.price
            }))

            return {
                ...state,
                continueSubscriptionPackageInfo: {
                    provisionId: action.provisionId,
                    packageId: action.packageId,
                    title: action.packageInfo.title,
                    components: mappedComponents,
                    selectedComponentIndex: 0
                }
            }
        }
        case SELECT_CONTINUE_SUBSCRIPTION_MINI_PACK: {
            const { title, components, provisionId, packageId } = state.continueSubscriptionPackageInfo

            return {
                ...state,
                continueSubscriptionPackageInfo: {
                    provisionId,
                    packageId,
                    title,
                    components,
                    selectedComponentIndex: action.componentIndex
                }
            }
        }
        case TOOGLE_PURCHASE_AGREEMENT_INPUT: {
            return {
                ...state,
                agreementInput: !state.agreementInput
            }
        }
        case TOOGLE_PURCHASE_DATA_POLICY_INPUT: {
            return {
                ...state,
                dataPolicyInput: !state.dataPolicyInput
            }
        }
        default:
            return state
    }
}

export default packages

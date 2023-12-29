import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// const url = 'http://192.168.1.101:3002'
const url = 'https://meoecoapi.meoeco.click'

const API = axios.create({
    baseURL: url,
    responseType: 'json',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

API.interceptors.request.use(async (req) => {
    if (await AsyncStorage.getItem('AccessToken')) {
        req.headers.Authorization = `Bearer ${AsyncStorage.getItem('AccessToken') || ''}`
    }
    return req
})

//login
export const loginWithPassWord = (
    formData = {
        email,
        password,
        os,
        osVersion,
        browser,
        browserVersion,
        devide_id,
        ip,
    },
) => {
    return API.post('/auth/loginWithPassword', {
        ...formData,
    })
}
export const verifyOtpDevide = (
    formData = {
        email,
        password,
        phone_number,
        otpCode,
        typeOtp,
        devide_id,
        ip,
        os,
        osVersion,
    },
) => {
    return API.post('/auth/login/verifyOtpDevideWithEmail', { ...formData })
}

//register
export const registerInfor = ({ email }) => {
    return API.post('/auth/register/info', { email })
}
export const verifyOtpWithEmailWhenRegister = (
    formData = {
        userName,
        email,
        password,
        phone_number,
        otpCode,
        typeOtp,
    },
) => {
    return API.post('/auth/register/verifyOtpWithEmail', formData)
}

export const testRequest = () => {
    return API.get('/test')
}

export const getAllSellingProducts = () => {
    return API.get('/admin/selling-product')
}

export const getAllOutStandingProducts = () => {
    return API.get('/admin/outstanding-product')
}

export const getProductDetailData = ({ product_item_id }) => {
    return API.get(`/admin/product-items/${product_item_id}`)
}

// purchase
export const purchaseShoppingCartItem = ({ formData }) => {
    return API.post('/purchase/purchaseShoppingCartItem', formData)
}

export const getListPaymentMethodForUser = (userId) => {
    return API.get(`/user-payment-method/foruser/${userId}`)
}
export const addCreditCard = ({ formData }) => {
    return API.post('/user-payment-method', formData)
}

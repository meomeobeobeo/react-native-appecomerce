import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'

import en from './en.json'
import vi from './vi.json'


const languageResources = {
    en : {translation : en},
    vi : {translation : vi}
}

i18next.use(initReactI18next).init({
    compatibilityJSON:'v3',
    lng : 'vi',
    falbackLng : 'en',
    resources : languageResources,
})

export {i18next};


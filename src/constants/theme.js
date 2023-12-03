import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const colors = {
    primary: '#070f18',
    gray: '#6d6d6d',
    lightGray: '#7C7C7C',
    moreLightGray :"#E2E2E2",
    light: '#fbfbfb',
    white: '#fff',
    black: '#181725',
    lightBlue: '#5dd8ed',
    lightPurple: '#8A88E3',
    purple: '#1B134E',
    red: '#ff4d4d',
    orange : '#FB5531',
    yellow : '#FFC41E',
    blue : '#1255D5'
}

export const shadow = {
    light: {
        shadowColor: colors.black,
        shadowRadius: 4,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    dark: {
        shadowColor: colors.black,
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
}

export const sizes = {
    width: width,
    height: height,
    title: 32,
    h2: 24,
    h3: 18,
    body: 14,
    caption: 12,
    radius: 16,
}

export const spacing = {
    s: 8,
    m: 18,
    l: 24,
    xl: 40,
}

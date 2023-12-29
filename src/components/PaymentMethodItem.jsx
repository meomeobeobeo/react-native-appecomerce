import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from './Icons'
import { colors } from '../constants/theme'

export default function PaymentMethodItem({ value, activeItemId }) {
    return (
        <View
            key={value.id}
            style={[
                {
                    width: '90%',
                    margin: 4,
                    borderWidth: 1,
                    borderColor: colors.lightGray,
                    height: 100,
                    borderRadius: 8,
                },
                activeItemId === value.id ? styles.active : '',
            ]}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }}
            >
                <Icons onPress={() => {}} icon={'EditText'} size={18} />
            </View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 500,
                        marginTop: 8,
                        marginLeft: 8,
                    }}
                >
                    {value.payment_type_name}
                </Text>
                {value.payment_type_name === 'Master card' ? (
                    <View style={{ margin: 4 }}>
                        <Icons icon={'MasterCard'} />
                    </View>
                ) : (
                    <></>
                )}
                {value.payment_type_name === 'Visa' ? (
                    <View style={{ margin: 4 }}>
                        <Icons icon={'Visa'} />
                    </View>
                ) : (
                    <></>
                )}
            </View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginTop: 8,
                        marginLeft: 8,
                        color: colors.lightGray,
                    }}
                >
                    Cart number :{' '}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginTop: 8,
                        marginLeft: 8,
                        color: colors.lightGray,
                    }}
                >
                    {value.account_number}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    active: {
        borderColor: colors.lightPurple,
        borderWidth: 1,
        backgroundColor: colors.moreLightGray,
    },
})

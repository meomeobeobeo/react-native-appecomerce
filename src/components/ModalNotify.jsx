import { Keyboard, Modal, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo } from 'react'
import { colors, sizes } from '../constants/theme'
import ButtonCustom from './ButtonCustom'

function ModalNotify({ visible, closeModal, navigation, notiMessage, action, header }) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => {
                    closeModal()
                    Keyboard.dismiss() // Close the keyboard if it's open
                }}
            >
                <View style={[styles.modalBackDrop]}>
                    <ScrollView
                        contentContainerStyle={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.0)',
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            style={[
                                {
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.0)',
                                },
                            ]}
                        >
                            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                <View
                                    style={[
                                        {
                                            backgroundColor: 'rgba(255, 255, 255, 1)',
                                            padding: 16,
                                            width: '90%',
                                            height: 300,
                                            borderRadius: 12,
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        },
                                        styles.shadowProp,
                                    ]}
                                >
                                    <Text style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>{header}</Text>
                                    {notiMessage.map((message, index) => {
                                        return (
                                            <Text key={index} style={{ width: '90%', marginVertical: 4, fontSize: 16, fontWeight: 500 }}>
                                                {message}
                                            </Text>
                                        )
                                    })}

                                    {/* footer */}
                                    <View style={{ width: '100%', position: 'absolute', bottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <ButtonCustom onPress={closeModal} style={{ bottom: 8, backgroundColor: colors.red, borderWidth: 0 }} buttonText="Đóng" />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
export default memo(ModalNotify)

const styles = StyleSheet.create({
    modalBackDrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    shadowProp: {
        borderRadius: 10,
        shadowColor: '#111',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 12, // for android
    },
})

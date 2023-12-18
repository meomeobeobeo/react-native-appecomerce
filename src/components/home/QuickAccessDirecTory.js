import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryAction from './CategoryAction'
import { useTranslation } from 'react-i18next'

export default function QuickAccessDirecTory() {

  const { t } = useTranslation()

  return (
    <View style = {{
      flex : 1,
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
      alignContent :'center',
      marginHorizontal : 24
    }}>


      {/* 
        nameCategory,
        IconName,
        Action
      
      */}
      <CategoryAction nameCategory={t('sport')} iconName={'SoccerBall'} />
      <CategoryAction nameCategory={t('fashion')} iconName={'Fashion'} />
      <CategoryAction nameCategory={t('houseware')} iconName={'Book'} />
      <CategoryAction nameCategory={t('beautify')} iconName={'Beauty'} />
      <CategoryAction nameCategory={t('technology')} iconName={'Technology'} />

    </View>
  )
}

const styles = StyleSheet.create({})
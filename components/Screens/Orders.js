import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Shared/Header'

const Orders = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <Header navigation={navigation} />
      <Text>Orders</Text>
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({})
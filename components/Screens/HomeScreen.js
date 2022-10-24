import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import MenuIcon from 'react-native-vector-icons/SimpleLineIcons';

import Cart from "../Shared/Cart";
import Drawer from "../Shared/Drawer";

const HomeScreen = ({navigation}) => {

    const[drawerState, setDrawerState] = useState(false) 

  return (
    <>
    <Drawer drawerState={drawerState} />
    <View onTouchStart={()=>setDrawerState(false)} style={{flex:1, marginTop:20, marginLeft:17, marginRight:17}}>
    {/* Header */}
    <View style={{flexDirection:'row', width:'100%', backgroundColor:''}}>
        <TouchableOpacity style={{marginRight:'auto'}} onPress={()=>setDrawerState(true)} >
            <MenuIcon name="menu" size={30} color="grey" />
        </TouchableOpacity>
        <View style={{marginLeft:'auto', marginRight:'auto', width:190}}>
            <Text style={{fontSize:12, fontFamily:'Inter-Light', lineHeight:15}}>Your Shop</Text>
            <Text style={{fontSize:15, fontFamily:'Inter-Medium', lineHeight:16}}>Haidery Bakery & Nimco...</Text>
        </View>
        <View style={{marginLeft:'auto', width:30}}></View>
    </View>
    <View style={{ marginTop:20, borderBottomColor: 'silver', borderBottomWidth: 1 }} />
        {/* Screen */}
    <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
        <TouchableOpacity style={styles.mainScreens}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.mainScreenText}>124</Text>
                <Text style={{color:'white', fontSize:20, alignSelf:'center'}}>+</Text>
            </View>
            <Text style={{color:'white', lineHeight:14}}>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainScreens}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.mainScreenText}>15</Text>
                <Text style={{color:'white', fontSize:20, alignSelf:'center'}}></Text>
            </View>
            <Text style={{color:'white', lineHeight:14}}>Re-Stock</Text>
        </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:30}}>
        <TouchableOpacity style={styles.mainScreens} onPress={()=>navigation.navigate('Inventory')}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.mainScreenText}>345</Text>
                <Text style={{color:'white', fontSize:20, alignSelf:'center'}}></Text>
            </View>
            <Text style={{color:'white', lineHeight:14}}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainScreens} disabled={drawerState} onPress={()=>navigation.navigate('Orders')}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.mainScreenText}>345</Text>
                <Text style={{color:'white', fontSize:20, alignSelf:'center'}}></Text>
            </View>
            <Text style={{color:'white', lineHeight:14}}>Orders</Text>
        </TouchableOpacity>
    </View>
    </View>
    <Cart/>
    </>
  )
}
export default HomeScreen
const styles = StyleSheet.create({
    menuFonts:{
        color:'white',
        fontSize:20,
        marginTop:6,
        fontFamily:'Inter-Medium'
    },
    menuIconProfile:{
        marginTop:7,
        marginRight:5,
        fontSize:30,
        color:'white'
    },
    menuIconOrders:{
        marginTop:5,
        marginRight:5,
        fontSize:30,
        color:'white'
    
    },
    menuIconHelpCenter:{
        marginTop:7,
        marginRight:9,
        fontSize:25,
        color:'white'
    
    },
    menuIconSettings:{
        marginTop:7,
        marginRight:9,
        fontSize:25,
        color:'white'
    },
    mainScreens:{
        width:130,
        height:130,
        backgroundColor:'#1A6DBB',
        borderRadius:18,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10
    },
    mainScreenText:{
        color:'white',
        fontFamily:'Inter-ExtraBold',
        fontSize:35
    }
})
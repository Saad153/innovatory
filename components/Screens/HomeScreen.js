import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight, Animated, Easing, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuIcon from 'react-native-vector-icons/SimpleLineIcons';

const HomeScreen = ({navigation}) => {

  const translation = useRef(new Animated.Value(0)).current;
    const openDrawer = () => {
        Animated.timing(translation,{
            toValue:400,
            duration: 300,
            easing: Easing.in,
            useNativeDriver:true
        }).start();
    }
    const closeDrawer = () => {
        Animated.timing(translation,{
            toValue:-580,
            duration: 200,
            useNativeDriver:true
        }).start();
    }
  return (
    <>
    {/* Drawer */}
    <Animated.View style={{backgroundColor:'#1A6DBB',position:'absolute',zIndex:1,height:'100%',width:'80%',
        transform:[{translateX:translation}],left:-400
    }}>
        <View style={{marginLeft:15, marginTop:30, paddingRight:50}}>
            <Text style={{ color:'white',fontSize:24, fontFamily:'Inter-Black' }}
            >Syed Muhammad Abdullah Ali Zaidi</Text>
            <Text style={{ color:'white',fontSize:14, fontFamily:'Inter-Medium' }}
            >syedabdullahteamhail@gmail.com</Text>
        </View>
        <View
            style={{
                marginTop:20,
                borderBottomColor: 'white',
                borderBottomWidth: 1
            }}
        />
        <View style={{marginTop:40, paddingLeft:20}}>

        <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:15}}>
            <EvilIcons name="user" style={styles.menuIconProfile} />
            <Text style={styles.menuFonts}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Orders")} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:15}}>
            <Entypo name="list" style={styles.menuIconOrders} />
            <Text style={styles.menuFonts}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Orders")} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:15}}>
            <AntDesign name="questioncircleo" style={styles.menuIconHelpCenter} />
            <Text style={styles.menuFonts}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Settings")} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:15}}>
            <Ionicons  name="settings-sharp" style={styles.menuIconSettings} />
            <Text style={styles.menuFonts}>Settings</Text>
        </TouchableOpacity>

        </View>
    </Animated.View>

    <View onTouchStart={closeDrawer} style={{flex:1, marginTop:20, marginLeft:17, marginRight:17}}>
    
    {/* Header */}
    <View style={{flexDirection:'row', width:'100%', backgroundColor:''}}>
        <TouchableOpacity style={{marginRight:'auto'}} onPress={()=>openDrawer()} >
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
        <TouchableOpacity style={styles.mainScreens}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.mainScreenText}>345</Text>
                <Text style={{color:'white', fontSize:20, alignSelf:'center'}}></Text>
            </View>
            <Text style={{color:'white', lineHeight:14}}>Orders</Text>
        </TouchableOpacity>
    </View>
    </View>
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
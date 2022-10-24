import React, { useRef } from "react";
import MMKV from '../../functions/mmks';
import { useMMKVStorage } from "react-native-mmkv-storage";
import { StyleSheet, Text, View, Button, TouchableHighlight, Animated, Easing, TouchableOpacity } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";

const Cart = () => {
    const [cart, setCart] = useMMKVStorage("user", MMKV,[]);
    const refRBSheet = useRef();
    return (
    <>
    {(cart.length!=0) &&
    <View style={{
        backgroundColor:'white', position:'absolute', bottom:0, width:'100%', alignItems:'center',
        borderColor:'silver', borderWidth:1, borderTopLeftRadius:20,borderTopRightRadius:20, height:90, zIndex:0
      }}>
      <TouchableOpacity style={{
          backgroundColor:'#5E9CD7', height:50, borderRadius:30, marginTop:20, width:'90%',
          paddingLeft:10, paddingRight:10, paddingTop:7, flexDirection:'row', justifyContent:'space-between'
        }} 
        onPress={() => refRBSheet.current.open()}
      >
      
        <View style={{
          backgroundColor:'white', width:35, height:35, alignContent:'center',
          alignItems:'center', justifyContent:'center', borderRadius:25
          }}>
          <Text style={{backgroundColor:'white'}}>{cart.length}</Text>
        </View>
        <View style={{
          width:70, height:35, alignContent:'center',
          alignItems:'center', justifyContent:'center',
          }}><Text>View Cart</Text>
        </View>
        <View style={{
          width:50, height:35, alignContent:'center',
          alignItems:'center', justifyContent:'center',
          }}>
        </View>
      
      </TouchableOpacity>
    </View>
    }
    <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        minClosingHeight={300}
        height={600}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container:{}
        }}
    >
    </RBSheet>
    </>
  )
}

export default Cart

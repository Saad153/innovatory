import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialTabs from 'react-native-material-tabs';

import MMKV from '../../../functions/mmks';
import { useMMKVStorage } from "react-native-mmkv-storage";

const ItemInfo = ({itemInfo, closeModal}) => {

    const [cart, setCart] = useMMKVStorage("user", MMKV,[]);

    const [selectedTab, setSelectedTab] = useState(0);

    const [singleToggle, setSingleToggle] = useState(false);
    const [singleCount, setSingleCount] = useState(0);

    const [cartanToggle, setCartanToggle] = useState(false);
    const [cartanCount, setCartanCount] = useState(0);

    useEffect(() => {
        console.log(cart);
        console.log(itemInfo);
        cart.forEach((x)=>{
            if(x.ItemId==itemInfo.id){
                setSingleCount(x.qty)
                setSingleToggle(true)
            }
        })
    }, [])
    
    useEffect(()=>{
        if(singleCount==0){
            setSingleToggle(false);
        }
        if(cartanCount==0){
            setCartanToggle(false);
        }
    }, [singleCount, cartanCount])

  return (
    <View style={{flex:1}}>

        <View style={{flexDirection:'row'}}>
            <Image source={{uri:itemInfo.image}} style={styles.img} />
            <View style={styles.infoCon}>
                <Text style={styles.name}>{itemInfo.name}</Text>
                <Text style={styles.unit}>{itemInfo.units}</Text>
            </View>
        </View>

        <View>
            <MaterialTabs
                items={['MY Stock', 'Edit Info', 'History']}
                selectedIndex={selectedTab}
                onChange={setSelectedTab}
                barColor="#ffffff"
                indicatorColor="#1A6DBB"
                indicatorHeight={3}
                activeTextColor="#373737"
                textStyle={{color:'#373737', width:100}}
            />
            <View style={{backgroundColor:'silver', height:1, marginBottom:12}}/>
        </View>

        <View style={styles.stockCont}>
            <View style={{flexDirection:'row'}}>
                <Image source={require('../../../assets/images/iconpngs/singlebig.png')}
                    style={styles.singleIcon} />
                <Text style={styles.unitCount}>
                    <Text style={{fontWeight:'900'}}>31 </Text>Units
                </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            {singleCount==0 &&
            <TouchableOpacity onPress={()=>{setSingleToggle(true); setSingleCount(1)}}>
                <View style={styles.stockBtn}>
                    <Text style={{color:'white'}}>Stock Up</Text>
                </View>
            </TouchableOpacity>
            }
            {singleCount>0 &&
            <View style={styles.stockBtnGrey}>
                <TouchableOpacity style={styles.minusBtn} 
                    onPress={()=>{setSingleCount(singleCount-1)}}
                >
                <Text style={{color:'white', fontSize:15}}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.plusBtn} 
                    onPress={()=>{setSingleCount(singleCount+1)}}
                >
                <Text style={{color:'white', fontSize:15}}>+</Text>
                </TouchableOpacity>
                <Text style={styles.stockUpFont}>{singleCount}</Text>
            </View>
            }
            </View>
        </View>
        <View style={styles.stockCont}>
            <View style={{flexDirection:'row'}}>
                <Image source={require('../../../assets/images/iconpngs/cartanbig.png')}
                    style={styles.singleIcon} />
                <Text style={styles.unitCount}>
                    <Text style={{fontWeight:'900'}}>99 </Text>Units
                </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            {!cartanToggle&&
            <TouchableOpacity onPress={()=>{setCartanToggle(true); setCartanCount(1)}}>
                <View style={styles.stockBtn}>
                    <Text style={{color:'white'}}>Stock Up</Text>
                </View>
            </TouchableOpacity>
            }
            {cartanToggle&&
            <View style={styles.stockBtnGrey}>
                <TouchableOpacity style={styles.minusBtn} 
                    onPress={()=>{setCartanCount(cartanCount-1)}}
                >
                <Text style={{color:'white', fontSize:15}}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.plusBtn} 
                    onPress={()=>{setCartanCount(cartanCount+1)}}
                >
                <Text style={{color:'white', fontSize:15}}>+</Text>
                </TouchableOpacity>
                <Text style={styles.stockUpFont}>{cartanCount}</Text>
            </View>
            }
            </View>
        </View>
        <View style={styles.bottomCont}>
            <TouchableOpacity 
                style={(singleCount==0&&cartanCount==0)?styles.disableBtn:styles.clearBtn}
                disabled={(singleCount==0&&cartanCount==0)?true:false} 
                onPress={()=>{
                    setCartanCount(0);
                    setSingleCount(0);
                    let tempState = [...cart];
                    tempState=tempState.filter((x)=>{
                        return x.ItemId!=itemInfo.id
                    })
                    setCart(tempState)
                }}>
                <Text style={styles.btmBtnText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={(singleCount==0&&cartanCount==0)?styles.disableBtn:styles.confirmBtn} 
                disabled={(singleCount==0&&cartanCount==0)?true:false}
                onPress={()=>{
                    let tempData = [...cart];
                    if(cart.length>0){
                        cart.forEach((x, index)=>{
                            if(x.ItemId==itemInfo.id){
                            tempData[index].qty = singleCount
                            
                        }else{
                            tempData.push({
                                name:itemInfo.name,
                                units:itemInfo.units,
                                image:itemInfo.image,
                                ChildCategoryId:itemInfo.ChildCategoryId,
                                ItemId:itemInfo.id,
                                cartan:itemInfo.cartan,
                                qty:singleCount
                            })
                        }
                    })
                    }else{
                        tempData.push({
                            name:itemInfo.name,
                            units:itemInfo.units,
                            image:itemInfo.image,
                            ChildCategoryId:itemInfo.ChildCategoryId,
                            ItemId:itemInfo.id,
                            cartan:itemInfo.cartan,
                            qty:singleCount
                        })
                    }
                    console.log(tempData)
                    setCart(tempData);
                    closeModal();
                }}>
                <Text style={styles.btmBtnText}>Confirm</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{backgroundColor:'red'}}
                onPress={()=>setCart([])}>
                <Text style={styles.btmBtnText}>remove</Text>
            </TouchableOpacity> */}
        </View>
    </View>
  )
}
export default ItemInfo

const styles = StyleSheet.create({
    img:{ 
        width:70,
        height:70,
        margin:10
    },
    infoCon :{
        margin:10,
        width:150,
        color:'#373737'
    },
    name:{ 
        fontWeight:'900',
        fontSize:15
    },
    unit:{ 
        fontWeight:'500'
    },
    unitCount:{ 
        color:'#373737', margin:14, width:60
    },
    stockCont:{
        flexDirection:'row', justifyContent:'space-between',
        padding:12
    },
    icon:{
        color:'#1A6DBB',
        fontSize:50
    },
    singleIcon:{
        height:50,
        width:47
    },
    stockBtn:{
        backgroundColor:'#1A6DBB',
        paddingLeft:20,
        paddingRight:20,
        borderRadius:25,
        paddingBottom:3,
        paddingTop:3,
        color:'white',
        margin:14
    },
    stockBtnGrey:{
        backgroundColor:'silver',
        width:90,
        textAlign:'center',
        alignItems:'center',
        borderRadius:25,
        paddingBottom:3,
        paddingTop:3,
        color:'white',
        margin:14,
        height:25
    },
    stockUpFont:{
        color:'#373737', fontWeight:'900'
    },
    minusBtn:{
        backgroundColor:'#1A6DBB',
        width:32,height:32,
        justifyContent:'center',
        position:'absolute', borderRadius:25,
        left:-10,top:-3,
        textAlign:'center',
        alignItems:'center',
    },
    plusBtn:{
        backgroundColor:'#1A6DBB',
        width:32,height:32,
        justifyContent:'center',
        position:'absolute', borderRadius:25,
        right:-10,top:-3,
        textAlign:'center',
        alignItems:'center',
    },
    bottomCont:{
        flex:1,  flexDirection:'row', alignItems:'flex-end', justifyContent:'center'
    },
    clearBtn:{
        backgroundColor:'#AA4444',
        width:130,
        height:40,
        marginLeft:10,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    confirmBtn:{
        backgroundColor:'#1A6DBB',
        width:130,
        height:40,
        marginLeft:10,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    disableBtn:{
        backgroundColor:'silver',
        width:130,
        height:40,
        marginLeft:10,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    btmBtnText:{
        color:'white',
        fontWeight:'900'
    }
})
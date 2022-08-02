import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialTabs from 'react-native-material-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'

const ItemInfo = ({itemInfo}) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const [singleToggle, setSingleToggle] = useState(false);
    const [singleCount, setSingleCount] = useState(0);
    const [cartanToggle, setCartanToggle] = useState(false);
    const [cartanCount, setCartanCount] = useState(0);

    useEffect(() => {
        if(singleCount==0){
            setSingleToggle(false);
        }
    }, [singleCount])

  return (
    <>
    <View style={styles.container}>
        <View>
            <Image style={styles.img} source={{ uri:itemInfo.image}} />
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.name}>{itemInfo.name}</Text>
            <Text >{itemInfo.units}</Text>
        </View>
    </View>
    <View style={{width:'100%'}}>
    <MaterialTabs
        items={['My Stock','Edit Info','History']}
        selectedIndex={selectedTab}
        onChange={setSelectedTab}
        barColor="#ffffff"
        indicatorColor="#1A6DBB"
        activeTextColor="#373737"
        indicatorHeight={3}
        textStyle={{
            color:'#373737',
            margin:0,
            padding:0,
            fontWeight:'600'
        }}
        />
    <View style={{width:'100%'}}>
        <View style={{backgroundColor:'silver',height:1}}></View>
        <View style={{flexDirection:'row', justifyContent:'center', padding:10, marginTop:10}}>
        <View style={{flexDirection:'row', flex:1}}>
            <Image style={{height:50, width:48}} source={require('../../../assets/images/iconpngs/single.png')} />
            <View style={{marginLeft:13, marginTop:12}}>
                <Text style={{fontSize:16}}><Text style={{fontWeight:'900'}}>31</Text> Units</Text>
            </View>
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{margin:12}}>
            {!singleToggle &&
            <TouchableOpacity style={{
                backgroundColor:'#1A6DBB', paddingLeft:20, paddingRight:20,
                borderRadius:25, paddingBottom:3, paddingTop:3
            }} onPress={()=>{
                setSingleToggle(true); setSingleCount(1)
            }}>
                <Text style={{color:'white'}}>Stock Up</Text>
            </TouchableOpacity>
            }
            {singleToggle &&
            <View style={{
                backgroundColor:'silver', width:98,
                borderRadius:12, justifyContent:'center', flex:1
            }}>
                <TouchableOpacity style={{
                    backgroundColor:'#1A6DBB',width:30,height:30,justifyContent:'center',
                    position:'absolute', borderRadius:25, left:-10
                }} onPress={()=>setSingleCount(singleCount+1)}>
                    <Text style={{alignSelf:'center', color:'white', fontSize:18}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor:'#1A6DBB',width:30,height:30,justifyContent:'center',
                    position:'absolute', borderRadius:25, right:-10
                }} onPress={()=>setSingleCount(singleCount-1)}>
                    <Text style={{alignSelf:'center', color:'white', fontSize:18}}>-</Text>
                </TouchableOpacity>
            <Text style={{
                alignSelf:'center', color:'#373737', fontWeight:'700'
            }}>{singleCount}</Text>
            </View>
            }
        </View>
        </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', padding:10}}>
        <View style={{flexDirection:'row', flex:1}}>
        <Image style={{height:52, width:50}} source={require('../../../assets/images/iconpngs/cartan.png')} />
        <View style={{margin:12}}>
            <Text style={{fontSize:16}}><Text style={{fontWeight:'900'}}>310</Text> Units</Text>
        </View>
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{margin:12}}>
            <TouchableOpacity style={{
                backgroundColor:'#1A6DBB', paddingLeft:20, paddingRight:20,
                borderRadius:25, paddingBottom:3, paddingTop:3
            }}>
                <Text style={{color:'white'}}>Stock Up</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    </View>
    </View>
    </>
  )
}

export default ItemInfo

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    img:{ width:90, height:90 },
    infoContainer:{
        marginLeft:20,
        width:200
    },
    name:{ fontWeight:'900' },
    icon:{
        color:'#1A6DBB',
        fontSize:50
    }
})
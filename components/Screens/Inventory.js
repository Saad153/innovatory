import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import Header from '../Shared/Header'
import Icon from 'react-native-vector-icons/Entypo';
import MaterialTabs from 'react-native-material-tabs';
import axios from 'axios';
import API from '../../apis/index.json'

const Inventory = ({navigation}) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoadoing] = useState(true);
  const [items, setItems] = useState([])
  const [tabItems, setTabItems] = useState({})
  
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab])

  const fetchData = async() => {
    await axios.get(API.GetAllParentChilCategories).then(async(res)=>{
      let tempTabData = [];
      let tempTabNames = ['All Items'];

      tempTabData = await axios.get(API.GetAllGlobalInventoryItems,{headers: {'offset': '0', 'limit': '10'}})
        .then((res)=> tempData=res.data);

      res.data.forEach(element => {
        if(element.ChildCategories.length>0){
          element.ChildCategories.map((x)=>{
            tempTabNames.push(x.name);
          })
        }
      });
      setTabs(tempTabNames);
      setLoadoing(false);
    })
  }
  return (
    <View style={{flex:1}}>
    <Header navigation={navigation} />
    <View style={{backgroundColor:'#1A6DBB'}}>
    <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity style={styles.cross} onPress={()=>setSearchTerm('')}>
        <Icon name="cross" color={'silver'} size={30} />
      </TouchableOpacity>
    </View>
    {loading==true && 
        <ActivityIndicator color={'#1A6DBB'} size='large'
          style={{marginTop:'auto', marginBottom:'auto'}} 
        />
    }
    {loading==false && 
    <>
      <MaterialTabs
          uppercase={false}
          scrollable={true}
          items={tabs}
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
          barColor="#1A6DBB"
          indicatorColor="white"
          indicatorHeight={3}
          textStyle={{color:'white'}}
          activeTextColor="white"
      />
      <View>
        {
          items.map((item, index)=>{
            return(
            <View key={index}>
              <Text>{item.name}</Text>
            </View>
            )
          })
        }
      </View>
    </>
    }
    </View>
  )
}
export default Inventory

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderRadius: 10,
    paddingLeft: 30,
    borderWidth:1,
    borderRadius:55,
    borderColor:'silver',
    margin:10,
    paddingRight:40,
    backgroundColor:'white'
  },
  cross:{
    position:'absolute',
    top:20,
    right:20,
  }
})
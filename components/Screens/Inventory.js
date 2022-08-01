import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView, Button  } from 'react-native'
import Header from '../Shared/Header'
import Icon from 'react-native-vector-icons/Entypo';
import MaterialTabs from 'react-native-material-tabs';
import axios from 'axios';
import API from '../../apis/index.json'

const Inventory = ({navigation}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoadoing] = useState(true);
  const [tabLoading, setTabLoadoing] = useState(false);
  const [items, setItems] = useState([{id:'all',tab:'All Items',items:[], fetched:false}])
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    if(selectedTab!=0){
      if(items[selectedTab].fetched==false){
        fetchItemsByTab(selectedTab)
      }
    }
  }, [selectedTab]);

  useEffect(() => {
      axios.get(API.GetGlobalInventoryItemsBySearch,{
        headers: {'searchword': `${searchTerm}`}
      }).then((res)=>{
        console.log(res.data);
        setSearchItems(res.data)
      })
  }, [searchTerm])
  

  const fetchData = async() => {
    await axios.get(API.GetAllParentChilCategories).then(async(res)=>{
      let tempTabData = [];
      let tempTabNames = ['All Items'];
      tempTabData = await axios.get(API.GetAllGlobalInventoryItems,{headers: {'offset': '0', 'limit': '10'}})
      .then((res)=>tempData=res.data);
      
      let tempItems = [{id:'all',tab:'All Items',items:tempTabData, fetched:true}];

      res.data.forEach(element => {
        if(element.ChildCategories.length>0){
          element.ChildCategories.map((x, i)=>{
            tempTabNames.push(x.name);
            tempItems.push({id:x.id,tab:x.name, items:[], fetched:false})
          })
        }
      });
      setTabs(tempTabNames);
      setLoadoing(false);
      setItems(tempItems);
    })
  }

  const fetchItemsByTab = async(i) => {
    setTabLoadoing(true);
    await axios.get(API.GetGlobalInventoryItemsByTab,{
      headers: {'name': `${tabs[i]}`}
    }).then((res)=>{

      let tempStateItems = [...items];
      res.data.Items.forEach((x)=>{
        tempStateItems[i].items.push(x)
      })
      tempStateItems[i].fetched=true;
      setItems(tempStateItems);
      setLoadoing(false);
      setTabLoadoing(false);
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
    {(loading==false && searchTerm=='') && 
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
      {
        tabLoading==true &&
        <ActivityIndicator color={'#1A6DBB'} size='large'
        style={{marginTop:'auto', marginBottom:'auto'}} 
      />
      }
      {tabLoading==false &&
        <ScrollView>
        {
          items[selectedTab].items.map((item, index)=>{
            return(
            <View key={index} style={styles.content}>
               <View style={{width:200, flexDirection:'row'}}>
                <Image
                  style={styles.image}
                  source={{
                    uri:item.image
                  }}
                />
                <View style={{padding:10 ,maxWidth:200}}>
                <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                <Text>{item.units}</Text>
                </View>
               </View>
              <View style={{alignSelf:'center'}}>
                <TouchableOpacity 
                  style={{
                    backgroundColor:'#1A6DBB', paddingLeft:30, paddingRight:30,
                    borderRadius:25, paddingBottom:3, paddingTop:3
                    }}>
                  <Text style={{color:'white'}}>Info</Text>
                </TouchableOpacity>
              </View>
            </View>
            )
          })
        }
        </ScrollView>
      }
    </>
    }
    {
      searchTerm!=="" &&
      <ScrollView>
        {
          searchItems.map((item, index)=>{
            return(
            <View key={index} style={styles.content}>
               <View style={{width:200, flexDirection:'row'}}>
                <Image
                  style={styles.image}
                  source={{
                    uri:item.image
                  }}
                />
                <View style={{padding:10 ,maxWidth:200}}>
                <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                <Text>{item.units}</Text>
                </View>
               </View>
              <View style={{alignSelf:'center'}}>
                <TouchableOpacity 
                  style={{
                    backgroundColor:'#1A6DBB', paddingLeft:30, paddingRight:30,
                    borderRadius:25, paddingBottom:3, paddingTop:3
                    }}>
                  <Text style={{color:'white'}}>Info</Text>
                </TouchableOpacity>
              </View>
            </View>
            )
          })
        }
      </ScrollView>
    }
    </View>
  )
}
export default Inventory
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:15,
    paddingBottom:15,
    borderBottomColor:'silver',
    borderBottomWidth:1
  },
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
  },
  image:{
    height:50,
    width:50,
    margin:5
  },
  btn:{
    backgroundColor:'red'
  }
})
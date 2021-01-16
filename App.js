import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import SearchIcon from './src/components/SvgComponent';


const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
      .then((response) => response.json())
      .then((json) => setData(json.top))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  searchAnimeResult = async (text) => {
     setLoading(true);
     await setSearch(text);
     fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&order_by=title&sort=asc&limit=10`)
      .then((response) => response.json())
      .then((json) => setSearchResult(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  console.log('Search Result');
  console.log(typeof(searchResult));
  
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: 70,
      height: 70
    },
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fbf7f7',
      padding: 10,
      marginBottom: 5
    },
    text: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: 10,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
      
    },
    flatList: {
      width: '100%',
      paddingHorizontal: 20,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    searchWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInput: {
      height: 40,
      borderColor: 'gray', 
      borderWidth: 2, 
      width: '90%', 
      marginBottom: 10, 
      alignSelf: 'center', 
      padding: 10,
      paddingLeft: 35
    },
    searchIcon: {
      position: 'absolute',
      left: 30,
      top: 10
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
            <SearchIcon style={styles.searchIcon}></SearchIcon>
            <TextInput placeholder="Anime ara" value={search} onChangeText={text => searchAnimeResult(text)} style={styles.searchInput}></TextInput>
      </View>
      { search ? isLoading ? <ActivityIndicator/> : ( 
      <FlatList
        style={styles.flatList}
          data={searchResult}
          keyExtractor={item => item.mal_id.toString()}
          renderItem={({ item }) => (
             <View style={styles.view}>
              <Image source={{ uri: `${item.image_url}`}} style={styles.image}/>
              <Text style={styles.text}>{item.title}</Text>
             </View>
            
          )}
        /> ): 
        <FlatList
        style={styles.flatList}
          data={data}
          keyExtractor={item => item.mal_id.toString()}
          renderItem={({ item }) => (
             <View style={styles.view}>
              <Image source={{ uri: `${item.image_url}`}} style={styles.image}/>
              <Text style={styles.text}>{item.title}</Text>
             </View>
            
          )}
        />
        }
        
    </SafeAreaView>
  );
};

export default App;

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';

export default function GameScreen({ navigation }) {
  const [active_player, set_active_player] = useState('X');
  const numColumns = 12;
  const data = [
    { id: '1-1' },   { id: '1-2' },   { id: '1-3' },   { id: '1-4' },   { id: '1-5' },   { id: '1-6' },   { id: '1-7' },   { id: '1-8' },   { id: '1-9' },   { id: '1-10' },  { id: '1-11' },  { id: '1-12' },
    { id: '2-1' },   { id: '2-2' },   { id: '2-3' },   { id: '2-4' },   { id: '2-5' },   { id: '2-6' },   { id: '2-7' },   { id: '2-8' },   { id: '2-9' },   { id: '2-10' },  { id: '2-11' },  { id: '2-12' },
    { id: '3-1' },   { id: '3-2' },   { id: '3-3' },   { id: '3-4' },   { id: '3-5' },   { id: '3-6' },   { id: '3-7' },   { id: '3-8' },   { id: '3-9' },   { id: '3-10' },  { id: '3-11' },  { id: '3-12' },
    { id: '4-1' },   { id: '4-2' },   { id: '4-3' },   { id: '4-4' },   { id: '4-5' },   { id: '4-6' },   { id: '4-7' },   { id: '4-8' },   { id: '4-9' },   { id: '4-10' },  { id: '4-11' },  { id: '4-12' },
    { id: '5-1' },   { id: '5-2' },   { id: '5-3' },   { id: '5-4' },   { id: '5-5' },   { id: '5-6' },   { id: '5-7' },   { id: '5-8' },   { id: '5-9' },   { id: '5-10' },  { id: '5-11' },  { id: '5-12' },
    { id: '6-1' },   { id: '6-2' },   { id: '6-3' },   { id: '6-4' },   { id: '6-5' },   { id: '6-6' },   { id: '6-7' },   { id: '6-8' },   { id: '6-9' },   { id: '6-10' },  { id: '6-11' },  { id: '6-12' },
    { id: '7-1' },   { id: '7-2' },   { id: '7-3' },   { id: '7-4' },   { id: '7-5' },   { id: '7-6' },   { id: '7-7' },   { id: '7-8' },   { id: '7-9' },   { id: '7-10' },  { id: '7-11' },  { id: '7-12' },
    { id: '8-1' },   { id: '8-2' },   { id: '8-3' },   { id: '8-4' },   { id: '8-5' },   { id: '8-6' },   { id: '8-7' },   { id: '8-8' },   { id: '8-9' },   { id: '8-10' },  { id: '8-11' },  { id: '8-12' },
    { id: '9-1' },   { id: '9-2' },   { id: '9-3' },   { id: '9-4' },   { id: '9-5' },   { id: '9-6' },   { id: '9-7' },   { id: '9-8' },   { id: '9-9' },   { id: '9-10' },  { id: '9-11' },  { id: '9-12' },
    { id: '10-1' },  { id: '10-2' },  { id: '10-3' },  { id: '10-4' },  { id: '10-5' },  { id: '10-6' },  { id: '10-7' },  { id: '10-8' },  { id: '10-9' },  { id: '10-10' }, { id: '10-11' }, { id: '1-12' },
    { id: '11-1' },  { id: '11-2' },  { id: '11-3' },  { id: '11-4' },  { id: '11-5' },  { id: '11-6' },  { id: '11-7' },  { id: '11-8' },  { id: '11-9' },  { id: '11-10' }, { id: '11-11' }, { id: '1-12' },
    { id: '12-1' },  { id: '12-2' },  { id: '12-3' },  { id: '12-4' },  { id: '12-5' },  { id: '12-6' },  { id: '12-7' },  { id: '12-8' },  { id: '12-9' },  { id: '12-10' }, { id: '12-11' }, { id: '1-12' },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Menu"
        />
        <Text style={styles.scores}>Här står poängen</Text>
        <Text style={styles.playerTurn}>Player {active_player}'s turn</Text>
      </View>
      <View style={styles.body}>
        <Text>Här ska brädet vara</Text>

        <FlatList 
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={( {item} ) => (
            <Text style={styles.gridItem}></Text>
          )}  
        />

      </View>
      <Button title="Pop to root" onPress={() => navigation.popToTop()} />
      <Button title="Pop" onPress={() => navigation.pop()} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',

  },
  body: {
    backgroundColor: 'black',
  },
  playerTurn: {

  },
  gridItem: {
    padding: 30,
    backgroundColor: 'white',
    margin: 1,
  }
});
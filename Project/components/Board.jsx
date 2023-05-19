
import React, {useCallback} from 'react';
import { StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback} from 'react-native';
import BoardItem from '../components/BoardItem';
import MovableView from 'react-native-movable-view';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

export default function Board(input){

    const {numColumns, data, players, activePlayer, piecesToWin, setActivePlayer, setResetTime, colors} = input.props;
    const tileSize = (Dimensions.get('window').width * 0.8) /(numColumns);

    return (
        <ReactNativeZoomableView style = {{backgroundColor: 'black'}}>
            <MovableView  style = {[styles.board, {height:  (tileSize + 2) * numColumns, width: (tileSize + 2) * numColumns}]}>

                {/* FLATLIST DÄR DATAN ÄR EN MATRIS MED OBJEKT */}
                {/* Here, we're using the flatMap() method to flatten the two-dimensional data 
                    array into a one-dimensional array, which can be used as the data prop for the FlatList. 
                    We're also using the index parameter of the keyExtractor function instead of the id property, 
                    since we're using an array of objects instead of an array of arrays. - ChatGPT*/}
                <FlatList
               
                numColumns={numColumns}

               
                data={data.flatMap((row) => row)}
                renderItem={({item}) =>
                
                    <BoardItem
                    setResetTime = {setResetTime}
                    setActivePlayer = {setActivePlayer}
                    item={item}
                    tileSize = {tileSize}
                    data={data}
                    players = {players}
                    activePlayer = {activePlayer}
                    piecesToWin = {piecesToWin}
                    colors = {colors}
                    />
                    }
                />
            
            </MovableView>
       
        </ReactNativeZoomableView>

    );
}


const styles = StyleSheet.create({
    board: {
        backgroundColor: 'black',
      }, 
})
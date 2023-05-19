import React from "react";
import { StyleSheet, Text } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { undo, redo } from '../js/gameLogic';

/*
GameMenu:
a drop down menu located in the header and placed at the top left of the screen
*/
export default function GameMenu(props) {
    
    const { navigation, language, players, setActivePlayer, activePlayer, setResetTime } = props;

    const SYMBOL_SIZE = 20;

    return (

            <Menu>
                <MenuTrigger style={styles.menuButton}>
                    <Entypo name="menu" size={45} color="black" />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => navigation.popToTop()}
                    >
                        <Text>{language.GameMenu.toMain}</Text>
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => undo(setActivePlayer, activePlayer, players, setResetTime)}
                    >
                        <Text>{language.GameMenu.undo}</Text>
                        <EvilIcons name="undo" size={SYMBOL_SIZE} color="black" />
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => redo(setActivePlayer, activePlayer, players, setResetTime)}
                    >
                        <Text>{language.GameMenu.redo}</Text>
                        <EvilIcons name="redo" size={SYMBOL_SIZE} color="black" />
                    </MenuOption>
                </MenuOptions>
            </Menu>

    );
}

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    menuOptions: {
        padding: 10,
        backgroundColor: 'lightblue',
    },
    menuOption: {
        flexDirection: 'row',
    }

});
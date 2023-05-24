/** 
* File: GameMenu.jsx

* This file contains the JSX needed to create a drop down menu 
* containing options to go back to main menu and undo and redo move.

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

* Requires the following files:

* GameLogic.js

*/


import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { undo, redo } from '../js/gameLogic';
import { responsiveFontSize, responsiveHeight, responsiveWidth, useResponsiveFontSize } from "react-native-responsive-dimensions";
import { SoundContext } from '../components/SoundContext';

/*
GameMenu:
a drop down menu located in the header and placed at the top left of the screen
*/
export default function GameMenu({ navigation, language, players, setActivePlayer, activePlayer, setResetTime, tutMode, setTutMode, restartTut }) {
    const ICON_SIZE = useResponsiveFontSize(3);
    const MENU_SIZE = useResponsiveFontSize(6);

    // Getting the needed information from the sound context
    //
    const { soundOn, toggleSound } = useContext(SoundContext);

    // All elements presented to the user
    // 
    return (

        <Menu>
            <MenuTrigger style={styles.menuButton}>
                <Entypo name="menu" size={MENU_SIZE} color="black" />
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => navigation.popToTop()}
                >
                    <Text style={styles.menuText}>{language.GameMenu.toMain}</Text>
                    <Ionicons name="chevron-back" size={ICON_SIZE} color="black" />
                </MenuOption>
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => undo(setActivePlayer, activePlayer, players, setResetTime)}
                >
                    <Text style={styles.menuText}>{language.GameMenu.undo}</Text>
                    <EvilIcons name="undo" size={ICON_SIZE} color="black" />
                </MenuOption>
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => redo(setActivePlayer, activePlayer, players, setResetTime)}
                >
                    <Text style={styles.menuText}>{language.GameMenu.redo}</Text>
                    <EvilIcons name="redo" size={ICON_SIZE} color="black" />
                </MenuOption>
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => {
                        restartTut();
                        setTutMode(!tutMode);
                    }}
                >
                    <Text style={styles.menuText}>
                        {language.NewGameScreen.tutorialMode}:
                    </Text>
                    {tutMode ?
                        <Text style={styles.menuText}>{language.NewGameScreen.on}</Text> :
                        <Text style={styles.menuText}>{language.NewGameScreen.off}</Text>}

                </MenuOption>
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => { toggleSound(); }}
                >
                    <Text style={styles.menuText}>{language.GameMenu.sound}: </Text>
                    {/* The clickable sound icon, different icons depending on soundOn state */}
                    <TouchableOpacity>
                        {soundOn ? (
                            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
                        ) : (
                            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
                        )}
                    </TouchableOpacity>
                </MenuOption>
            </MenuOptions>
        </Menu>

    );
}

/**styles the menu*/

const styles = StyleSheet.create({
    menuButton: {
        alignSelf: 'baseline'
    },
    menuOptions: {
        padding: '3%',
        backgroundColor: '#F8FFFF',
        width: responsiveWidth(80),
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderRadius: 10,
    },
    menuOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuText: {
        fontSize: responsiveFontSize(3),
        fontFamily: 'Helvetica',
        color: '#262723',
    }
});


/* END of file GameMenu.jsx */
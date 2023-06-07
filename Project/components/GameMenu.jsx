/** 
* File: GameMenu.jsx

* This file contains the JSX needed to create a drop down menu 
* containing options to go back to main menu and undo and redo move.

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

* Requires the following files:

* GameLogic.js

*/

// Imports
//
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { undo, redo } from '../js/gameLogic';
import { responsiveFontSize, responsiveWidth, useResponsiveFontSize } from "react-native-responsive-dimensions";
import { SoundContext } from '../components/SoundContext';
import { resetBoardData } from "../js/gameLogic";

/*
GameMenu:
a drop down menu located in the header and placed at the top left of the screen
*/
export default function GameMenu({ navigation, language, players, setActivePlayer, activePlayer, setResetTime, tutMode, setTutMode, restartTut }) {
    const ICON_SIZE = useResponsiveFontSize(3);
    const MENU_SIZE = useResponsiveFontSize(6);

    // Getting the needed information from the sound context
    //
    const { soundOn, toggleSound, musicOn, soundEffectsOn, toggleMusic, toggleSoundEffects } = useContext(SoundContext);

    // Handles what happens when we click on back to main menu
    // 
    const backToMain = () => {
        resetBoardData();
        navigation.popToTop();
    };

    // All elements presented to the user
    // 
    return (

        <Menu>

            {/* The menu hamburger button*/}
            <MenuTrigger style={styles.menuButton}>
                <Entypo name="menu" size={MENU_SIZE} color="black" />
            </MenuTrigger>

            {/* START OF MENU OPTIONS */}
            <MenuOptions style={styles.menuOptions}>

                {/* Go back to main menu */}
                <MenuOption
                    style={styles.menuOption}
                    onSelect={backToMain}
                >
                    <Text style={styles.menuText}>{language.GameMenu.toMain}</Text>
                    <Ionicons name="chevron-back" size={ICON_SIZE} color="black" />
                </MenuOption>

                {/* Undo move*/}
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => undo(setActivePlayer, activePlayer, players, setResetTime)}
                >
                    <Text style={styles.menuText}>{language.GameMenu.undo}</Text>
                    <EvilIcons name="undo" size={ICON_SIZE} color="black" />
                </MenuOption>

                {/* Redo move*/}
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => redo(setActivePlayer, activePlayer, players, setResetTime)}
                >
                    <Text style={styles.menuText}>{language.GameMenu.redo}</Text>
                    <EvilIcons name="redo" size={ICON_SIZE} color="black" />
                </MenuOption>

                {/* Tutorial mode on/off, if this is clicked the tutorial will be restarted */}
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

                    {/* Shows on/off defending on if it's on/off */}
                    {tutMode ?
                        <Text style={styles.menuText}>{language.NewGameScreen.on}</Text> :
                        <Text style={styles.menuText}>{language.NewGameScreen.off}</Text>
                    }
                </MenuOption>

                {/* Turn on/off the sound */}
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
                <MenuOption
                    style={[styles.menuOption]}
                    onSelect={() => { toggleMusic(); }}
                >
                    <Text style={[styles.menuText, styles.soundText]}>{language.GameMenu.music}: </Text>

                    {/* The clickable sound icon, different icons depending on soundOn state */}
                    <TouchableOpacity>
                        {musicOn ? (
                            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
                        ) : (
                            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
                        )}
                    </TouchableOpacity>
                </MenuOption>
                <MenuOption
                    style={[styles.menuOption]}
                    onSelect={() => { toggleSoundEffects(); }}
                >
                    <Text style={[styles.menuText, styles.soundText]}>{language.GameMenu.soundEffects}: </Text>

                    {/* The clickable sound icon, different icons depending on soundOn state */}
                    <TouchableOpacity>
                        {soundEffectsOn ? (
                            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
                        ) : (
                            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
                        )}
                    </TouchableOpacity>
                </MenuOption>

            </MenuOptions>
            {/* END OF MENU OPTIONS */}
        </Menu>

    );
}

// Styles for game menu
//
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
    },
    soundText: {
        fontSize: responsiveFontSize(2),
        marginLeft: responsiveWidth(5),
    }
});


//************
// END of file GameMenu.jsx
//************
import React from 'react';
import {createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {Image}  from 'react-native'

import Feed from './pages/Feed';
import logo from './assets/instagram.png';

const Routes =  createAppContainer(
    createStackNavigator({
        Feed
    }, {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
        
            headerTitle: <Image source={logo}/>,
            headerStyle : {
                backgroundColor: '#F5F5F5'
            }
        },
    })
)

export default Routes
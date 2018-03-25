//gradlew assembleRelease
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Main from './src/app/Main';
import Login from './src/app/Login';
const RootStack  = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title : 'Login',
      headerTitleStyle :{textAlign:'center', alignSelf:'center',flex:1}
    }
  },
  Main: {
    screen: Main,
    navigationOptions: {
       title: "To Do List",
       headerTitleStyle :{textAlign:'center', alignSelf:'center',flex:1}
    }
  }
}, {
  initialRouteName: 'Login'
}
);

export default class App extends Component {

  render(){
    return <RootStack/>;
  }

}
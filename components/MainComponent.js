import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform } from 'react-native';
import Home from './HomeComponent';
import Dishdetail from './DishDetailComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './AboutUsComponent';
import Contact from './ContactUs'
//Stack will use menu component and dishdetail component
//and setup navigation between them
//supply configuration for the 2 navigations 
const Stack = createStackNavigator();
const Drawer = createStackNavigator();
//creating object for createDrawerNavigator
const Drawer_Creat = createDrawerNavigator();

//drawer based component
function MainNavigator() {
    return (
        <Drawer_Creat.Navigator>
            <Drawer_Creat.Screen name="Home" component={Home_Navigator} />

            <Drawer_Creat.Screen name="About Us" component={About_Navigator} />
            <Drawer_Creat.Screen name="Menu" component={MyStack} />
            <Drawer_Creat.Screen name="Contact Us" component={Contact_Navigator} />
        </Drawer_Creat.Navigator>
    )
}
function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="Menu"  //Stack Navigator starts with menu as the first screen when this component
            //is the stack
            headerMode="screen"
            screenOptions={{     //screen options will be applied to all screens in the stack navigator Component
                headerStyle: { backgroundColor: '#512DA8' },  //background color for stack
                headerTintColor: '#fff',   //used for any icons used in headerstyle
                headerTitleStyle: {
                    color: '#ffff'
                }
            }} >
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Dishdetail" component={Dishdetail} />
        </Stack.Navigator>);
}
//we created Home_Navigator because createStackNavigator proides the status bar, a way of specifying
//the navigation and title for the home
//if we dont use createStackNavigator we dont get access to that
function Home_Navigator() {
    return (
        <Drawer.Navigator
            headerMode="screen"
            screenOptions={{     //screen options will be applied to all screens in the stack navigator Component
                headerStyle: { backgroundColor: '#512DA8' },  //background color for stack
                headerTintColor: '#fff',   //used for any icons used in headerstyle
                headerTitleStyle: {
                    color: '#ffff'
                }
            }} >
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>)
}
//about navigator
function About_Navigator() {
    return (
        <Drawer.Navigator
            headerMode="screen"
            screenOptions={{     //screen options will be applied to all screens in the stack navigator Component
                headerStyle: { backgroundColor: '#512DA8' },  //background color for stack
                headerTintColor: '#fff',   //used for any icons used in headerstyle
                headerTitleStyle: {
                    color: '#ffff'
                }
            }} >
            <Drawer.Screen name="About Us" component={About} />
        </Drawer.Navigator>)
}
//contact Navigator
function Contact_Navigator() {
    return (
        <Drawer.Navigator
            headerMode="screen"
            screenOptions={{     //screen options will be applied to all screens in the stack navigator Component
                headerStyle: { backgroundColor: '#512DA8' },  //background color for stack
                headerTintColor: '#fff',   //used for any icons used in headerstyle
                headerTitleStyle: {
                    color: '#ffff'
                }
            }} >
            <Drawer.Screen name="Contact Us" component={Contact} />
        </Drawer.Navigator>)
}
class Main extends Component {

    render() {
        return (
            <View style={{
                paddingTop: 1,//Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,  //Platform.OS returns the platform running
                flex: 1
            }}>
                {/* <Menu dishes={this.state.dishes}
                    onPress={(dishid) => this.onDishSelect(dishid)}      //selecting a dish where all dishes 
                //are rendered
                /> */}

                {/* render the selected dish */}
                {/* <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                filter return the subarray meeting the criteria where dishid is same as selected dish */}

                {/* using stack function */}
                <MainNavigator />
            </View>
        )
    }
}

export default Main;
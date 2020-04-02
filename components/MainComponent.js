import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import Home from './HomeComponent';
import Dishdetail from './DishDetailComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context'
//Stack will use menu component and dishdetail component
//and setup navigation between them
//supply configuration for the 2 navigations 
const Stack = createStackNavigator();
const Drawer = createStackNavigator();
//creating object for createDrawerNavigator
const Drawer_Creat = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props}>

        <SafeAreaView style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            {/* forceinset means drawer will be displayed on top even covering the status */}
            <View style={styles.DrawerHeader}>
                {/* these two views should be displayed horiontally with the first view being displayed with flex 1
                and the second being displayed with flex 2 */}
                {/* we have set the header here which will show the logo and name of the restaurant */}
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawing} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
            {/* what we are doing here is we are defining View on the top and below that, we are laying out
            all the drawerItems that we already have. So the draweritems is what is automatically constructed
            by createDrawerNavigator */}
            {/* we used the above statement to pass on whatever props DrawerItem component has */}
        </SafeAreaView>
    </DrawerContentScrollView>
);
//drawer based component
function MainNavigator() {
    return (   //drawerContent renders a DrawerItemList component inside a ScrollView. for customization
        // we can use DrawerContentScrollView
        <Drawer_Creat.Navigator
            drawerStyle={{
                backgroundColor: '#D1C4E9'
            }}
            drawerContent={props => <CustomDrawerContentComponent{...props} />}>
            <Drawer_Creat.Screen name="Home" component={Home_Navigator}
                options={{
                    drawerIcon: ({ activeTintColor }) => (  //activetintcolor will specify how to render icon in the 
                        <Icon                              //drawer
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={activeTintColor}
                        />)
                }} />
            <Drawer_Creat.Screen name="About Us" component={About_Navigator}
                options={{
                    drawerIcon: ({ activeTintColor }) => (  //activetintcolor will specify how to render icon in the 
                        <Icon                              //drawer
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={activeTintColor}
                        />)
                }} />
            <Drawer_Creat.Screen name="Menu" component={MenuNavigator}
                options={{
                    drawerIcon: ({ activeTintColor }) => (  //activetintcolor will specify how to render icon in the 
                        <Icon                              //drawer
                            name='list'
                            type='font-awesome'
                            size={24}
                            color={activeTintColor}
                        />)
                }} />
            <Drawer_Creat.Screen name="Contact Us" component={Contact_Navigator}
                options={{
                    drawerIcon: ({ activeTintColor }) => (  //activetintcolor will specify how to render icon in the 
                        <Icon                              //drawer
                            name='address-card'
                            type='font-awesome'
                            size={22}
                            color={activeTintColor}
                        />)
                }} />
        </Drawer_Creat.Navigator>
    )
}
function MenuNavigator() {
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
            }}>
            <Stack.Screen name="Menu" component={Menu} options={(props) => ({  ///The options prop can be used to configure individual screens inside the navigator
                headerLeft: ({ navigation }) => (
                    <Icon
                        name='menu'
                        color='white'
                        size={24}
                        onPress={() => props.navigation.toggleDrawer()}  //open drawer if closed and viceversa
                    />
                ),
            })} />
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
            screenOptions={({ navigation, scene }) => ({     //screen options will be applied to all screens in the stack navigator Component
                headerStyle: { backgroundColor: '#512DA8' },  //background color for stack
                headerTintColor: '#fff',   //used for any icons used in headerstyle
                headerTitleStyle: {
                    color: '#ffff'
                }
            })}
        >
            <Drawer.Screen name="Home" component={Home}
                options={(props) => ({  ///The options prop can be used to configure individual screens inside the navigator
                    headerLeft: ({ navigation }) => (
                        <Icon
                            name='menu'
                            color='white'
                            size={24}
                            onPress={() => props.navigation.toggleDrawer()}  //open drawer if closed and viceversa
                        />
                    ),
                })}
            />
        </Drawer.Navigator >)
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
            }}>
            <Drawer.Screen name="About Us" component={About} options={(props) => ({  ///The options prop can be used to configure individual screens inside the navigator
                headerLeft: ({ navigation }) => (
                    <Icon
                        name='menu'
                        color='white'
                        size={24}
                        onPress={() => props.navigation.toggleDrawer()}  //open drawer if closed and viceversa
                    />
                ),
            })} />
        </Drawer.Navigator>)
}
//contact Navigator
function Contact_Navigator() {
    return (
        <Drawer.Navigator
            screenOptions={{     //screen options will be applied to all screens in the stack navigator Component
                headerStyle: { backgroundColor: '#512DA8' },  //background color for stack
                headerTintColor: '#fff',   //used for any icons used in headerstyle
                headerTitleStyle: {
                    color: '#ffff'
                }
            }}>
            <Drawer.Screen name="Contact Us" component={Contact} options={(props) => ({  ///The options prop can be used to configure individual screens inside the navigator
                headerLeft: ({ navigation }) => (
                    <Icon  //we have passed props in options prop and then extracted navigation prop from it
                        name='menu'
                        color='white'
                        size={24}
                        onPress={() => props.navigation.toggleDrawer()}  //open drawer if closed and viceversa
                    />
                ),
            })} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    DrawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawing: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default Main;
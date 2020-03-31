import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform } from 'react-native';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishDetailComponent';
import { createStackNavigator } from '@react-navigation/stack';

//Stack will use menu component and dishdetail component
//and setup navigation between them
//supply configuration for the 2 navigations 
const Stack = createStackNavigator();

class MyStack extends Component {
    render() {
        return (
            <Stack.Navigator
                initialRouteName="Menu"  //Stack Navigator starts with menu as the first screen when this component
                //is the stack
                headerMode="screen"
                screenOptions={{     //screen options will be applied to all screens in the stack navigator Component
                    headerStyle: { backgroundColor: '#512DA8' },  //background color for stack
                    headerTintColor: '#fff',   //used for any icons used in headerstyle

                }} >
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Dishdetail" component={Dishdetail} />
            </Stack.Navigator>

        );
    }

}
class Main extends Component {

    render() {
        return (
            <View style={
                {
                    paddingTop: 1,//Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,  //Platform.OS returns the platform running
                    flex: 1
                }
            }>
                {/* <Menu dishes={this.state.dishes}
                    onPress={(dishid) => this.onDishSelect(dishid)}      //selecting a dish where all dishes 
                //are rendered
                /> */}

                {/* render the selected dish */}
                {/* <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                filter return the subarray meeting the criteria where dishid is same as selected dish */}

                {/* using stack function */}
                <MyStack />
            </View>
        )
    }
}

export default Main;
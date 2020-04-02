import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comment'

//render details of the dish
//card to create a view
function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card                   //to render the dish
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
            >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                {/* we are doing this to mark favourites amongst the dishes
                //raised displays icon in the form of a round button */}
                <Icon
                    name={props.favourites ? 'heart' : 'heart-o'}  //display heart if dish is favourite
                    type='font-awesome'
                    color="#f50"
                    onPress={() => props.favourites ? console.log('Already favorite') : props.onPress()}
                />
            </Card>
        )
    }
    else {
        return (
            <View></View>
        )
    }
}
//render all the comments
function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating}</Text>
                <Text style={{ fontSize: 12 }}>{'--' + item.author + ',' + item.date}</Text>
            </View>
        )
    }
    return (
        <Card title="Comment">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}
//return RenderDish which takes props.dish as property 
//dishdetail will render a chosen dish
class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favourites: []  //contains all dishes marked as my favourite dish
        };
    }
    markFavourite(dishId) {
        this.setState({
            favourites: this.state.favourites.concat(dishId)
            //this will add this dishId to the favourites array
        })
    }
    render() {
        const { dishId } = this.props.route.params; //getting the dishId of the
        //selected dish when selecting a dish from the menu
        return (
            <ScrollView>
                {/* we are using [+dishId] to show only
        that dish whose dishId we have retrieved and + is used to convert the id from string to number  */}
                <RenderDish dish={this.state.dishes[+dishId]}
                    favourites={this.state.favourites.some(el => el === dishId)}  //return true if any dishId im
                    //the array has the same id as dishID
                    onPress={() => this.markFavourite(dishId)}
                />
                {/* only render comments whose dishId we have extracted from above statement */}
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}

export default Dishdetail;
import React, { Component, useState } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavourite } from '../redux/ActionCreater';
const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favourites: state.favourites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavourite: (dishId) => dispatch(postFavourite(dishId))
})


//render details of the dish
//card to create a view
function RenderDish(props) {
    const [showModal, toggleModal] = useState(false);
    const dish = props.dish;
    if (dish != null) {
        return (
            <Card                   //to render the dish
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                {/* we are doing this to mark favourites amongst the dishes
                //raised displays icon in the form of a round button */}
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 135
                }}>
                    <Icon
                        name={props.favourites ? 'heart' : 'heart-o'}  //display heart if dish is favourite
                        type='font-awesome'
                        color="#f50"
                        onPress={() => props.favourites ? console.log('Already favorite') : props.onPress()}
                    />
                    <View style={{
                        margin: 15
                    }}>

                    </View>
                    <Icon
                        name={'pencil'}
                        type='font-awesome'
                        color="#f50"
                        onPress={() => toggleModal(!showModal)}
                    />
                </View>
                <Modal
                    animationType={"slide"}//how do u want your modal to be shown
                    transparent={false} //do u want to make modal transparent
                    visible={showModal} //if showModal is true, it is visible and vice versa
                    onDismiss={toggleModal} //this will hide the modal
                    onRequestClose={toggleModal}>
                    {/* same as above */}
                    <Rating
                        type='star'
                        ratingCount={5} //ratingsize
                        imageSize={40} //size of each rating image
                        showRating  //Determines if to show the reviews above the rating
                        onFinishRating={() => { console.log("Rating done!") }}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                    />
                    <Input
                        placeholder='Comments'
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    />
                    <View style={styles.modalbuttons}>
                        <Button
                            color="#512DA8"
                            title="Submit"
                        />
                    </View>
                    <View style={styles.modalbuttons}>
                        <Button
                            color="#512DA8"
                            title="Close"
                            onPress={toggleModal}
                        />
                    </View>
                </Modal>
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
            favourites: []  //contains all dishes marked as my favourite dish
        };
    }
    markFavourite(dishId) {
        this.props.postFavourite(dishId);
    }
    render() {
        const { dishId } = this.props.route.params; //getting the dishId of the
        //selected dish when selecting a dish from the menu
        return (
            <ScrollView>
                {/* we are using [+dishId] to show only
        that dish whose dishId we have retrieved and + is used to convert the id from string to number  */}
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favourites={this.props.favourites.some(el => el === dishId)}  //return true if any dishId im
                    //the array has the same id as dishID
                    onPress={() => this.markFavourite(dishId)}
                />
                {/* only render comments whose dishId we have extracted from above statement */}
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    modalbuttons: {
        marginTop: 20
    }
})
export default connect(mapStatetoProps, mapDispatchToProps)(Dishdetail);
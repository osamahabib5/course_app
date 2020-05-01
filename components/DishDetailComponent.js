import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux'
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet, Alert } from 'react-native';
import { Card, Icon, Rating, Input, AirbnbRating } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavourite } from '../redux/ActionCreater';
import { postComments } from '../redux/ActionCreater';
const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favourites: state.favourites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavourite: (dishId) => dispatch(postFavourite(dishId)),
    postComments: (dishId, author, rating, comment, id) => dispatch(postComments(dishId, author, rating, comment, id))
    //postComments: (dishId, author, rating, comment) => Alert.alert(dishId)
})


//render details of the dish
//card to create a view
function RenderDish(props) {
    const dispatch = useDispatch();
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
                        fractions={1}
                        onFinishRating={(rating) => props.onChangerating(rating)}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={(author) => props.onChangeauthor(author)}
                    />
                    <Input
                        placeholder='Comments'
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        onChangeText={(comment) => props.onChangecomment(comment)}
                    />
                    <View style={styles.modalbuttons}>
                        <Button
                            color="#512DA8"
                            title="Submit"
                            onPress={() => { props.onChange(); toggleModal(!showModal); }}
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
            favourites: [],
            author: "",
            rating: "",
            comment: ""//contains all dishes marked as my favourite dish
        }
        this.onChangeauthor = this.onChangeauthor.bind(this),
            this.onChangerating = this.onChangerating.bind(this),
            this.onChangecomment = this.onChangecomment.bind(this)
    }
    onChangeauthor(name) {
        this.setState({
            author: name
        })
    }
    onChangerating(name) {
        this.setState({
            rating: name.toString()
        })
    }
    onChangecomment(name) {
        this.setState({
            comment: name
        })
    }
    markFavourite(dishId) {
        this.props.postFavourite(dishId);
    }
    handlesubmit(dishId, author, rating, comment, id) {
        this.props.postComments(dishId, author, rating, comment, id);
    }
    render() {
        const { dishId } = this.props.route.params; //getting the dishId of the
        //selected dish when selecting a dish from the menu
        const comment = this.state.comment;
        const rating = this.state.rating;
        const author = this.state.author;
        const comment_id = (Math.max.apply(Math, this.props.comments.comments.map((comment) => { return comment.id; }))) + 1;
        return (
            <ScrollView>
                {/* we are using [+dishId] to show only
        that dish whose dishId we have retrieved and + is used to convert the id from string to number  */}
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favourites={this.props.favourites.some(el => el === dishId)}  //return true if any dishId im
                    //the array has the same id as dishID
                    onPress={() => this.markFavourite(dishId)}
                    onChangeauthor={this.onChangeauthor}
                    onChangecomment={this.onChangecomment}
                    onChangerating={this.onChangerating}
                    onChange={() => this.handlesubmit(dishId, author, rating, comment, comment_id)}
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
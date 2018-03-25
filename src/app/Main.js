import React, { Component } from 'react';
import axios from 'axios';
import { Modal,TouchableOpacity,Button,StyleSheet } from 'react-native';
import { Container, Text, Content, List, Spinner,
         ListItem, Fab, Icon, View, Body,
         Form, Item, Input, CheckBox } from 'native-base';

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            modalVisible: false,
            loading: false,
            tasks: [],
            text: "",
            finishTask: false
        }
    }

    getData = () => {
        axios
            .get('http://rest.learncode.academy/api/bray/todos')
            .then((result)=>{
                this.setState({tasks: result.data})
            })
    }

    componentWillMount(){
        this.getData()
    }

    handleModalVisible = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    handleSubmit = () => {
        axios
        .post('http://rest.learncode.academy/api/bray/todos', {
            name: this.state.text,
            is_finish: this.state.finishTask
        })
        .then((response)=> {
            this.getData()
        });

        this.handleModalVisible();
    }

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    handleChecked = (id,check,name) => {
        this.setState({ loading: true})
        axios
        .put('http://rest.learncode.academy/api/bray/todos/'+id, {
            is_finish: check,
            name:name
        })
        .then((response)=> {
            this.getData()
            this.setState({ loading: false})
        });
    }

    render(){
        return (
            <Container>
                <Content>
                    <List>
                        { this.state.tasks.map((item,index)=> {
                            return (
                                <ListItem key={index}
                                onPress={() => this.handleChecked(item.id,!item.is_finish,item.name)}
                                onLongPress={() => this.handleEdit()}
                                >
                                    <CheckBox checked={item.is_finish?true : false} />
                                    <Body>
                                        <Text>{item.name}</Text>
                                    </Body>
                                </ListItem>
                            )
                         })
                        }
                    </List>
                </Content>
                <Fab onPress={this.handleModalVisible}>
                    <Icon name="md-add" />
                </Fab>
                <Modal
                transparent={true}
                animationType={'none'}
                visible={this.state.loading}
                onRequestClose={() => {console.log('close modal')}}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                        <Spinner />
                        </View>
                    </View>
                </Modal>
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setState({modalVisible: false})
                }}>
                <TouchableOpacity style={{flex:1}} onPress={() => {this.handleModalVisible(!this.state.modalVisible);}}>
                <Container style={{backgroundColor:'#00000090',alignContent:'center',justifyContent:"center"}} >
                    <View style={styles.modalAdd} >
                        <Form>
                            <Item>
                                <Input placeholder="Task" onChangeText={this.changeTextHandler} style={{alignItems:"center"}}  />
                            </Item>
                            <View>
                                <View style={styles.buttonContainer}>
                                    <Button block danger onPress={() => {
                                    this.handleSubmit();
                                    }} title="submit" />
                                    <Button block info onPress={() => {
                                    this.handleModalVisible(!this.state.modalVisible);
                                    }} title="cancel" />
                                </View>
                            </View>
                        </Form>
                    </View>
                </Container>
                </TouchableOpacity>


                </Modal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:"row",
        //justifyContent:"center"
        justifyContent:"space-around"
        },

    modalAdd: {
        backgroundColor: 'grey',
        borderRadius:60,
        borderWidth: 1,
        borderColor: "grey",
        elevation: 10,
        padding: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 5,
        marginLeft: 15,
        marginRight: 15,
        },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
        },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})
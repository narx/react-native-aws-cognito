import React, { Component } from 'react';
import { View, StatusBar, FlatList } from "react-native";
import { Container, Button, Header, Left, Right, Text, Content, Icon, Body, Title } from "native-base";

import { connect } from 'react-redux';

const datas = new Array(1000).fill({}).map((o, i) => {
    return {
        key: i,
        amount: Math.floor(Math.random() * 10000)
    }
})

class TransactionItem extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <View style={{flex: 1, flexDirection: "row", margin: 10}}>
            <View style={{width:50, height:50, backgroundColor: "#0f0"}}>
                <Text>{this.props.item.key}</Text>
            </View>
            <View style={{flex: 1, backgroundColor: "#00f"}}>
                <Text>{this.props.item.amount}</Text>
            </View>
            <View style={{width:50, height:50, backgroundColor: "#f00"}}>
                <Text>{this.props.item.key}</Text>
            </View>

        </View>
    )
}

class TransactionPage extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <Container>
            <Header style={{backgroundColor: "#ef534e"}}>
                <Left>
                    <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                    <Icon name="menu" style={{color: "#fff"}} />
                    </Button>
                </Left>
                <Body>
                    <Title>거래</Title>
                </Body>
                <Right />
            </Header>
            <View style={{backgroundColor: "#ef534e", height: 200, padding: 20, justifyContent: "center", alignItems: "center"}}>
                <View style={{backgroundColor: "#f5f5f5", width:150, height: 150, borderRadius: 75}}>
                </View>
            </View>
            <Content>
                <FlatList
                    data={datas}
                    renderItem={({item}) => <TransactionItem item={item}/>} 
                />
                
            </Content>
        </Container>
    )
}

let mapStateToProps = (state) => {
    return {
        name: state.persist.user.name
    }
}

TransactionPage = connect(mapStateToProps)(TransactionPage);

export default TransactionPage

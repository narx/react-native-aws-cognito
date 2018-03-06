import React, { Component } from 'react';
import { View, StatusBar } from "react-native";
import { Container, Button, Header, Left, Right, Text, Content, Icon, Body, Title } from "native-base";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <Container>
            <View style={{flex: 1, justifyContent: "center"}}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Text>Lets Go!</Text>
            </Button>
            </View>
        </Container>
    )
}

export default Home

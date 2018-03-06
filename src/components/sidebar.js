import React, { Component } from 'react';
import { Platform } from "react-native"
import { Container, Content, List, ListItem, Left, Text, Icon, Button } from "native-base";
import { Auth } from 'aws-amplify';

const datas = [
    {
        name: "TransactionPage",
        route: "TransactionPage",
        icon: "phone-portrait",
        bg: "#C5F442"
    },
    {
        name: "PayrollPage",
        route: "PayrollPage",
        icon: "phone-portrait",
        bg: "#C5F442"
    },
    {
        name: "Login",
        route: "Login",
        icon: "phone-portrait",
        bg: "#C5F442"
    },
];


class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          shadowOffsetWidth: 1,
          shadowRadius: 4,
          onLogout: false
        };
    }

    handleLogout = () => {
        this.setState({onLogout: true});

        Auth.signOut().then(()=>{
            this.props.navigation.navigate("Login");
        })
    }

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, top: -1, marginTop: 30}}>
                <List 
                    dataArray={datas}
                    renderRow={data => 
                        <ListItem
                            button
                            noBorder
                            onPress={() => this.props.navigation.navigate(data.route)}>
                            <Left>
                                <Icon
                                    active
                                    name={data.icon}
                                    style={{ color: "#777", fontSize: 26, width: 30 }}
                                />
                                <Text style={{
                                    fontWeight: Platform.OS === "ios" ? "500" : "400",
                                    fontSize: 16,
                                    marginLeft: 20
                                }}>
                                    {data.name}
                                </Text>
                            </Left>
                        </ListItem>}
                        />
                        <Button primary={true} onPress={this.handleLogout} style={{alignSelf: "center"}} disabled={this.state.onLogout}>
                                <Text>로그아웃</Text>
                        </Button>
                    </Content>
            </Container>
        )
    }
}

export default SideBar;
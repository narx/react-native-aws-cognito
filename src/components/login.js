import React, { Component } from 'react';
import { View, StatusBar } from "react-native";
import { Container, Button, Header, Left, Right, Text, Content, Icon, Body, Title, Form, Item, Input, Label } from "native-base";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { setUser } from "../actions/user";
import { Auth } from 'aws-amplify';
import {reset} from 'redux-form';


const OnSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        Auth.signIn(values.email, values.password).then((result) => {
            resolve(values.email)
        }).catch(error=> {
            alert(error);
            reject(error);
        });
        
    })
}

const validate = values => {
    const error = {};
    error.email = "";
    error.password = "";
    var ema = values.email;
    var pw = values.password;
    if (values.email === undefined) {
      ema = "";
    }
    if (values.password === undefined) {
      pw = "";
    }
    if (ema.length < 8 && ema !== "") {
      error.email = "too short";
    }
    if (!ema.includes("@") && ema !== "") {
      error.email = "@ not included";
    }
    if (pw.length > 12) {
      error.password = "max 11 characters";
    }
    if (pw.length < 5 && pw.length > 0) {
      error.password = "Weak";
    }

    if (ema != '' && error.email == '' & pw == '') {
        error.password = "Required";
    }
    
    return error;
  };

class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSignUp = () => {
        this.props.navigation.navigate("SignUp");
    }


    renderInput({
        input,
        label,
        type,
        meta: { touched, error, warning },
        inputProps
      }) {
        var hasError = false;
        if (error !== undefined) {
          hasError = true;
        }
        return (
          <Item error={hasError}>
            <Icon active name={input.name === "email" ? "person" : "unlock"} />
            <Input
              placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"} autoCapitalize='none'
              {...input}
            />
            {hasError
              ? <Item style={{ borderColor: "transparent" }}>
                  
                  <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
                </Item>
              : <Text />}
          </Item>
        );
      }

    render = () => (
        <Container>
            <View style={{flex: 1, justifyContent: "center", padding:30}}>
                <Field name="email" component={this.renderInput} />
                <Field name="password" component={this.renderInput} />

                <View style={{flexDirection: 'row', marginTop:30, justifyContent: "space-between"}}>

                <Button primary={true}
                onPress={this.props.handleSubmit(OnSubmit)} disabled={this.props.pristine || this.props.invalid || this.props.submitting}>
                <Text>로그인</Text>
                </Button>
                <Button secondary={true} onPress={this.handleSignUp}>
                    <Text>회원가입</Text>
                </Button>
                </View>
            </View>
        </Container>
    )
}

const LoginSwag = reduxForm(
    {
        form: "login",
        validate,
        onSubmitSuccess: (result, dispatch, props) => {
            dispatch(setUser(result));
            dispatch(reset('login'));
            props.navigation.navigate("TransactionPage")
        }
    }
)(Login);

export default LoginSwag
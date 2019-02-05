import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import { login, register } from '../auth.actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        // fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        // fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const TabSelector = ({ selected }) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected} />
        </View>
    );
};

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
        };
    }

    componentDidMount() {
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            this.props.navigation.navigate('Main');
        }
    }

    componentDidUpdate(prevProps) {
        const { isAuthenticated, token } = this.props;

        if (isAuthenticated && token) {
            console.log('isAuthenticated navegoo: ', isAuthenticated);
            this.props.navigation.navigate('Main');
        }
      }

    selectCategory = selectedCategory => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    validateEmail = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    login = () => {
        const { email, password } = this.state;
        const isEmailValid = this.validateEmail(email) || this.emailInput.shake();
        const isPasswordValid = password.length >= 3 || this.passwordInput.shake();

        this.setState({
            isLoading: true,
            isEmailValid,
            isPasswordValid,
        });
        if (isEmailValid && isPasswordValid) {
            this.props.login(email, password)
                .then(resp => {
                    console.log('resp: ', resp);
                    LayoutAnimation.easeInEaseOut();
                    this.setState({
                        isLoading: false,
                        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                        isPasswordValid: password.length >= 3 || this.passwordInput.shake(),
                    });
                });
        } else {
            this.setState({ isLoading: false });
        }
    }

    signUp = () => {
        const { email, password, passwordConfirmation } = this.state;
        const isEmailValid = this.validateEmail(email) || this.emailInput.shake();
        const isPasswordValid = password.length >= 3 || this.passwordInput.shake();
        const isConfirmationValid = password === passwordConfirmation || this.confirmationInput.shake();

        this.setState({ isLoading: true });
        if (isEmailValid && isPasswordValid && isConfirmationValid) {
            this.props.register(email, password)
                .then(resp => {
                    LayoutAnimation.easeInEaseOut();
                    this.setState({
                        isLoading: false,
                        isEmailValid,
                        isPasswordValid,
                        isConfirmationValid,
                    });
                })
                .catch(error => this.setState({ isLoading: false, error }));
        } else {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            email,
            password,
            passwordConfirmation,
        } = this.state;
        const { loginError } = this.props;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;

        return (
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View>
                        <KeyboardAvoidingView
                            contentContainerStyle={styles.loginContainer}
                            behavior="position"
                        >
                            <View style={styles.titleContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.titleText}>LIGUSTRO</Text>
                                </View>
                                <View style={{ marginTop: -10, marginLeft: 10 }}>
                                    <Text style={styles.titleText}>APPS</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    disabled={isLoading}
                                    clear
                                    type="clear"
                                    activeOpacity={0.7}
                                    onPress={() => this.selectCategory(0)}
                                    containerStyle={{ flex: 1, backgroundColor: 'transparent' }}
                                    titleStyle={[
                                        styles.categoryText,
                                        isLoginPage && styles.selectedCategoryText,
                                    ]}
                                    title="Login"
                                />
                                <Button
                                    disabled={isLoading}
                                    clear
                                    type="clear"
                                    activeOpacity={0.7}
                                    onPress={() => this.selectCategory(1)}
                                    containerStyle={{ flex: 1 }}
                                    titleStyle={[
                                        styles.categoryText,
                                        isSignUpPage && styles.selectedCategoryText,
                                    ]}
                                    title="Sign up"
                                />
                            </View>
                            <View style={styles.rowSelector}>
                                <TabSelector selected={isLoginPage} />
                                <TabSelector selected={isSignUpPage} />
                            </View>
                            <View style={styles.formContainer}>
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="envelope-o"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{ backgroundColor: 'transparent' }}
                                        />
                                    }
                                    value={email}
                                    keyboardAppearance="light"
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    inputStyle={{ marginLeft: 10 }}
                                    placeholder="Email"
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    ref={input => { this.emailInput = input; }}
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    onChangeText={input => this.setState({ email: input })}
                                    errorMessage={
                                        isEmailValid ? null : 'Please enter a valid email address'
                                    }
                                />
                                <Input
                                    leftIcon={
                                        <SimpleIcon
                                            name="lock"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{ backgroundColor: 'transparent' }}
                                        />
                                    }
                                    value={password}
                                    keyboardAppearance="light"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry
                                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                                    blurOnSubmit
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{ marginLeft: 10 }}
                                    placeholder="Password"
                                    ref={input => { this.passwordInput = input; }}
                                    onSubmitEditing={() =>
                                        isSignUpPage
                                            ? this.confirmationInput.focus()
                                            : this.login()
                                    }
                                    onChangeText={input => this.setState({ password: input })}
                                    errorMessage={
                                        isPasswordValid
                                            ? null
                                            : 'Please enter at least 8 characters'
                                    }
                                />
                                {isSignUpPage && (
                                    <Input
                                        icon={
                                            <SimpleIcon
                                                name="lock"
                                                color="rgba(0, 0, 0, 0.38)"
                                                size={25}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        }
                                        value={passwordConfirmation}
                                        secureTextEntry
                                        keyboardAppearance="light"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="default"
                                        returnKeyType="done"
                                        blurOnSubmit
                                        containerStyle={{
                                            marginTop: 16,
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                        }}
                                        inputStyle={{ marginLeft: 10 }}
                                        placeholder="Confirm password"
                                        ref={input => { this.confirmationInput = input; }}
                                        onSubmitEditing={this.signUp}
                                        onChangeText={input => this.setState({ passwordConfirmation: input })}
                                        errorMessage={
                                            isConfirmationValid
                                                ? null
                                                : 'Please enter the same password'
                                        }
                                    />
                                )}
                                {loginError
                                    ? <Text style={{ color: 'red', marginTop: 10 }}>
                                        {loginError}
                                    </Text> : null
                                }
                                <Button
                                    buttonStyle={styles.loginButton}
                                    containerStyle={{ marginTop: 32, flex: 0 }}
                                    activeOpacity={0.8}
                                    title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                                    onPress={isLoginPage ? this.login : this.signUp}
                                    titleStyle={styles.loginTextButton}
                                    loading={isLoading}
                                    disabled={isLoading}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <View style={styles.helpContainer}>
                            <Button
                                title="Need help ?"
                                titleStyle={{ color: 'white' }}
                                buttonStyle={{ backgroundColor: 'transparent' }}
                                underlayColor="transparent"
                                onPress={() => console.log('Account created')}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.accessToken,
    loginError: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email, password)),
    register: (email, password) => dispatch(register(email, password)),
});

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

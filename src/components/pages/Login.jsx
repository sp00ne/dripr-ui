import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loginFacebook} from '../../actions/users';
import nodeify from 'nodeify';

import FacebookLogin from 'react-facebook-login2';
import LoginForm from '../components/login/login';
import SignupForm from '../components/login/signup';
//import config from '../../../config';

@connect(null, (dispatch) => ({dispatch}))
export default class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }
    responseFacebook(data) {
        nodeify(this.props.dispatch(loginFacebook(data)), (err, result) => {
            if (result && result.type === 'LOGIN_SUCCESS') {
                window.location = "/";
            }
            // MANAGE ERRORS
        });

    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: 'login'
        };
    }

    /*
      This function is not active - no signing up is currently active
      should be inserted in lb-header div
     */
    signUpHeader() {
      return(
        <a href="#" className={this.state.selected === 'signup' && 'active'} id="signup-box-link" onClick={this.signupClicked}>Sign Up</a>
      );
    }
    // Place this in lb-header in case you want to have sign up as well as log in
    /*<a href="#" className={this.state.selected === 'login' && 'active'} id="login-box-link" onClick={this.loginClicked}>Login</a>*/
    render() {
        return (
            <div>
                <div className="login-box">
                    <div className="lb-header">
                        <h2>Login</h2>
                    </div>
                    {this.state.selected === 'login' && <LoginForm/>}
                    {this.state.selected === 'signup' && <SignupForm/>}
                </div>
            </div>
        );
    }

    loginClicked = e => {
        e.preventDefault();
        this.setState({selected: 'login'})
    }

    signupClicked = e => {
        e.preventDefault();
        this.setState({selected: 'signup'})
    }
}

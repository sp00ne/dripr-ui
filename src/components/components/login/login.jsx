import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {login} from '../../../actions/users';
import nodeify from 'nodeify';
import LaddaButton from 'react-ladda';

import '../../../assets/css/ladda.min.css';


@connect(state => {
  return {
    loading: state.app.loading
  };
}, (dispatch) => ({dispatch, updatePath}))
export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputEmail: '',
      inputPassword: ''
    };
  }

  render() {
    return (
      <form className="email-login">
        <div className="u-form-group">
          <input type="email" placeholder="Email" value={this.state.inputEmail}
          onChange={this.handleEmailChange}/>
        </div>
        <div className="u-form-group">
          <input type="password" placeholder="Password" value={this.state.inputPassword}
          onChange={this.handlePasswordChange}/>
        </div>
        <div className="u-form-group">
          <LaddaButton
            loading={this.props.loading}
            onClick={this.handleSubmit}>
            Log in
          </LaddaButton>
        </div>
      </form>

    );
  }

  handleEmailChange = e => {
    this.setState({
      inputEmail: e.target.value
    });
  }

  handlePasswordChange = e => {
    this.setState({
      inputPassword: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    nodeify(this.props.dispatch(login(this.state.inputEmail, this.state.inputPassword)), () => {
      window.location = "/";
    });
  }
}

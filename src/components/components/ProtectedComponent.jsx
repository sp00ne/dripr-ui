'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';

/**
 * A wrapper component that can be extended to add a security wall,
 * i.e that authentication is required
 *
 * Author: Mohsen Farzone
 */
 connect(state => {
     return {
       app: state.app
     };
 }, {updatePath})
class ProtectedComponent extends React.Component {

  debugger;

    static willTransitionTo(transition) {
        if (!this.state.app.loggedIn) {
            transition.redirect('login', {}, { 'nextPath': transition.path });
        }
    }

    constructor(props) {
        super(props);
    }
}

export default ProtectedComponent;

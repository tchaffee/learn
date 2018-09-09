/* global HOME_PATH */
import React, { PureComponent } from 'react';

export class SigninPage extends PureComponent {
  componentWillMount() {
    window.location = HOME_PATH + '/signin';
  }

  render() {
    return (<p>Redirecting to Signin page</p>);
  }

}

export default SigninPage;

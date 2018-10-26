import React, { Component } from 'react';

import { Header } from 'semantic-ui-react'

export default class AppHeader extends Component {

  render() {


    return (
      <Header as='h1' content='NoWorth Coin Wallet' style={{ marginTop: `3em` }} textAlign='center' />
    )
  }

} 
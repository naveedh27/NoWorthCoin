import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Layout from './Layout/Layout'
import Home from './Component/Home'


class App extends Component {
  render() {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }
}

export default App;

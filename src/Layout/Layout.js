import React from 'react'
import { Container } from 'semantic-ui-react'

import AppHeader from './Header'
import Footer from './Footer'


export default function Layout(props) {

    return (
        <Container>
            <AppHeader />
            {props.children}
            <Footer />
        </Container>
    );


}
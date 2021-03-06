import React, { Component } from 'react';
import web3 from '../Util/web3';
import instance from '../Util/web3Helper';
import { Grid, Header, Form, Segment, Button, Loader, Input, Card, Divider, Icon, Dimmer } from 'semantic-ui-react';
import '../style/style.css'


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: '----------------',
            isLoading: false,
            isLoadingMint: false,
            noOfTokens: 0,
            toAddress: '',
            tokensToSend: 0
        }
    }

    getCountAtIntreval = async() => {

        const noOfTokens = await instance.methods._wallet(this.state.address).call({
            from: this.state.address
        });
        this.setState({ noOfTokens });

    }

    getCoinCount = async () => {

        console.log('get coin called');
        try {
            this.setState({ isLoading: true });
            const acc = await web3.eth.getAccounts();
            this.setState({ address: acc[0] });
            const noOfTokens = await instance.methods._wallet(this.state.address).call({
                from: this.state.address
            });

            this.setState({ noOfTokens });

        } catch (e) {
            this.setState({ isLoading: false,isLoadingMint:false });
        }
        
        this.setState({ isLoading: false, isLoadingMint : false });
    }

    async componentWillMount() {
        this.getCoinCount();
    }

    sendCoin = async () => {


        if (Number(this.state.tokensToSend) == 0) {
            alert("Number Of Tokens must be atleast one");
            this.setState({
                tokensToSend: 1
            });
            return;
        }else if ( Number(this.state.tokensToSend) > Number(this.state.noOfTokens) ) {
            alert("You don't have Sufficient Coins");
            this.setState({
                tokensToSend: 1
            });
            return;
        } else if (this.state.toAddress === '') {
            alert("To Address Cannot be Empty");
            return;
        }

        this.setState({ isLoading: true });

        try {
            const getBalanceCount = await instance.methods.sendToken(this.state.toAddress, 
                                                    this.state.tokensToSend).send({
                from: this.state.address
            }).then((result) => {
                this.getCoinCount();
                this.setState({ isLoading: false });
            });
            if (getBalanceCount.status) {
                this.setState({
                    toAddress: '',
                    tokensToSend: 0
                });

            }else{
                alert("Error in Contract Call.");
            }

        } catch (e) {
            console.log('sendCoin Exception');
            this.setState({ isLoading: false });
        }
        this.setState({
            toAddress: '',
            tokensToSend: 0
        });
    }

    mintCoin = async () => {
        this.setState({ isLoadingMint: true });
        try {
            const minted = await instance.methods.mintToken().send({
                from: this.state.address,
                gas: 300000,
                value: 100000000000000
            }).then((result) => {
                this.getCoinCount();
                this.setState({ isLoadingMint: false });
                setInterval(this.getCountAtIntreval , 5000);
            })

        } catch (e) {
            console.log('Mint coin Catch')
            this.setState({ isLoadingMint: false });
        }

        //this.setState({ isLoadingMint: false });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if (name === 'tokensToSend') {
            if (value < 0) {
                alert('Tokens to Send must be more than zero');
                this.setState({
                    tokensToSend: 1
                });
                return;
            }
        }

        this.setState({
            [name]: value
        });
    }


    render() {

        const square = { width: 200, height: 200 };

        return (
            <React.Fragment>

                <Grid style={{ marginTop: `50px` }}>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size='large'>
                                Your Address : {this.state.address}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size='large'>
                                No. Of Coins Owned : {this.state.noOfTokens}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Segment style={{ marginTop: `30px` }}>

                    <Grid columns={2} stackable>
                        <Divider vertical >Or</Divider>

                        <Grid.Row >
                            <Grid.Column>
                                <Grid.Row centered>
                                    <Header textAlign='center'>
                                        Send Coins
                                 </Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Form>
                                        <Form.Input
                                            fluid
                                            label='To Address'
                                            name='toAddress'
                                            value={this.state.toAddress}
                                            onChange={this.handleInputChange}
                                            placeholder='Address' />
                                        <Form.Input
                                            width={8}
                                            type="number"
                                            name='tokensToSend'
                                            value={this.state.tokensToSend}
                                            onChange={this.handleInputChange}
                                            label='Number Of Coins'
                                            placeholder='Number of Coins' />
                                        <Button
                                            color='black'
                                            loading={this.state.isLoading}
                                            onClick={this.sendCoin}
                                            disabled={this.state.isLoadingMint}
                                            width={6}
                                            type='submit'>Send</Button>
                                    </Form>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column verticalAlign='middle'>
                                <Grid.Row>
                                    <Header textAlign='center' icon>
                                        <Icon name='ethereum' />
                                        Get 10 NoWorth Coins for 0.0001 Ether
                                </Header>
                                </Grid.Row>
                                <Grid.Row style={{ textAlign: `center` }}>
                                    <Button
                                        onClick={this.mintCoin}
                                        loading={this.state.isLoadingMint}
                                        disabled={this.state.isLoading}
                                        color='black'>Get Coins</Button>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
            </React.Fragment>
        );
    }

} 
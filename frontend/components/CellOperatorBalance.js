import React, {Component} from 'react';
import AuthBar from "./AuthBar";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PermPhoneMsg from '@material-ui/icons/PermPhoneMsg';
import Snackbar from '@material-ui/core/Snackbar';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask'
import Button from '@material-ui/core/Button';

import {getUserBalance, createOrUpdateUserBalance} from "../services/ApiService";


function TextMaskCustom(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholder="Enter a phone number"
            guide={true}
        />
    );
}


class CellOperatorBalance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBalances: [],
            snackBarOpen: false,
            snackBarMessage: '',
            selectedOperator: null,
            phone: '+7(  )  -  -   ',
            balance: 0
        }
    }

    componentWillMount() {
        getUserBalance(this.props.match.params.id)
            .then(result => {
                const {data, status} = result;
                if (status === 200) {
                    this.setState({
                        userBalances: data,
                        selectedOperator: this.props.match.params.id
                    });
                }
                else {
                    this.setState({
                        snackBarOpen: true,
                        snackBarMessage: 'Internal server error! Pls, try again!'
                    })
                }
            })
    }

    handleClose = e => {
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        })
    }

    submitBalance = e => {
        const {selectedOperator, balance, phone} = this.state
        if (!RegExp(/\+7\(\d{3}\)\d{2}-\d{2}-\d{3}$/).test(phone)) {
            this.setState({
                snackBarOpen: true,
                snackBarMessage: 'Bad phone signature! Pls, follow the mask!'
            });
            return;
        }
        if (isNaN(parseInt(balance)) || parseInt(balance) < 0) {
            this.setState({
                snackBarOpen: true,
                snackBarMessage: 'Bad balance signature!'
            });
            return;
        }
        createOrUpdateUserBalance(selectedOperator, phone, balance)
            .then(result => {
                const {data, status} = result;
                if (status === 200) {
                    this.setState({
                        userBalances: data
                    });
                    this.setState({
                        snackBarOpen: true,
                        snackBarMessage: 'Balance saved!'
                    })
                }
                else {
                    this.setState({
                        snackBarOpen: true,
                        snackBarMessage: 'Internal server error! Pls, try again!'
                    })
                }
            })
    }

    handleBack = e => {
        this.props.history.push('/cell-operators/');
    }

    render() {
        return (
            <div>
                <AuthBar history={this.props.history}/>
                <Grid container justify="center">
                    <Paper style={{padding: '20px'}}>
                        <Snackbar
                            open={this.state.snackBarOpen}
                            message={this.state.snackBarMessage}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                        />
                        <Typography variant="h5" component="h3" style={{marginTop: '15px', marginBottom: '15px'}}>
                            My balances
                        </Typography>
                        <Button variant="contained" color="primary" onClick={this.handleBack}>
                            Back to cell operators
                        </Button>
                        {this.state.userBalances.length ?
                            <List component="nav">
                                {this.state.userBalances.map(el => {
                                    return <ListItem id={el['id']}>
                                        <ListItemIcon>
                                            <PermPhoneMsg/>
                                        </ListItemIcon>
                                        <ListItemText primary={`${el['phone']} - ${el['balance']} RUB`}/>
                                    </ListItem>
                                })}
                            </List> :
                            ''
                        }
                        <Typography variant="h5" component="h3">
                            Add or update balance (pls, enter your phone number and balance)
                        </Typography>
                        <Grid container justify="center" spacing={16}>
                            <Grid item>
                                <Input
                                    value={this.state.phone}
                                    onChange={(e) => this.setState({[e.target.id]: e.target.value})}
                                    id="phone"
                                    inputComponent={TextMaskCustom}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="balance"
                                    value={this.state.balance}
                                    placeholde={'Enter the balance'}
                                    onChange={(e) => this.setState({[e.target.id]: e.target.value})}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={this.submitBalance}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

export default CellOperatorBalance
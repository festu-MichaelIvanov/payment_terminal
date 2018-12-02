import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import {isLoggedIn, login} from '../services/AuthService';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snackBarOpen: false,
            snackBarMessage: '',
            email: "",
            password: ""
        }
    }

    componentWillMount() {
        if (isLoggedIn()) {
            this.props.history.push('/cell-operators/');
        }
    }

    handleLogin = e => {
        const {email, password} = this.state;
        login(email, password)
            .then(result => {
                const {message, status} = result;
                if (status !== 200) {
                    this.setState({
                        snackBarOpen: true,
                        snackBarMessage: message
                    })
                } else {
                    this.props.history.push('/cell-operators/');
                }
            });
    }

    handleClose = e => {
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        })
    }

    render() {
        return (
            <Grid container justify="center">
                <Paper style={{padding: '20px'}}>
                    <Snackbar
                        open={this.state.snackBarOpen}
                        message={this.state.snackBarMessage}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    />
                    <Typography variant="h5" component="h3">
                        Login
                    </Typography>
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="email"
                                label="Email"
                                value={this.state.email}
                                onChange={(e) => this.setState({[e.target.id]: e.target.value})}
                                margin="normal"
                                variant="outlined"
                                type={'email'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="password"
                                label="Password"
                                value={this.state.password}
                                onChange={(e) => this.setState({[e.target.id]: e.target.value})}
                                margin="normal"
                                variant="outlined"
                                type={'password'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleLogin}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="h5" component="h3" style={{marginTop: '15px'}}>
                        Users: admin@core.com, test_user@core.com <br/>
                        Pass: qwerty1234
                    </Typography>
                </Paper>
            </Grid>
        );
    }
}

export default Login;
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {logout, isLoggedIn, getUserEmail} from '../services/AuthService'


class AuthBar extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!isLoggedIn()) {
            this.props.history.push('/login/');
        }
    }

    handleLogout = e => {
        logout().then(result => {
            this.props.history.push('/login/');
        })
    }

    render() {
        return (
            <div>
                {isLoggedIn() ?
                    <Grid container justify="center" spacing={16} style={{marginBottom: '15px'}}>
                        <Grid item>
                            <Typography variant="h5" component="h3">
                                {getUserEmail()}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.handleLogout}>
                                Logout
                            </Button>

                        </Grid>
                    </Grid>
                    :
                    <Grid container justify="center" style={{marginBottom: '15px'}}>
                        <Grid item>
                            <Typography variant="h5" component="h3">
                                <span>{'Anonymous'}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }
}

export default AuthBar
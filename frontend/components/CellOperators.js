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

import {getCellOperators} from "../services/ApiService";


class CellOperators extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cellOperators: [],
            snackBarOpen: false,
            snackBarMessage: '',
        }
    }

    componentWillMount() {
        getCellOperators()
            .then(result => {
                const {data, status} = result;
                if (status === 200) {
                    this.setState({
                        cellOperators: data
                    });
                }
                else {
                    this.setState({
                        snackBarOpen: true,
                        snackBarMessage: 'Internal server error! Pls, try again!'
                    })
                }
            });
    }

    handleClickCellOperator = e => {
        this.props.history.push(`/cell-operators/${e.currentTarget.id}/`);
    }

    handleClose = e => {
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        })
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
                        <Typography variant="h5" component="h3">
                            Cell operators
                        </Typography>
                        {this.state.cellOperators.length ?
                            <List component="nav">
                                {this.state.cellOperators.map(el => {
                                    return <ListItem id={el['id']}
                                                     button
                                                     onClick={this.handleClickCellOperator}>
                                        <ListItemIcon>
                                            <PermPhoneMsg/>
                                        </ListItemIcon>
                                        <ListItemText primary={el['name']}/>
                                    </ListItem>
                                })}
                            </List> :
                            ''
                        }
                    </Paper>
                </Grid>
            </div>
        );
    }
}

export default CellOperators
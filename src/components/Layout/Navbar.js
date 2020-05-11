import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Tooltip, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostScream from '../Scream/PostScream';

const styles = {
    container: {
        margin: 'auto'
    }, 
    icon: {
        color: 'white'
    }
}

export class Navbar extends Component {

    render() {
        const { authenticated, classes } = this.props;
        return (
            <AppBar position="fixed">
                {authenticated ? (
                    <Toolbar className={classes.container}>
                        <PostScream/>
                        <Tooltip title="Home">
                            <IconButton component={Link} to="/">
                                <HomeIcon color="action" className={classes.icon}/>
                            </IconButton>
                        </Tooltip> 
                        <Tooltip title="Notifications">
                            <IconButton>
                                <NotificationsIcon color="primary" className={classes.icon}/>
                            </IconButton>
                        </Tooltip>                        
                    </Toolbar>
                ) : (
                        <Toolbar className={classes.container}>
                            <Button color="inherit" component={Link} to='/login'>Login</Button>
                            <Button color="inherit" component={Link} to='/'>Home</Button>
                            <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                        </Toolbar >
                    )
                }
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar))

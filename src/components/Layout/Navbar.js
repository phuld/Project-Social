import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { getScreamsbyPage } from '../../redux/actions/dataActions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Tooltip, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PostScream from '../Scream/PostScream';
import Notifications from './Notifications';
import GroupIcon from '@material-ui/icons/Group';

const styles = {
    container: {
        margin: 'auto'
    },
    icon: {
        color: 'white'
    }
}

export class Navbar extends Component {

    handleClick = () => {
        this.props.onGetScreamsByPage("newest", 1);
        this.props.history.push("/newest")
    }

    render() {
        const { authenticated, classes } = this.props;
        return (
            <AppBar position="fixed">
                {authenticated ? (
                    <Toolbar className={classes.container}>
                        <PostScream />
                        <Tooltip title="My following post">
                            <IconButton component={Link} to="/following">
                                <GroupIcon className={classes.icon}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Home">
                            <IconButton onClick={this.handleClick}>
                                <HomeIcon color="action" className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                        <Notifications />
                    </Toolbar>
                ) : (
                        <Toolbar className={classes.container}>
                            <Button color="inherit" component={Link} to='/login'>Login</Button>
                            <Button color="inherit" onClick={this.handleClick}>Home</Button>
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
        onGetScreamsByPage: (type, number) => dispatch(getScreamsbyPage(type, number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Navbar)))

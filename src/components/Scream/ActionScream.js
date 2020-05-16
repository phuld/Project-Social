import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteScream from './DeleteScream';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import BlockIcon from '@material-ui/icons/Block';
import EditScream from './EditScream';

const styles = {
    expandIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 5
    },
    menuList: {
        position: 'absolute',
        top: 92,
        left: 408
    },
    menuItem: {
        display: 'flex'
    }
}

export class ActionScream extends Component {

    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null
        }
    }


    handleClick = (event) => {
        this.setState({
            anchorEl: event.target
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    render() {
        const {
            classes,
            screamId,
            scream,
            user: {
                authenticated,
                credentials: {
                    handle
                }
            },
            userHandle
        } = this.props;
        const { anchorEl } = this.state;
        const displayAction = authenticated ? userHandle === handle ? (
            <div>
                <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                    <EditScream screamId={screamId}/>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <NoEncryptionIcon /><span style={{ marginLeft: '5px' }}>Disabled Tweet</span>
                </MenuItem>
                <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                    <DeleteScream screamId={screamId} />
                </MenuItem>
            </div>
        ) : (
                <MenuItem onClick={this.handleClose}><BlockIcon /><span style={{ marginLeft: '5px' }}>Block Tweet</span></MenuItem>
            ) : (
                <MenuItem onClick={this.handleClose}><BlockIcon /><span style={{ marginLeft: '5px' }}>Block Tweet</span></MenuItem>
            )
        return (
            <div className={classes.actionScream}>
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.expandIcon}>
                    {authenticated && <ExpandMoreIcon color="primary" />}
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    className={classes.menuList}>
                    {displayAction}
                </Menu>
            </div>
        )
    }
}

ActionScream.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    userHandle: PropTypes.string.isRequired, 
    scream: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ActionScream))

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { markNotifications } from '../../redux/actions/userActions';

const styles = {

}

export class Notifications extends Component {
    render() {
        return (
            <Tooltip title="Notifications">
                <IconButton>
                    <NotificationsIcon color="primary" className={classes.icon} />
                </IconButton>
            </Tooltip>
        )
    }
}

Notifications.propTypes = {
    classes: PropTypes.object.isRequired,
    onMarkNotifications: PropTypes.func.isRequired, 
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        notifications: state.user.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMarkNotifications: () => dispatch(markNotifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Notifications))

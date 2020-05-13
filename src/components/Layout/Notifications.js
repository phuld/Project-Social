import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { markNotificationsRead } from '../../redux/actions/userActions';
import { Badge, Typography, Menu } from '@material-ui/core';
import dayjs from 'dayjs';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
    icon: {
        color: 'white'
    },
    popper: {
        posiiton: 'absolute'
    }
}

export class Notifications extends Component {
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

    onMenuOpened = () => {
        let unreadNotificationIds = this.props.notifications
            .filter(noti => !noti.read)
            .map(noti => noti.notificationId)
        this.props.onMarkNotifications(unreadNotificationIds);
    }

    render() {
        dayjs.extend(relativeTime);
        const { notifications, classes } = this.props;
        const { anchorEl } = this.state;

        let notificationIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(noti => noti.read === false).length > 0
                ? notificationIcon = (
                    <Badge badgeContent={notifications.filter(noti => noti.read === false).length} color='secondary'>
                        <NotificationsIcon className={classes.icon} />
                    </Badge>
                ) : notificationIcon = (<NotificationsIcon className={classes.icon}/>)
        } else {
            notificationIcon = (<NotificationsIcon className={classes.icon}/>)
        }
        const notificationMarkup = notifications && notifications.length > 0 ? (
            notifications.map(noti => {
                const type = noti.type === "like" ? "liked" : "commented on";
                const time = dayjs(noti.createdAt).fromNow();
                const iconColor = noti.read ? "primary" : "secondary"
                const icon = noti.like ? (
                    <FavoriteIcon color={iconColor} style={{ marginRight: '10px' }} />
                ) : (
                        <ChatIcon color={iconColor} style={{ marginRight: '10px' }} />
                    )

                return (
                    <MenuItem key={noti.notificationId} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            variant="body2"
                            color="primary"
                            component={Link}
                            to={`/user/${noti.recipient}/scream/${noti.screamId}`}
                        >
                            {noti.sender} {type} your scream {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
                <MenuItem onClick={this.handleClose}>You have no notifications yet</MenuItem>
            )
        return (
            <Fragment>
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    {notificationIcon}
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}>
                        {notificationMarkup}
                </Menu>
            </Fragment >
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
        onMarkNotifications: (notificationId) => dispatch(markNotificationsRead(notificationId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Notifications))

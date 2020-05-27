import React, { Component } from 'react'
import { Tooltip, IconButton, CircularProgress } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from '../../redux/actions/userActions';

const styles = {
    followIcon: {
        position: 'absolute',
        zIndex: 100,
        fontSize: '40px',
        backgroundColor: 'white',
        borderRadius: '50%',
    }
}

export class FollowUser extends Component {

    isFollowed = () => {
        if (this.props.follows && this.props.follows.find(follow => follow.owner === this.props.userHandle)) {
            return true;
        }
        return false;
    }

    followUser = () => {
        this.props.onFollowUser(this.props.userHandle);
    }

    unfollowUser = () => {
        this.props.onUnfollowUser(this.props.userHandle);
    }

    render() {
        const {
            classes,
            authenticated,
            credentials: { handle },
            userHandle,
            loading
        } = this.props;
        const followMarkup = (handle !== userHandle) ? authenticated ? this.isFollowed() === true ? (
            <Tooltip title="Unfollow" placement="top">
                <IconButton onClick={this.unfollowUser}>
                    {!loading && <CheckCircleIcon color="primary" className={classes.followIcon} />}
                    {loading && <CircularProgress color="secondary" className={classes.followIcon} />}
                </IconButton>
            </Tooltip>
        ) : (
                <Tooltip title="Follow" placement="top">
                    <IconButton onClick={this.followUser}>
                        {loading && <CircularProgress color="secondary" className={classes.followIcon} />}
                        {!loading && <AddCircleIcon color="primary" className={classes.followIcon} />}
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Follow" placement="top">
                    <IconButton component={Link} to="/login">
                        <AddCircleIcon color="primary" className={classes.followIcon} />
                    </IconButton>
                </Tooltip>
            ) : null;
        return followMarkup;
    }
}

FollowUser.propTypes = {
    classes: PropTypes.object.isRequired,
    follows: PropTypes.array.isRequired,
    userHandle: PropTypes.string.isRequired,
    credentials: PropTypes.object.isRequired,
    onFollowUser: PropTypes.func.isRequired,
    onUnfollowUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated,
        follows: state.user.follows,
        credentials: state.user.credentials,
        loading: state.user.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFollowUser: (userHandle) => dispatch(followUser(userHandle)),
        onUnfollowUser: (userHandle) => dispatch(unfollowUser(userHandle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FollowUser))

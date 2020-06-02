import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {

}

export class UserFollowing extends Component {
    render() {
        const { classes, follows } = this.props;
        const followingDisplay = follows.map(follow => (
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={follow.ownerImage}/>
                </ListItemAvatar>
                    <Link to={`/user/${follow.owner}?sortBy=newest&page=1`}>
                    <ListItemText primary={follow.owner} />
                </Link>
                
            </ListItem>
        ))
        return (
            <List>
                {followingDisplay}
            </List>
        )
    }
}

UserFollowing.propTypes = {
    classes: PropTypes.object.isRequired,
    follows: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        follows: state.user.follows
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserFollowing))

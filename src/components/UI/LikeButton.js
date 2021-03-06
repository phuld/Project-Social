import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Tooltip, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
    ...theme.spread
})

export class LikeButton extends Component {

    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) {
            return true;
        }
        return false;
    }

    likeScream = () => {
        this.props.onLikeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.onUnlikeScream(this.props.screamId)
    }

    render() {
        const {
            user: {
                authenticated
            }, 
            classes
        } = this.props;
        const likeButton = !authenticated ? (
            <Tooltip title="Like" className={classes.tooltip}>
                <IconButton>
                    <Link to="/login">
                        <FavoriteBorderIcon color="secondary" />
                    </Link>
                </IconButton>
            </Tooltip>
        ) :
            this.likedScream() === true ? (
                <Tooltip title="Unlike" className={classes.tooltip}>
                    <IconButton onClick={this.unlikeScream}>
                        <FavoriteIcon color="secondary" />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Like" className={classes.tooltip}>
                        <IconButton onClick={this.likeScream}>
                            <FavoriteBorderIcon color="secondary" />
                        </IconButton>
                    </Tooltip>
                )

        return likeButton;
    }
}

LikeButton.propTypes = {
    onLikeScream: PropTypes.func.isRequired,
    onUnlikeScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLikeScream: (screamId) => dispatch(likeScream(screamId)),
        onUnlikeScream: (screamId) => dispatch(unlikeScream(screamId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LikeButton))


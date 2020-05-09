import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Tooltip, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20, 
        position:'relative'
    },
    image: {
        minWidth: 150,
        backgroundSize: 'cover'
    }
}

export class Scream extends Component {

    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) {
            return true;
        }
        return false;
    }

    likeScream = () => {
        this.props.onLikeScream(this.props.scream.screamId)
    }

    unlikeScream = () => {
        this.props.onUnlikeScream(this.props.scream.screamId)
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: {
                body,
                userHandle,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                screamId
            },
            user: {
                authenticated, 
                credentials: {
                    handle
                }
            }
        } = this.props;
        const likeButton = !authenticated ? (
            <Tooltip title="Like">
                <IconButton>
                    <Link to="/login">
                        <FavoriteBorderIcon color="secondary" />
                    </Link>
                </IconButton>
            </Tooltip>
        ) : (
                this.likedScream() ? (
                    <Tooltip title="Unlike">
                        <IconButton onClick={this.unlikeScream}>
                            <FavoriteIcon color="secondary" />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Like">
                            <IconButton onClick={this.likeScream}>
                                <FavoriteBorderIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                    )
            )
        const deleteButton = authenticated ? (
            handle === this.props.scream.userHandle ? (
                <DeleteScream screamId={screamId} userHandle={handle}/>
            ) : null
        ) : null

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image} />
                <CardContent>
                    <Typography
                        variant='h5'
                        component={Link}
                        to={`/user/${userHandle}`}
                        color='primary'>{userHandle}</Typography>
                    <Typography variant='body2' color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1' >{body}</Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <Tooltip title="Comments">
                        <IconButton>
                            <ChatBubbleIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <span>{commentCount} comments</span>
                    {deleteButton}
                    <ScreamDialog screamId={screamId} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    onLikeScream: PropTypes.func.isRequired,
    onUnlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scream));

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
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ScreamDialog from './ScreamDialog';
import LikeButton from '../UI/LikeButton';
import ActionScream from './ActionScream';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 170,
        height: 170,
        backgroundSize: 'cover'
    },
    cardContent: {

    }, 
    actionButton: {
        position: 'absolute', 
        bottom: 0
    }, 
    date: {
        marginBottom: '10px'
    }, 
    body: {
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        WebkitLineClamp: 2,
        display: '-webkit-box', 
        WebkitBoxOrient: 'vertical'
    }
}

export class Scream extends Component {

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream,
            scream: {
                body,
                userHandle,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                screamId
            },
            user
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image} />
                <CardContent className={classes.cardContent}>
                    <Typography
                        variant='h6'
                        component={Link}
                        to={`/user/${userHandle}?sortBy=newest&page=1`}
                        color='primary'>{userHandle}</Typography>
                    <Typography variant='body2' color="textSecondary" className={classes.date}>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1' className={classes.body}>{body}</Typography>
                    {/* {likeButton} */}
                    <div className={classes.actionButton}>
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} likes</span>
                        <Tooltip title="Comments">
                            <IconButton>
                                <ChatBubbleIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <span>{commentCount} comments</span>
                        <ScreamDialog screamId={screamId} openDialog={this.props.openDialog} userHandle={userHandle} />
                    </div>
                    {/* {deleteButton} */}
                    {/* <Tooltip titile="Action Scream">
                        <IconButton>
                            <ExpandMoreIcon color="primary"/>
                        </IconButton>
                    </Tooltip> */}  
                    {user.authenticated && <ActionScream screamId={screamId} userHandle={userHandle} scream={scream}/>}
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scream));

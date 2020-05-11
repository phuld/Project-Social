import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { getOneScream, clearErrors } from '../../redux/actions/dataActions';
import { Tooltip, IconButton, Dialog, DialogContent, TextField, CircularProgress, Grid, Typography } from '@material-ui/core';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from '../UI/LikeButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentScream from './CommentScream';
import CommentForm from './CommentForm';

const styles = {
    profileImage: {
        maxWidth: '200px',
        height: '200px',
        borderRadius: '50%',
        marginRight: '20px'
    },
    closeButton: {
        position: 'absolute',
        right: '0',
        top: '0'
    },
    closeIcon: {
        color: "black"
    },
    dialog: {
        position: 'relative',
        minWidth: '500px',
        padding: '50px'
    },
    progress: {
        margin: '20px'
    },
    content: {
        padding: '12px 24px'
    },
    progressBlock: {
        textAlign: 'center'
    }
}

export class ScreamDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false, 
            oldPath: '', 
            newPath: ''
        }
    }

    
    componentDidMount() {
        if(this.props.openDialog) {
            this.handleOpen()
        }
    }
    

    handleOpen = () => {
        let oldPath= window.location.pathname;
        const {screamId, userHandle} = this.props;
        const newPath = `/user/${userHandle}/scream/${screamId}`;

        if(oldPath === newPath) oldPath=`/user/${userHandle}`;
        window.history.pushState(null, null, newPath);
        
        this.setState({
            open: true, 
            oldPath, 
            newPath
        })
        this.props.onGetOneScream(this.props.screamId)
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({
            open: false
        })
        this.props.onClearErrors();
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: {
                likeCount,
                body,
                commentCount,
                createdAt,
                userHandle,
                userImage,
                screamId,
                comments
            },
            ui: {
                loading
            }
        } = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.progressBlock}>
                <CircularProgress size={100} color="primary" className={classes.progress} />
            </div>
        ) : (
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <img src={userImage} alt="Profile Image" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={1}>

                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            to={`/user/${userHandle}`}
                            variant="h5"
                            color="primary">
                            @{userHandle}
                        </Typography>
                        <br />
                        <Typography
                            variant="body2"
                            color="textSecondary">
                            {dayjs(createdAt).format('DD/MM/YYYY')}
                        </Typography>
                        <br />
                        <Typography
                            variant="body1">
                            {body}
                        </Typography>
                        <br />
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} likes</span>
                        <Tooltip title="Comments">
                            <IconButton>
                                <ChatBubbleIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <span>{commentCount} comments</span>
                    </Grid>
                    <hr />
                    <CommentForm screamId={screamId}/>
                    <CommentScream comments={comments} />
                </Grid>
            )
        return (
            <Fragment>
                <Tooltip title="Expand Scream">
                    <IconButton onClick={this.handleOpen}>
                        <UnfoldMoreIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    className={classes.dialog}
                    fullWidth>
                    <Tooltip title="Close">
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon color="secondary" className={classes.closeIcon} />
                        </IconButton>
                    </Tooltip>
                    <DialogContent className={classes.content}>
                        {dialogMarkup}

                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    screamId: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired, 
    onGetOneScream: PropTypes.func.isRequired, 
    onClearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        scream: state.data.scream,
        ui: state.ui,
        data: state.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOneScream: (screamId) => dispatch(getOneScream(screamId)), 
        onClearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScreamDialog))

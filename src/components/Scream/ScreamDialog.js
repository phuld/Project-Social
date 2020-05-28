import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { getOneScream, clearScream } from '../../redux/actions/dataActions';
import { clearError } from '../../redux/actions/uiActions';
import { Tooltip, IconButton, Dialog, DialogContent, CircularProgress, Grid, Typography } from '@material-ui/core';
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
        width: 170,
        height: 170,
        borderRadius: '50%'
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
    },
    body: {
        fontSize: '1.3rem'
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
        if (this.props.openDialog) {
            this.handleOpen()
        }
    }


    handleOpen = () => {
        let oldPath = window.location.pathname;
        console.log(oldPath);
        const { screamId, userHandle } = this.props;
        let newPath = `/user/${userHandle}/scream/${screamId}`;
        if(oldPath === '/following' ) {
            newPath = `/following/user/${userHandle}/scream/${screamId}`;
        }
        if (oldPath === newPath) oldPath = `/user/${userHandle}`;
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
        this.props.onClearScream();
    }

    render() {
        dayjs.extend(relativeTime);
        console.log(this.state.open);
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
        const dialogMarkup = loading === true ? (
            <div className={classes.progressBlock}>
                <CircularProgress size={100} color="primary" className={classes.progress} />
            </div>
        ) : (
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <img src={userImage} alt="" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={8}>
                        <Typography
                            component={Link}
                            to={`/user/${userHandle}`}
                            variant="h6"
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
                            variant="body1" className={classes.body}>
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
                    <CommentForm screamId={screamId} />
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
    onClearErrors: PropTypes.func.isRequired,
    onClearScream: PropTypes.func.isRequired
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
        onClearErrors: () => dispatch(clearError()),
        onClearScream: () => dispatch(clearScream())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScreamDialog))

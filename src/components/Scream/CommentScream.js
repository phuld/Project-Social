import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const styles = {
    commentImage: {
        width: '100%', 
        borderRadius: '50%'
    }, 
    line: {
        width: '100%',
        border: '1px solid gray',
        borderRadius: '5px',
        borderBottomColor: 'white'    
    }
}

export class CommentScream extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map(comment => {
                    const { userHandle, userImage, body, createdAt } = comment;
                    return (
                        <Fragment>
                            <Grid item sm={12}>
                                <Grid container spacing={2}>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={10}> 
                                        <div className={classes.commentData}>
                                            <Typography 
                                                variant="h6"
                                                color="primary"
                                                component={Link}
                                                to={`/user/${userHandle}`}>
                                                {userHandle}
                                            </Typography>
                                            <br/>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary">
                                                {dayjs(createdAt).format("DD/MM/YYYY")}
                                            </Typography>
                                            <br/>
                                            <Typography
                                                variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr className={classes.line}/>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

CommentScream.propTypes = {
    classes: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentScream))

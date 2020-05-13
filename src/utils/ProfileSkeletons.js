import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import noImg from '../assets/images/no-img.png';

const styles = {
    profile: {
        textAlign: 'center', 
        padding: 20
    }, 
    profileImage: {
        width: '150px', 
        height: '150px', 
        borderRadius: '50%',
        marginBottom: '15px'
    }, 
    halfLine: {
        width: '50%', 
        height: 10, 
        backgroundColor: '#a9a9a96b',
        marginBottom: '10px', 
        margin: 'auto'
    }, 
    fullLine: {
        width: '90%', 
        height: 15, 
        backgroundColor: '#a9a9a96b',
        marginBottom: '10px', 
        margin: 'auto'
    }
}

const ProfileSkeletons = props => {
    const { classes } = props;
    return (
        <Paper>
            <div className={classes.profile}>
                <div>
                    <img src={noImg} alt="Profile" className={classes.profileImage}/>
                </div>
                <div className={classes.content}>
                    <div className={classes.halfLine}></div>
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeletons.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeletons);
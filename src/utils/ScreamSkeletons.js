import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import noImg from '../assets/images/no-img.png';

const styles = {
    card: {
        marginBottom: 20,
        display: 'flex'
    },
    cardMedia: {
        width: '150px',
        height: '150px'
    },
    cardContent: {
        padding: 0
    },
    userHandle: {
        width: '200px',
        height: '30px',
        backgroundColor: '#a9a9a96b',
        display: 'block',
        marginBottom: 10
    },
    date: {
        width: '100px',
        height: '10px',
        backgroundColor: '#a9a9a96b',
        marginBottom: '15px'
    },
    body: {
        width: '300px',
        height: '15px',
        backgroundColor: '#a9a9a96b',
        marginBottom: '10px'
    }
}

const ScreamSkeletons = (props) => {
    const { classes } = props;
    const content = Array.from({ length: 5 }).map((item, index) => {
        return (
            <Card key={index} className={classes.card}>
                <CardMedia className={classes.cardMedia} image={noImg}>
                </CardMedia>
                <CardContent classesName={classes.cardContent}>
                    <div className={classes.userHandle}></div>
                    <div className={classes.date}></div>
                    <div className={classes.body}></div>
                    <div className={classes.body}></div>
                </CardContent>
            </Card>
        )
    })
    return (
        <Fragment>
            {content}
        </Fragment>
    )

}

ScreamSkeletons.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkeletons);
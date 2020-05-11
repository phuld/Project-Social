import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import {Paper, Tooltip, Typography } from '@material-ui/core'
import {Link} from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import dayjs from 'dayjs';

const styles = {
    profile: {
        textAlign: 'center',
        width: '100%',
        padding: 20,
        boxSizing: 'border-box'
    },
    profileImage: {
        width: '50%',
        borderRadius: '50%'
    },
    blockCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    blockAround: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    text: {
        padding: '20px 0'
    },
    blockImage: {
        position: 'relative'
    },
    iconEdit: {
        position: "absolute",
        top: 0,
        right: "15%",
        padding: 0
    },
    left: {
        float: 'left'
    },
    right: {
        float: 'right'
    }
}

export class StaticProfile extends Component {
    render() {
        const {
            classes,
            user: {
                handle,
                bio,
                imageUrl,
                createdAt,
                location,
                website
            }
        } = this.props;
        return (
            <Paper>
                <div className={classes.profile}>
                    <div className={classes.blockImage}>
                        <img src={imageUrl} alt="Profile Image" className={classes.profileImage} />
                        <input
                            type="file"
                            id="imageInput"
                            hidden={true}
                            onChange={this.handleImageChanged} />
                    </div>
                    <Typography color="primary" component={Link} to={`/user/${handle}`} variant="h5">@{handle}</Typography>
                    <br />
                    {bio && <Typography variant="body1">{bio}</Typography>}
                    {location && (
                        <div className={classes.blockCenter}>
                            <LocationOnIcon color="primary" /><span>{location}</span>
                            <br />
                        </div>
                    )}
                    {website && (
                        <div className={classes.blockCenter}>
                            <LinkIcon color="primary" />
                            <span><a href={website} target="_blank">{''}{website}</a> </span>
                        </div>
                    )}
                    <div className={classes.blockCenter}>
                        <DateRangeIcon color="primary" />
                        <span>{' '} Joined in {dayjs(createdAt).format('DD/MM/YYYY')}</span>
                    </div>
                </div>
            </Paper>
        )
    }
}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile); 

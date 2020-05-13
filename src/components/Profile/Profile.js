import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { Paper, Typography, Button, IconButton, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import dayjs from 'dayjs';
import EditIcon from '@material-ui/icons/Edit';
import { changeImage, logoutUser } from '../../redux/actions/userActions';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import EditUser from './EditUser';
import ProfileSkeletons from '../../utils/ProfileSkeletons';
const styles = {
    profile: {
        textAlign: 'center',
        width: '100%',
        padding: 20,
        boxSizing: 'border-box',
        lineHeight: '1.5'
    },
    profileImage: {
        width: '170px',
        height: '170px',
        borderRadius: '50%'
    },
    blockCenter: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        textAlign: 'initial',
        marginBottom: '10px',
        display: 'flex'
    },
    blockIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    blockAround: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    bio: {
        margin: '20px 0'
    },
    icon: {
        marginRight: '5px'
    }
}

class Profile extends Component {

    handleImageChanged = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.onChangeImage(formData)
    }

    handleEditImage = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    logoutHandler = () => {
        this.props.onLogout();
    }

    render() {
        const {
            classes,
            user: {
                credentials: { imageUrl, createdAt, handle, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;
        let profile = !loading ? (authenticated ? (
            <Paper>
                <div className={classes.profile}>
                    <div className={classes.blockImage}>
                        <img src={imageUrl} alt="" className={classes.profileImage} />
                        <input
                            type="file"
                            id="imageInput"
                            hidden={true}
                            onChange={this.handleImageChanged} />
                        <Tooltip title="Edit Avatar">
                            <IconButton onClick={this.handleEditImage} className={classes.iconEdit}>
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Typography color="primary" component={Link} to={`/user/${handle}`} variant="h5">@{handle}</Typography>
                    <br />
                    {bio && <Typography variant="body1" className={classes.bio}>{bio}</Typography>}
                    {location && (
                        <div className={classes.blockCenter}>
                            <LocationOnIcon color="primary" className={classes.icon} /><span>{location}</span>
                            <br />
                        </div>
                    )}
                    {website && (
                        <div className={classes.blockCenter}>
                            <LinkIcon color="primary" className={classes.icon} />
                            <span><a href={website} target="_blank" rel="noopener noreferrer">{''}{website}</a> </span>
                        </div>
                    )}
                    <div className={classes.blockCenter}>
                        <DateRangeIcon color="primary" className={classes.icon} />
                        <span>{' '} Joined in {dayjs(createdAt).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className={classes.blockAround}>
                        <Tooltip title="Logout">
                            <IconButton onClick={this.logoutHandler}>
                                <KeyboardReturnIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <EditUser />
                    </div>
                </div>
            </Paper>
        ) : (
                <Paper className={classes.profile}>
                    <Typography variant="body2" className={classes.text}>No profile found, please login again</Typography>
                    <div className={classes.blockIcon}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
                </Paper>
            )) : (
                <ProfileSkeletons />
            )
        return profile;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    onChangeImage: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeImage: (formData) => dispatch(changeImage(formData)),
        onLogout: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile)) 

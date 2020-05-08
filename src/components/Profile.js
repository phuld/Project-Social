import React, { Component, Fragment } from 'react'
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
import { changeImage, logoutUser } from '../redux/actions/userActions';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import EditUser from './EditUser';
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
                credentials: { email, imageUrl, createdAt, handle, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;
        let profile = !loading ? (authenticated ? (
            <Paper>
                <div className={classes.profile}>
                    <div className={classes.blockImage}>
                        <img src={imageUrl} alt="Profile Image" className={classes.profileImage} />
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
                    <div className={classes.blockAround}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
                </Paper>
            )) : (<p>Loadng ...</p >)
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

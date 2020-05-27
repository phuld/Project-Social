import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Paper, Typography, Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { getOtherUser } from '../../redux/actions/otherUserReducers';
import { withRouter } from 'react-router-dom';
import ProfileSkeletons from '../../utils/ProfileSkeletons';
import FollowUser from './FollowUser';

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
        borderRadius: '50%',
        margin: 'auto'
    },
    blockCenter: {
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

export class StaticProfile extends Component {

    componentDidMount() {
        // console.log(this.props.match.params.userHandle);
        this.props.onGetOtherUser(this.props.match.params.userHandle)
    }

    followUser = () => {
        alert('tada');
    }

    render() {
        const {
            classes,
            data: {
                imageUrl,
                createdAt,
                bio,
                website,
                location,
                handle
            },
            loading
        } = this.props;
        let otherUserMarkup = !loading ? (
            <Paper>
                <div className={classes.profile}>
                    <div className={classes.blockImage}>
                        {/* <img src={imageUrl} alt="" className={cclasses.profileImage} /> */}
                        <FollowUser userHandle={handle}/>
                        <Avatar alt="avatar" src={imageUrl} className={classes.profileImage} />
                        <input
                            type="file"
                            id="imageInput"
                            hidden={true}
                            onChange={this.handleImageChanged} />
                    </div>
                    <Typography color="primary" component={Link} to={`/user/${handle}`} variant="h5">@{handle}</Typography>
                    <br />
                    {bio && <Typography variant="body1" className={classes.bio}>{bio}</Typography>}
                    {location && (
                        <div className={classes.blockCenter}>
                            <LocationOnIcon color="primary" /><span>{location}</span>
                            <br />
                        </div>
                    )}
                    {website && (
                        <div className={classes.blockCenter}>
                            <LinkIcon color="primary" />
                            <span><a href={website} target="_blank" rel="noopener noreferrer">{''}{website}</a> </span>
                        </div>
                    )}
                    <div className={classes.blockCenter}>
                        <DateRangeIcon color="primary" />
                        <span>{' '} Joined in {dayjs(createdAt).format('DD/MM/YYYY')}</span>
                    </div>
                </div>
            </Paper>
        ) : <ProfileSkeletons />

        return otherUserMarkup;

    }
}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    otherUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        data: state.otherUser.data,
        loading: state.otherUser.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOtherUser: (userHandle) => dispatch(getOtherUser(userHandle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(StaticProfile))); 

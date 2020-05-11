import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

import { Tooltip, IconButton, Dialog, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const styles = {
    dialog: {
        padding: '20px 50px'
    }
}

export class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bio: '',
            website: '',
            location: '',
            open: false
        }
    }


    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailToState(credentials)
    }

    mapUserDetailToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
            website: credentials.website ? credentials.website : ''
        })
    }

    editUserHandler = () => {
        this.setState({
            open: true
        })
        this.mapUserDetailToState(this.props.credentials)
    }

    closedHandler = () => {
        this.setState({
            open: false
        })
    }

    changedHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website
        }
        this.props.onEditUserDetail(userDetails);
        this.closedHandler();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit User" placement="bottom">
                    <IconButton onClick={this.editUserHandler} edge="end">
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.closedHandler}
                    fullWidth
                    maxWidth="sm"
                    className={classes.dialog}>
                    <DialogTitle>Edit your information</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                id="bio"
                                type="text"
                                label="Bio"
                                value={this.state.bio}
                                className={classes.textField}
                                onChange={this.changedHandler}
                                fullWidth
                                rows="3"
                            />
                            <TextField
                                name="location"
                                id="location"
                                type="text"
                                label="Location"
                                value={this.state.location}
                                className={classes.textField}
                                onChange={this.changedHandler}
                                fullWidth
                                rows="3"
                            />
                            <TextField
                                name="website"
                                id="website"
                                type="text"
                                label="Website"
                                value={this.state.website}
                                className={classes.textField}
                                onChange={this.changedHandler}
                                fullWidth
                                rows="3"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closedHandler} variant="contained" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.submitHandler} variant="contained" color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditUser.propTypes = {
    classes: PropTypes.object.isRequired,
    onEditUserDetail: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        credentials: state.user.credentials
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditUserDetail: (userDetail) => dispatch(editUserDetails(userDetail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditUser));  

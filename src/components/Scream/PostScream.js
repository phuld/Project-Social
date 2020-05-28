import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { postScream, getScreamsbyPage } from '../../redux/actions/dataActions';
import { clearError } from '../../redux/actions/uiActions';
import { Tooltip, IconButton, Dialog, DialogContent, TextField, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = {
    icon: {
        color: 'white'
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
        position: 'relative'
    },
    submitButton: {
        margin: '30px 0 15px 0',
        position: 'relative'
    },
    loading: {
        position: 'absolute'
    }
}

export class PostScream extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            body: '',
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ui.errors) {
            return {
                errors: nextProps.ui.errors
            }
        }
        if (nextProps.ui.errors !== prevState.errors) {
            return {
                errors: nextProps.ui.errors
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data.screams !== this.props.data.screams) {
            this.setState({
                body: ''
            });
            this.handleClose();
        }
    }

    handleOpen = () => {
        this.setState({
            open: true,
            errors: {},
            body: ''
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
            errors: {}
        })
        this.props.onClearErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newScream = {
            body: this.state.body
        }
        this.props.onPostScream(newScream);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { errors } = this.state;
        const { classes, ui: { loading } } = this.props;
        return (
            <Fragment>
                <Tooltip title="Add a new tweet">
                    <IconButton onClick={this.handleOpen}>
                        <AddIcon color="secondary" className={classes.icon} />
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
                    <DialogTitle>
                        Post a new scream
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below
                        </DialogContentText>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                id="body"
                                name="body"
                                type="text"
                                label="Body"
                                placeholder="Scream here"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                fullWidth
                                value={this.state.body}
                                onChange={this.handleChange} /><br />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                className={classes.submitButton}>
                                Submit
                                    {loading && (<CircularProgress color="secondary" className={classes.loading} />)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onPostScream: PropTypes.func.isRequired,
    onClearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        ui: state.ui,
        data: state.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostScream: (newScream) => dispatch(postScream(newScream)),
        onClearErrors: () => dispatch(clearError()),
        onGetScreamsbyPage: (numberPage) => dispatch(getScreamsbyPage(numberPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostScream))

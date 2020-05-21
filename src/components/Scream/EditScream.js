import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip, IconButton, Dialog, DialogContent, TextField, Button, CircularProgress } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { clearError } from '../../redux/actions/uiActions';
import { editScream, getOneScream, clearScream } from '../../redux/actions/dataActions';

const styles = {
    button: {
        display: 'flex'
    },
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
    },
    dialogContent: {
        textAlign: 'center'
    }, 
    progress: {
        margin: '20px'
    }
}

export class EditScream extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            errors: {},
            body: ''
        }
    }


    componentDidMount() {
        // this.setState({
        //     body: this.props.scream.body
        // })
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
        if(nextProps.scream.body) {
            return {
                body: nextProps.scream.body
            }
        }
        // console.log(this.props.scream, nextProps.scream);
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps.scream)
        // console.log(this.props.scream)
        if(prevProps.scream !== this.props.scream) {
            this.setState({
                body: this.props.scream.body
            })
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.props.onGetOneScream(this.props.screamId);
    }

    handleClose = () => {
        this.setState({
            open: false,
            errors: {}
        })
        this.props.onClearErrors();
        this.props.onClearScream();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const updateScream = {
            body: this.state.body
        }
        this.props.onEditScream(this.props.scream.screamId, updateScream);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { classes, ui: { loading } } = this.props;
        const { open, errors } = this.state;
        const screamMarkup = loading ? (
            <CircularProgress size={100} color="primary" className={classes.progress}/>
        ) : (
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
                            </Button>
                </form >
            )
        return (
            <Fragment>
                <div className={classes.button} onClick={this.handleOpen}><EditIcon /><span style={{ marginLeft: '5px' }}>Edit Tweet</span></div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    className={classes.dialog}
                    fullWidth>
                    <Tooltip title="Close">
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon color="secondary" className={classes.closeIcon} />
                        </IconButton>
                    </Tooltip>
                    <DialogTitle>
                        Edit scream
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        {screamMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

EditScream.propTypes = {
    classes: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired, 
    screamId: PropTypes.string.isRequired, 
    onClearErrors: PropTypes.func.isRequired, 
    onEditScream: PropTypes.func.isRequired, 
    onGetOneScream: PropTypes.func.isRequired, 
    onClearScream: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        ui: state.ui,
        scream: state.data.scream
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearErrors: () => dispatch(clearError()),
        onEditScream: (screamId, screamData) => dispatch(editScream(screamId, screamData)),
        onGetOneScream: (screamId) => dispatch(getOneScream(screamId)), 
        onClearScream: () => dispatch(clearScream())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditScream))

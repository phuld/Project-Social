import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Dialog, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteScream } from '../../redux/actions/dataActions';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0
    }, 
    delete: {
        display: 'flex'
    }
}

export class DeleteScream extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    deleteScream = () => {
        this.props.onDeleteScream(this.props.screamId);
        this.closeHandler();
    }

    openHandler = () => {
        this.setState({
            open: true
        })
    }

    closeHandler = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div onClick={this.openHandler} className={classes.delete}>
                    <DeleteIcon color="inherit" /><span style={{ marginLeft: '5px' }}>Delete Tweet</span>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.closeHandler}>
                    <DialogTitle>Are you sure you want to delete this Scream ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.closeHandler} color="primary" variant="contained">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="primary" variant="contained">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteScream: (screamId) => dispatch(deleteScream(screamId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteScream))

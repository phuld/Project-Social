import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { clearMessage } from '../../redux/actions/dataActions';

const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
)

export class Message extends Component {

    handleClose = () => {
        this.props.onClearMessage();
    }

    render() {
        const { message } = this.props;
        const messageMarkup = message ? (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={true}
                autoHideDuration={4000}
                onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        ) : null;
        return messageMarkup;
    }
}

Message.propTypes = {
    onClearMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        message: state.ui.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearMessage: () => dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
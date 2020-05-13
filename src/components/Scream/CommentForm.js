import React, { Component } from 'react'
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@material-ui/core';
import { submitComment } from '../../redux/actions/dataActions';

const styles = {
    form: {
        textAlign: 'center', 
        padding: '20px 0'
    }, 
    button: {
        margin: '10px'
    }
}

export class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            body: '',
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.ui.errors !== prevState.errors) {
            return {
                errors: nextProps.ui.errors
            }
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, this.props);
        console.log(prevState.body, this.state.body);
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmitComment(this.props.screamId, { body: this.state.body })
    }

    render() {
        const {
            classes,
            authenticated
        } = this.props;
        const {  errors } = this.state;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} className={classes.form}>
                <form onSubmit={this.handleSubmit} >
                    <TextField
                        id="body"
                        name="body"
                        value={this.state.body}
                        onChange={this.handleChange}
                        label="Comment here"
                        error={errors.body ? true : false}
                        helperText={errors.body} 
                        className={classes.textField}
                        fullWidth/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}>Submit</Button>
                </form>
            </Grid>
        ) : null
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    screamId: PropTypes.string.isRequired,
    onSubmitComment: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        ui: state.ui,
        authenticated: state.user.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitComment: (screamId, commentData) => dispatch(submitComment(screamId, commentData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentForm))

import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { signupUser, clearErrors } from '../redux/actions/userActions';

import PropTypes from 'prop-types';
import IconImage from '../assets/images/logo.jpeg';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.spread
})

class signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    
    componentDidMount() {
        this.props.onClearErrors();
    }
    

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.onSignup(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, ui: {loading, errors} } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={IconImage} alt="Logo" className={classes.image} />
                    <Typography variant="h5" className={classes.title}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit} method="POST">
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth
                            error={errors.email ? true : false}
                            helperText={errors.email} />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                            error={errors.password ? true : false}
                            helperText={errors.password} />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField}
                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth
                            error={errors.confirmPassword ? true : false}
                            helperText={errors.confirmPassword} />
                        <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
                            value={this.state.handle} onChange={this.handleChange} fullWidth
                            error={errors.handle ? true : false}
                            helperText={errors.handle} />
                        {errors.general && <Typography variant="body2" className={classes.errorLogin}>{errors.general}</Typography>}
                        <Button type="submit" variant="contained" color="primary" className={classes.button}
                            disabled={loading}>
                            Signup
                            {loading && <CircularProgress color="secondary" className={classes.progress} />}
                        </Button><br />
                        <small>Have an account ? Login <strong><Link to="/login">here</Link></strong></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired, 
    user: PropTypes.object.isRequired, 
    ui: PropTypes.object.isRequired, 
    onSignup: PropTypes.func.isRequired, 
    onClearErrors: PropTypes.func.isRequired
}

const mapStateToprops = state => {
    return {
        user: state.user, 
        ui: state.ui
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (userData, history) => dispatch(signupUser(userData, history)), 
        onClearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(withStyles(styles)(signup)); 
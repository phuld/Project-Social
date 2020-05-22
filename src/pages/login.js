import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { clearError } from '../redux/actions/uiActions';
import { changeType } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import IconImage from '../assets/images/logo.jpeg';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';


const styles = (theme) => ({
    ...theme.spread
})

class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }


    componentDidMount() {
        this.props.onClearErrors()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.user.authenticated === true) {
    //         this.props.history.push('/newest')
    //     }
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
        this.props.onChangeType('newest');
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, ui: { loading, errors } } = this.props;
        return (
            <Grid container className={classes.form} spacing={3}>
                <Grid item sm />
                <Grid item sm>
                    <img src={IconImage} alt="Logo" className={classes.image} />
                    <Typography variant="h5" className={classes.title}>Login</Typography>
                    <Typography variant="body2" className={classes.title}>Get started with our service</Typography>
                    <form noValidate onSubmit={this.handleSubmit} method="POST">
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth
                            error={errors.email ? true : false}
                            helperText={errors.email} />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                            error={errors.password ? true : false}
                            helperText={errors.password} />
                        {errors.general && <Typography variant="body2" className={classes.errorLogin}>{errors.general}</Typography>}
                        <Button type="submit" variant="contained" color="primary" className={classes.button}
                            disabled={loading}>
                            Login
                            {loading && <CircularProgress color="secondary" className={classes.progress} />}
                        </Button><br />
                        <small>Don't have an account ? Sign up <strong><Link to="/signup">here</Link></strong></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    onClearErrors: PropTypes.func.isRequired,
    onChangeType: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user,
        ui: state.ui
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (userData, history) => dispatch(loginUser(userData, history)),
        onClearErrors: () => dispatch(clearError()),
        onChangeType: (type) => dispatch(changeType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(login)); 
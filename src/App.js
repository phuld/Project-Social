import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import themeFile from './utils/theme';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authCheckState } from './redux/actions/userActions';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Layout/Navbar';
import AuthRoute from './utils/AuthRoute';
import user from './pages/user';

const theme = createMuiTheme(themeFile)

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheckState();
    }
    render() {
        const { user: { authenticated } } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar />
                    <div className='container'>
                        <Switch>
                            <Route exact path="/" component={home} />
                            <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
                            <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
                            <Route exact path="/user/:userHandle" component={user}/>
                            <Route exact path="/user/:userHandle/scream/:screamId" component={user}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(authCheckState())
    }
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    onAuthCheckState: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

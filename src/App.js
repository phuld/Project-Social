import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import Message from './components/UI/Message';

const theme = createMuiTheme(themeFile)

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheckState();
    }
    render() {
        const { user: { authenticated }, type } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar />
                    <Message/>
                    <div className='container'>
                        <Switch>
                            <Route exact path="/newest" component={home} />
                            <Route exact path="/most-comments" component={home} />
                            <Route exact path="/most-likes" component={home} />
                            <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
                            <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
                            <Route exact path="/user/:userHandle" component={user}/>
                            <Route exact path="/user/:userHandle/scream/:screamId" component={user}/>
                            <Route exact path="/" render={() => <Redirect to="/newest"/>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    onAuthCheckState: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user, 
        type: state.data.type
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

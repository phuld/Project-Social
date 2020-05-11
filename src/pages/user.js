import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getScreamsByUser } from '../redux/actions/dataActions';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import StaticProfile from '../components/Profile/StaticProfile';
import Scream from '../components/Scream/Scream';

export class user extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: {}, 
            screamIdParam: null
        }
    }


    componentDidMount() {
        const userHandle = this.props.match.params.userHandle;
        const screamId = this.props.match.params.screamId;
        if(screamId) {
            this.setState({
                screamIdParam: screamId
            })
        }

        this.props.onGetScreamByUser(userHandle);
        axios.get(`/user/${userHandle}`)
            .then(response => {
                this.setState({
                    profile: response.data.user
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { screams, loading } = this.props.data;
        const {screamIdParam} = this.state;
        const screamMarkup = loading ? (
            <p>Loading data ...</p>
        ): screams.length === 0 ? (
            <p>No scream from this user</p>
        ) :  !screamIdParam ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ): (
            screams.map(scream => {
                if(scream.screamId !== screamIdParam) {
                    return <Scream key={scream.screamId} scream={scream}/>
                }else {
                    return <Scream key={scream.screamId} scream={scream} openDialog/>
                }
            })
        )
        return (
            <Grid container spacing={2}>
                <Grid item sm={8}>
                    {screamMarkup}
                </Grid>
                <Grid item sm={4}>
                    <StaticProfile user={this.state.profile}/>
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data: PropTypes.object.isRequired,
    onGetScreamByUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreamByUser: (userHandle) => dispatch(getScreamsByUser(userHandle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(user)

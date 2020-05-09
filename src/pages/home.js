import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

export class home extends Component {

    componentDidMount() {
        this.props.onGetScreams();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.screams.length !== this.props.screams.length) {
            this.props.onGetScreams();
        }
    }


    render() {
        const {screams, loading} = this.props;
        const displayScream = !loading ?
            (screams.map(scream => (
                <Scream scream={scream} key={scream.screamId} />
            ))) : <p>Loading</p>;
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {displayScream}
                    </Grid>
                    <Grid item xs={4}>
                        <Profile />
                        {/* <p>Profile</p> */}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

home.propTypes = {
    onGetScreams: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams, 
        loading: state.data.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreams: () => dispatch(getScreams())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home)

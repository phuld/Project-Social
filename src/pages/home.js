import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream/Scream';
import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import ScreamSkeletons from '../utils/ScreamSkeletons';

export class home extends Component {

    componentDidMount() {
        this.props.onGetScreams();
    }

    render() {
        const {screams, loading} = this.props;
        const displayScream = !loading ?
            (screams.map(scream => (
                <Scream scream={scream} key={scream.screamId} />
            ))) : <ScreamSkeletons/>;
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

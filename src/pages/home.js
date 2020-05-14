import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream/Scream';
import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import ScreamSkeletons from '../utils/ScreamSkeletons';
import Paginations from '../components/Paginations/Paginations';

export class home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            postPerPage: 10
        }
    }


    componentDidMount() {
        this.props.onGetScreams();

    }

    changePagination = (number) => {
        this.setState({
            currentPage: number
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        const { screams, loading } = this.props;
        const { currentPage, postPerPage } = this.state;

        //Get Current Screams
        const indexOfLastScream = currentPage * postPerPage;
        const indexOfFirstScream = indexOfLastScream - postPerPage;
        const currentScreams = screams.slice(indexOfFirstScream, indexOfLastScream)
        const displayScream = !loading ?
            (currentScreams.map(scream => (
                <Scream scream={scream} key={scream.screamId} />
            ))) : <ScreamSkeletons />;
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {displayScream}
                        <Paginations postPerPage={postPerPage} changePagination={this.changePagination} />
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
    onGetScreams: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams,
        loading: state.data.loading,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreams: () => dispatch(getScreams())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home)

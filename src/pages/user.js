import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getScreamsByUser, getNumberScreamsByUser } from '../redux/actions/dataActions';
import { Grid } from '@material-ui/core';
import StaticProfile from '../components/Profile/StaticProfile';
import Scream from '../components/Scream/Scream';
import ScreamSkeletons from '../utils/ScreamSkeletons';
import Paginations from '../components/Paginations/Paginations';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {

}

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
        const queryString = new URLSearchParams(this.props.location.search);
        let currentType = 'newest';
        let currentPage = 1;
        console.log(this.props.location.search);
        for (let key of queryString.entries()) {
            if (key[0] === "sortBy") {
                currentType = key[1];
            }
            if (key[0] === "page") {
                currentPage = +key[1]
            }
        }
        this.props.onGetScreamByUser(userHandle, currentType, currentPage);
        this.props.onGetNumberScreamsByUser(userHandle);
        if (screamId) {
            this.setState({
                screamIdParam: screamId
            })
        }
    }

    changePagination = (number) => {
        window.scrollTo({
            top: 0
        })
        const pathname = this.props.location.pathname;

        const queryString = new URLSearchParams(this.props.location.search);
        const userHandle = this.props.match.params.userHandle;
        let currentType = "";
        let currentPage = number;
        for(let key of queryString.entries()) {
            if(key[0] === "sortBy") {
                currentType = key[1]
            }
        }
        this.props.history.push({
            pathname: pathname, 
            search: `?sortBy=${currentType}&page=${number}`
        })
        this.props.onGetScreamByUser(userHandle, currentType, currentPage);
    }

    render() {
        const {
            loading,
            screams,
            currentPage
        } = this.props;
        const { screamIdParam } = this.state;
        const screamMarkup = loading ? (
            <ScreamSkeletons />
        ) : screams.length === 0 ? (
            <p>No scream from this user</p>
        ) : !screamIdParam ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : (
                        screams.map(scream => {
                            if (scream.screamId !== screamIdParam) {
                                return <Scream key={scream.screamId} scream={scream} />
                            } else {
                                return <Scream key={scream.screamId} scream={scream} openDialog />
                            }
                        })
                    )
        const displayPagination = !loading ? (
            <Paginations postPerPage={10} defaultPage={currentPage} changePagination={this.changePagination} />
        ) : null;
        return (
            <Grid container spacing={2}>
                <Grid item sm={8}>
                    {screamMarkup}
                    {displayPagination}
                </Grid>
                <Grid item sm={4}>
                    <StaticProfile />
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    onGetScreamByUser: PropTypes.func.isRequired,
    screams: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams,
        loading: state.data.loading,
        currentPage: state.data.currentPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreamByUser: (userHandle, currentType, currentPage) => dispatch(getScreamsByUser(userHandle, currentType, currentPage)),
        onGetNumberScreamsByUser: (userHandle) => dispatch(getNumberScreamsByUser(userHandle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(user))

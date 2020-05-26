import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream/Scream';
import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { getScreamsbyPage, getNumberScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import ScreamSkeletons from '../utils/ScreamSkeletons';
import Paginations from '../components/Paginations/Paginations';
import Sort from '../components/UI/Sort';
import { changeType } from '../redux/actions/dataActions';

export class home extends Component {


    componentDidMount() {
        const queryString = new URLSearchParams(this.props.location.search);
        let pageNumber = 1;
        for (let key of queryString) {
            if (key[0] === "page") {
                pageNumber = +key[1];
                // this.setState({
                //     currentPage: +key[1]
                // })
            }
        }
        this.props.onGetScreamsbyPages(this.props.type, pageNumber);
        this.props.onGetNumberScreams();
    }

    componentDidUpdate(prevProps, prevState) {
        const currentUrl = (this.props.match.path).split('/')[1];
        const queryString = new URLSearchParams(this.props.location.search);
        let pageNumber = 1;
        for (let key of queryString) {
            if (key[0] === "page") {
                pageNumber = +key[1];
            }
        }
        if ((prevProps.type !== this.props.type) || (prevProps.user.credentials.imageUrl && prevProps.user.credentials.imageUrl !== this.props.user.credentials.imageUrl)) {
            this.props.onChangeType(currentUrl);
            this.props.onGetScreamsbyPages(this.props.type, 1);
            this.setState({
                currentPage: pageNumber
            })
        }
    }

    changePagination = (number) => {
        window.scrollTo({
            top: 0
        });
        const pathname = this.props.match.path;
        this.props.history.push({
            pathname: pathname,
            search: `?page=${number}`
        })
        this.props.onGetScreamsbyPages(this.props.type, number)
    }

    render() {
        const { screams, loadingData, currentPage, loadingUser, user: { blocks } } = this.props;
        const displayScream = (!loadingData && !loadingUser) ?
            (screams.map(scream => {
                if (blocks.findIndex(block => block.screamId === scream.screamId) === -1) {
                    return (
                        <Scream scream={scream} key={scream.screamId} />
                    )
                }else return null;
            })) : <ScreamSkeletons />;
        const displayPagination = (!loadingData && !loadingUser) ? (
            <Paginations defaultPage={currentPage} postPerPage={10} changePagination={this.changePagination} />
        ) : null;
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Sort />
                        {displayScream}
                        {displayPagination}
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
    type: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams,
        loadingData: state.data.loading,
        user: state.user,
        scream: state.data.scream,
        type: state.data.type,
        currentPage: state.data.currentPage,
        loadingUser: state.user.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreamsbyPages: (type, numberPage) => dispatch(getScreamsbyPage(type, numberPage)),
        onGetNumberScreams: () => dispatch(getNumberScreams()),
        onChangeType: (type) => dispatch(changeType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home)

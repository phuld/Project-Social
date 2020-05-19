import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream/Scream';
import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { getScreams, getScreamsbyPage, getNumberScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import ScreamSkeletons from '../utils/ScreamSkeletons';
import Paginations from '../components/Paginations/Paginations';
import Sort from '../components/UI/Sort';
import { changeType } from '../redux/actions/dataActions';

export class home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            postPerPage: 10
        }
    }


    componentDidMount() {
        // if(this.props.match.path !== this.props.type) {
        //     this.props.onChangeType(this.props.match.path)
        // }
        // this.props.onGetScreams();
        // console.log(this.props.location.search);
        const queryString = new URLSearchParams(this.props.location.search);
        let pageNumber = 1;
        for (let key of queryString) {
            if (key[0] === "page") {
                pageNumber = +key[1];
                this.setState({
                    currentPage: +key[1]
                })
            }
        }
        this.props.onGetScreamsbyPages(this.props.type, pageNumber);
        this.props.onGetNumberScreams();
    }


    componentDidUpdate(prevProps, prevState) {
        // if(prevProps.scream.commentCount !== this.props.scream.commentCount){
        //     this.props.onGetScreamsbyPages(this.state.currentPage);
        // }
        // console.log(prevProps.type, this.props.type);
        const queryString = new URLSearchParams(this.props.location.search);
        let pageNumber = 1;
        for (let key of queryString) {
            if (key[0] === "page") {
                pageNumber = +key[1];
            }
        }
        if (prevProps.type !== this.props.type || (prevProps.user.credentials.imageUrl && prevProps.user.credentials.imageUrl !== this.props.user.credentials.imageUrl)) {
            this.props.onGetScreamsbyPages(this.props.type, 1);
            this.setState({
                currentPage: pageNumber
            })
        }

        // console.log(prevProps.user.credentials.imageUrl, this.props.user.credentials.imageUrl);
        // console.log(window.location.pathname);
        // console.log(prevState.currentPage, this.state.currentPage);
    }

    changePagination = (number) => {
        this.setState({
            currentPage: number
        })
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
        const { screams, loading } = this.props;
        const { currentPage, postPerPage } = this.state;
        const displayScream = !loading ?
            (screams.map(scream => (
                <Scream scream={scream} key={scream.screamId} />
            ))) : <ScreamSkeletons />;
        const displayPagination = !loading ? (
            <Paginations defaultPage={currentPage} postPerPage={postPerPage} changePagination={this.changePagination} />
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
    onGetScreams: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams,
        loading: state.data.loading,
        user: state.user,
        scream: state.data.scream,
        type: state.data.type,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreams: () => dispatch(getScreams()),
        onGetScreamsbyPages: (type, numberPage) => dispatch(getScreamsbyPage(type, numberPage)),
        onGetNumberScreams: () => dispatch(getNumberScreams()), 
        onChangeType: (type) => dispatch(changeType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home)

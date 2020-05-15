import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream/Scream';
import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { getScreams, getScreamsbyPage, getNumberScreams } from '../redux/actions/dataActions';
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
        // this.props.onGetScreams();
        // console.log(this.props.location.search);
        const queryString = new URLSearchParams(this.props.location.search);
        let pageNumber = 1;
        for(let key of queryString) {
            if(key[0] === "page") {
                pageNumber = +key[1];
                this.setState({
                    currentPage: +key[1]
                })
            }
        }
        this.props.onGetScreamsbyPages(pageNumber);
        this.props.onGetNumberScreams();
    }

    componentDidUpdate(prevProps, prevState) {
        // if(prevProps.scream.commentCount !== this.props.scream.commentCount){
        //     this.props.onGetScreamsbyPages(this.state.currentPage);
        // }
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
        this.props.onGetScreamsbyPages(number)
    }

    render() {
        const { screams, loading } = this.props;
        const { currentPage, postPerPage } = this.state;
        // //Get Current Screams
        // const indexOfLastScream = currentPage * postPerPage;
        // const indexOfFirstScream = indexOfLastScream - postPerPage;
        // const currentScreams = screams.slice(indexOfFirstScream, indexOfLastScream)
        const displayScream = !loading ?
            (screams.map(scream => (
                <Scream scream={scream} key={scream.screamId} />
            ))) : <ScreamSkeletons />;
        const displayPagination = !loading ? (
            <Paginations defaultPage={currentPage} postPerPage={postPerPage} changePagination={this.changePagination} />
        ): null;
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
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
    onGetScreams: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams,
        loading: state.data.loading,
        user: state.user, 
        scream: state.data.scream
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreams: () => dispatch(getScreams()), 
        onGetScreamsbyPages: (numberPage) => dispatch(getScreamsbyPage(numberPage)), 
        onGetNumberScreams: () => dispatch(getNumberScreams())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home)

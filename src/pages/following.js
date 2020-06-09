import React, { Component } from 'react'
import { Grid, Typography, } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ScreamSkeletons from '../utils/ScreamSkeletons';
import Scream from '../components/Scream/Scream';
import { getScreamsByFollowing } from '../redux/actions/dataActions';
import UserFollowing from '../components/User/UserFollowing';

const styles = (theme) => ({
    ...theme.spread
})

export class following extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screamIdParams: null
        }
    }
    
    
    componentDidMount() {
        console.log(this.props.match.params.screamId);
        this.props.onGetScreamsByFollowing();
    }

    render() {
        const { classes, screams, loadingUI } = this.props;        
        const displayScreams = !loadingUI ? (
            screams.map(scream => <Scream scream={scream} key={scream.screamId}/>)
        ): (
            <ScreamSkeletons/>
        )
        return (
            <div>
                <Grid container spacing={2} className={classes.changePosition}>
                    <Grid item xs={12} sm={8}>
                        {displayScreams}
                    </Grid>
                    <Grid item sm={4}>
                        {/* <p>Profile</p> */}
                        <Typography variant="h6"><strong>My following user</strong></Typography>
                        <UserFollowing/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

following.propTypes = {
    classes: PropTypes.object.isRequired, 
    screams: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams, 
        loadingUI: state.ui.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetScreamsByFollowing: () => dispatch(getScreamsByFollowing())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(following))

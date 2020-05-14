import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';

const styles = {
    pagination: {
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: 20
    }
}

export class Paginations extends Component {

    handleChange = (event, number) => {
        this.props.changePagination(number)
    }
    render() {
        const { classes, screams, postPerPage } = this.props;
        const count = Math.ceil(screams.length/postPerPage);
        return (
            <div className={classes.pagination}>
                <Pagination count={count} variant="outlined" shape="rounded" onChange={(event, number) => this.handleChange(event, number)}/>
            </div>
        )
    }
}

Paginations.propTypes = {
    classes: PropTypes.object.isRequired, 
    postPerPage: PropTypes.number.isRequired, 
    changePagination: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        screams: state.data.screams
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Paginations))

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, NativeSelect, } from '@material-ui/core';
import { changeType } from '../../redux/actions/dataActions';
import { Link, withRouter } from 'react-router-dom';

const styles = {
    select: { 
        '&::before': {
            display: 'none'
        }, 
        fontWeight: 'bold', 
        color: "#0b0b65"
    }
    
}

export class Sort extends Component {


    handleChange = (event) => {
        this.props.onChangeType(event.target.value);
        const pathname = `/${event.target.value}`
        this.props.history.push({
            pathname: pathname
        })
    }

    render() {
        const { type, classes } = this.props;
        return (
            <Typography variant="body1" color="textSecondary">Sort by:
                <NativeSelect
                    // defaultValue="newest"
                    value={type}
                    inputProps={{
                        name: 'select',
                        id: 'uncontrolled-native',
                    }}
                    name="type"
                    onChange={this.handleChange}
                    className={classes.select}
                >
                    <option value="newest">Newest</option>
                    <option value="most-comments">Most commented</option>
                    <option value="most-likes">Most liked</option>
                </NativeSelect></Typography>
        )
    }
}

Sort.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onChangeType: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        type: state.data.type
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeType: (type) => dispatch(changeType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Sort)))

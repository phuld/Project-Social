import React, { Component } from 'react'
import BlockIcon from '@material-ui/icons/Block';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { blockScream } from '../../redux/actions/dataActions';

const styles = {
    block: {
        display: 'flex'
    },
    blockIcon: {
        marginRight: 5
    }
}

export class BlockScream extends Component {

    handleClick = () => {
        this.props.onBlockScream(this.props.screamId);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.block} onClick={this.handleClick}>
                <BlockIcon color="secondary" className={classes.blockIcon} /><span>Block Tweet</span>
            </div>
        )
    }
}

BlockScream.propTypes = {
    classes: PropTypes.object.isRequired, 
    screamId: PropTypes.string.isRequired, 
    onBlockScream: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBlockScream: (screamId) => dispatch(blockScream(screamId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlockScream))

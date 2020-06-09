import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

const styles = {

}

export class SideDrawer extends Component {
    render() {
        const {classes} = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

SideDrawer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SideDrawer)

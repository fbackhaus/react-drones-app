import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';


const styles = theme => ({
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, variant, ...other } = props;

    return (
        <SnackbarContent
        className={classNames("warning", className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon>warning</Icon>
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                >
                </IconButton>,
            ]}
            {...other}
        />
    );
}

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

const OutOfBoundsSnackbar = (props) => {
    const { open, droneId } = props;
    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
            >
            <MySnackbarContentWrapper
                message={` The drone ${droneId} is out of bounds!`}
            />
            </Snackbar>
        </React.Fragment>
    );
}

export default OutOfBoundsSnackbar;

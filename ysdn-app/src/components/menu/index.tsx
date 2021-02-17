import * as React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

const ButtonAppBar: React.FC<{ Render: Array<JSX.Element> }> = (
    { Render } = {
        Render: [
            <Button color="inherit" key="login-button" component={Link} to="/login">
                Login
            </Button>,
        ],
    }
) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        component={Link}
                        to="/">
                        <HomeIcon style={{ fontSize: 30 }} />
                    </IconButton>
                    <Typography variant="h3" className={classes.title}>
                        YST
                    </Typography>
                    {Render}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonAppBar;

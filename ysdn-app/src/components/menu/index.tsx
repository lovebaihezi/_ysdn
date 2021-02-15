import * as React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
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

const ButtonAppBar: React.FC<any> = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                        component={Link}
                        to="/">
                        YST
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/updateArticle"
                        startIcon={<AddIcon />}>
                        update
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonAppBar;

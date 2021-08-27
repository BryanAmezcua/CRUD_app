import React, { useState } from 'react';

// History Hook
import { useHistory } from 'react-router-dom'

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Typography, List, ListItem, ListItemText } from '@material-ui/core';

// Icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Custom Components
//import AddUser from './AddUser';

//Custom TopBar CSS
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      margin: theme.spacing(0),
      padding: theme.spacing(0,1,0,0)
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
      fontFamily: '"Helvetica Neue"',
    },
    paper: {
        width: '220px'
    },
    listItems: {
        textAlign: 'center'
    }
}));

const AppDrawer = (props) => {
    const classes = useStyles();
    let history= useHistory();

    // Drawer State
    const [drawerStatus, setDrawerStatus] = useState(false);

    const seeAllUsers = () => {
        history.push('/PaginationUsers');
    };

    const createUser = () => {
        history.push('/AddUser');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={ () => setDrawerStatus(!drawerStatus) }>
                        <MenuIcon />
                        <Drawer open={drawerStatus} classes={{ paper: classes.paper}}>
                            <List>
                                <ListItem button className={classes.listItems} divider>
                                   <ListItemText primary="All Users" onClick={seeAllUsers}/>
                                </ListItem>
                                <ListItem button className={classes.listItems} divider>
                                   <ListItemText primary="Add User" onClick={createUser}/>
                                </ListItem>
                            </List>
                        </Drawer>
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        EPC VIP
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default AppDrawer;
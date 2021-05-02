import { makeStyles } from "@material-ui/core";
import React from "react";
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from "react-router";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar,
        welcome: {
            flexGrow: 1,
        }
    }
})

function Layout({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Add Image',
            icon: <AddCircleOutlined color="primary" />,
            path: '/add'
        },
        {
            text: 'View Gallery',
            icon: <SubjectOutlined color="primary" />,
            path: '/'
        },
    ]

    return (
        <div className ={classes.root}>
            {/* App Bar! */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.welcome} variant="h5" >
                        Fun In San Francisco!
                    </Typography>
                </Toolbar>
                
            </AppBar>

            {/* side draw */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Image Gallery
                    </Typography>
                </div>

            {/* list / links */}
            <List>
                {menuItems.map(item => (
                    <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname == item.path ? classes.active : null}
                    >
                        <ListItemIcon>{item.icon} </ListItemIcon>
                        <ListItemText primary ={item.text} />
                    </ListItem>
                ))}
            </List>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                { children }
            </div>
        </div>
    )
}

export default Layout;
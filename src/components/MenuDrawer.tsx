import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//MUI Components
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

//Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textAlign: "center",
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  })
);

interface Props {
  isDrawerOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const MenuDrawer = (props: Props) => {
  const classes = useStyles();

  const { isDrawerOpen, toggleDrawer } = props;

  return (
    <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(false)}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Lighthouse Inc
          </Typography>
        </Toolbar>
      </AppBar>

      <List component="nav" aria-label="main mailbox folders">
        <ListItem button component={Link} to="/users" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="User List" />
        </ListItem>
        <ListItem button component={Link} to="/keywords" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Keywords" />
        </ListItem>
        <ListItem button component={Link} to="/keywords-distribution" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Keyword Distribution" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuDrawer;

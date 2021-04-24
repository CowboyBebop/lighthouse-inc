import React, { useState } from "react";
import { createStyles, fade, Theme, makeStyles } from "@material-ui/core/styles";

//MUI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

//Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

//data
import { PeopleBook as users, User } from "../data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textAlign: "left",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

    container: {
      height: "calc(100vh - 64px - 64px )",
      width: "calc(100wh - 64px)",
      margin: "32px 32px",
    },

    search: {
      color: theme.palette.primary.light,
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputInput: {
      color: theme.palette.primary.light,
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "25ch",
    },

    gridList: {
      width: "calc(100% -32px)",
      margin: "16px",
    },
  })
);

interface Props {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const UsersPage = (props: Props) => {
  const classes = useStyles();

  const { toggleDrawer } = props;

  return (
    <Paper className={classes.container} elevation={3}>
      <Toolbar color="secondary">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={users.map((user) => user.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.inputInput}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </div>
      </Toolbar>
      <div className={classes.gridList}>
        <GridList cellHeight={128} cols={5} spacing={16}>
          {users.map((user: User) => (
            //change to grid
            <GridListTile key={user.id} rows={1} cols={1}>
              <Card style={{ height: "116px", width: "95%", margin: "auto" }}>
                <CardContent style={{ height: "100%", width: "100%", padding: 0 }}>
                  <div style={{ margin: "22px 0 22px 0" }}>
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      id: {user.id}
                    </Typography>

                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      name: {user.name}
                    </Typography>

                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      gender: {user.gender}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Paper>
  );
};

export default UsersPage;

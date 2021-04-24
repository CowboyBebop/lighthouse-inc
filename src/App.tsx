import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//React
import React, { useState } from "react";

//Custom Components
import MenuDrawer from "./components/MenuDrawer";
import MainAppBar from "./components/MainAppBar";

//Pages
import usersPage from "./pages/UsersPage";
import keywordsPage from "./pages/KeywordsPage";
import keywordDistributionPage from "./pages/KeywordDistributionPage";

//MUI Components
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textAlign: "left",
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

    //gridlist
    gridList: {
      width: 500,
      height: 450,
    },
  })
);

function App() {
  const classes = useStyles();

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <div className="App">
      <Router>
        <MenuDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <MainAppBar toggleDrawer={toggleDrawer} />

        <div className="container">
          <Switch>
            <Route exact path="/users" component={usersPage} />
            <Route exact path="/keywords" component={keywordsPage} />
            <Route exact path="/keywords-distribution" component={keywordDistributionPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

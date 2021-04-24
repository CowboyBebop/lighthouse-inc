import React, { useState, Fragment } from "react";
import { createStyles, fade, Theme, makeStyles } from "@material-ui/core/styles";

//MUI Components
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { DataGrid, GridColDef, GridRowModel } from "@material-ui/data-grid";

//data
import {
  EyegleSpies as keywordQueries,
  PeopleBook as users,
  calculateUserKeywords,
  UserKeywords,
} from "../data";

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

    table: {
      minWidth: 650,
    },
  })
);

//interface QueryWith
interface Props {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const KeywordsPage = (props: Props) => {
  const classes = useStyles();

  const [userSearchQuery, setUserSearchQuery] = useState<string | undefined>(undefined);
  const [searchData, setSearchData] = useState<({ id: number } & UserKeywords)[]>(
    calculateUserKeywords(keywordQueries).map((x, i) => ({ id: i, ...x }))
  );

  let filteredRowData: GridRowModel[] = userSearchQuery
    ? (searchData as GridRowModel[])?.filter(
        (item) => item.uid.toLowerCase() === userSearchQuery.toLowerCase()
      )
    : (searchData! as GridRowModel[]);

  const onSearchChange = (
    event: React.ChangeEvent<{}>,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    if ((reason as string) === "clear") setUserSearchQuery("");
    else setUserSearchQuery(value!);
  };

  const columns: GridColDef[] = [
    { field: "id", hide: true },
    { field: "uid", headerName: "UID", width: 400, headerAlign: "left" },
    { field: "frequency", headerName: "Frequency", width: 300, headerAlign: "center" },
    { field: "keyword", headerName: "Keyword", width: 300, headerAlign: "center" },
  ];

  return (
    <Fragment>
      <Paper className={classes.container} elevation={3}>
        <Toolbar color="secondary">
          <div style={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id="user-search-autocomplete"
              onChange={onSearchChange}
              options={users.map((user) => user.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </div>
        </Toolbar>
        {console.log(searchData)}
        {console.log(searchData)}
        {console.log(filteredRowData)}
        <div style={{ height: "calc(100vh - 96px - 80px - 64px)", margin: "16px" }}>
          <DataGrid
            rows={filteredRowData ? filteredRowData : []}
            columns={columns}
            rowHeight={25}
            autoPageSize
          />
        </div>
      </Paper>
    </Fragment>
  );
};

export default KeywordsPage;

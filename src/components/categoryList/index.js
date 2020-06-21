import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import "../header/header.css";
import urls from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(4),
  },
}));

const CategoryList = (props) => {
  const [data, setData] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch(urls.getCategory)
      .then((response) => response.json())
      .then((data) => setData(data.DATA));
  });
  const classes = useStyles();
  const { title } = props;

  return (
    <List
      subheader={<ListSubheader className="listHeader">{title}</ListSubheader>}
      className={classes.root}
    >
      {data.map((detail) => (
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Typography noWrap>{detail.name}</Typography>
          </Grid>
        </Paper>
      ))}
    </List>
  );
};

export default CategoryList;

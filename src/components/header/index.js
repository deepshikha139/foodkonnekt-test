import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { localizeStrings } from "../../localisation";
import CategoryList from "../categoryList";
import ItemList from "../itemList";
import "./header.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Header() {
  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState("Items");
  const tabs = [
    { id: 0, name: localizeStrings.itemText },
    { id: 1, name: localizeStrings.categoryText },
  ];

  const handleClick = (item) => {
    setActiveTab(item.id);
    setTitle(item.name);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {localizeStrings.headerTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {tabs.map((obj) => (
              <ListItem
                button
                className="tabSelected"
                key={obj.id}
                onClick={() => handleClick(obj)}
                selected={activeTab === obj.id}
              >
                <ListItemText primary={obj.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {activeTab === 1 && <CategoryList title={title} />}
        {activeTab === 0 && <ItemList title={title} />}
      </main>
    </div>
  );
}

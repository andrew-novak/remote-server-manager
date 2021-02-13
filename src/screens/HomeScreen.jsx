import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import FilesSection from "../components/FilesSection";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";
import DeletionDialog from "../components/DeletionDialog";
import { getState } from "../actions/files";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    paddingTop: theme.spacing(2),
  },
}));

const HomeScreen = ({ getState }) => {
  useEffect(() => {
    getState();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FilesSection sectionName="config" title="Nginx Configuration" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FilesSection sectionName="static" title="Static" />
          </Grid>
        </Grid>
      </Container>
      <ConsecutiveSnackbars />
      <DeletionDialog />
    </div>
  );
};

export default connect(null, { getState })(HomeScreen);

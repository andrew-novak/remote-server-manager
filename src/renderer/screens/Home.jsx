import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import FilesSection from "../components/FilesSection";
import DeletionDialog from "../components/DeletionDialog";
import { getState } from "../actions/files";
import runBashFile from "../actions/runBashFile";

const useStyles = makeStyles((theme) => ({
  root: {
    // position: "fixed",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    paddingTop: theme.spacing(2),
  },
}));

const Home = ({ sshConfig, sectionPaths, getState, runBashFile }) => {
  useEffect(() => getState({ sshConfig, sectionPaths }), []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FilesSection
              section="config"
              title="Nginx Configuration"
              textEdition
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FilesSection section="static" title="Static" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FilesSection section="nodeApis" title="Node.js APIs" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FilesSection
              section="deploy"
              title="Deployment scripts"
              textEdition
              onRun={(filename) =>
                runBashFile({
                  sshConfig,
                  location: sectionPaths.deploy,
                  filename,
                })
              }
            />
          </Grid>
        </Grid>
      </Container>
      <DeletionDialog />
    </div>
  );
};

const mapState = (state) => {
  const sshConfig = state.config.stored.ssh;
  const sectionPaths = state.config.stored.sections;
  return { sshConfig, sectionPaths };
};

export default connect(mapState, { getState, runBashFile })(Home);

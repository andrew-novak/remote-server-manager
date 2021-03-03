import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import os from "os";
import path from "path";
import { connect } from "react-redux";

import { setConfig } from "../actions/config";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input1stLine: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  inputShort: {
    width: `calc(50% - ${theme.spacing(1)}px)`,
    marginBottom: theme.spacing(2),
  },
  inputLong: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const Config = ({ helperTexts, setConfig }) => {
  const [inputs, setInputs] = useState({
    host: "",
    username: "",
    config: "/etc/nginx/conf.d",
    static: "/usr/share/nginx/static",
    privateKey: path.join(os.homedir(), ".ssh/id_rsa"),
    temporary: path.join(__dirname, "../../temporary"),
  });

  const classes = useStyles();

  const handleInput = (event) => {
    const { id, value } = event.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  return (
    <Container maxWidth="sm" className={classes.title}>
      <Paper className={classes.root}>
        <div className={classes.head}>
          <Typography variant="h4" className={classes.title}>
            Configuration
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setConfig(inputs)}
          >
            Accept
          </Button>
        </div>
        <Typography variant="h6" className={classes.subtitle}>
          Remote
        </Typography>
        <div className={classes.input1stLine}>
          <TextField
            id="host"
            label="Host"
            value={inputs.host}
            className={classes.inputShort}
            onChange={handleInput}
            error={helperTexts.host}
            helperText={helperTexts.host}
          />
          <TextField
            id="username"
            label="Username"
            value={inputs.user}
            className={classes.inputShort}
            onChange={handleInput}
            error={helperTexts.username}
            helperText={helperTexts.username}
          />
        </div>
        <TextField
          id="config"
          label="Nginx configurations"
          value={inputs.config}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.config}
          helperText={helperTexts.config}
        />
        <TextField
          id="static"
          label="Nginx static"
          value={inputs.static}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.static}
          helperText={helperTexts.static}
        />
        <Typography variant="h6" className={classes.title}>
          Local
        </Typography>
        <TextField
          id="privateKey"
          label="SSH private key"
          value={inputs.privateKey}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.privateKey}
          helperText={helperTexts.privateKey}
        />
        <TextField
          id="temporary"
          label="Temporary"
          value={inputs.temporary}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.temporary}
          helperText={helperTexts.temporary}
        />
      </Paper>
    </Container>
  );
};

const mapState = (state) => {
  const { helperTexts } = state.config;
  return { helperTexts };
};

export default connect(mapState, { setConfig })(Config);

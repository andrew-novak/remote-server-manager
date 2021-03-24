import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  useMediaQuery,
  Container,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";

import { getInputs, setStored, setInput } from "../actions/config";
import theme from "../theme";
import { colorError } from "../styles";

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

const Config = ({
  isConfigured,
  helperTexts,
  inputs,
  getInputs,
  setStored,
  setInput,
}) => {
  useEffect(getInputs, []);

  const history = useHistory();
  const goBack = () => history.goBack();
  const goHome = () => history.push("/");

  const onAccept = () => setStored({ config: inputs, goHome });

  const handleInput = (event) => {
    const { id, value } = event.target;
    let [outerField, field] = id.split(":");
    if (!field) {
      field = outerField;
      outerField = null;
    }
    setInput({ outerField, field, value });
  };

  const classes = useStyles();

  const isSmaller = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Container maxWidth="sm" className={classes.title}>
      <Paper className={classes.root}>
        <div className={classes.head}>
          {isConfigured ? (
            isSmaller ? (
              <IconButton style={colorError} onClick={goBack}>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <Button
                style={colorError}
                startIcon={<ArrowBackIcon />}
                onClick={goBack}
              >
                Back
              </Button>
            )
          ) : null}
          <Typography variant="h4" className={classes.title}>
            Configuration
          </Typography>
          {isSmaller ? (
            <IconButton color="primary" onClick={onAccept}>
              <SaveIcon />
            </IconButton>
          ) : (
            <Button color="primary" startIcon={<SaveIcon />} onClick={onAccept}>
              Accept
            </Button>
          )}
        </div>
        <Typography variant="h6" className={classes.subtitle}>
          Remote
        </Typography>
        <div className={classes.input1stLine}>
          <TextField
            id="ssh:host"
            label="Host"
            value={inputs.ssh.host}
            className={classes.inputShort}
            onChange={handleInput}
            error={helperTexts.host}
            helperText={helperTexts.host}
          />
          <TextField
            id="ssh:username"
            label="Username"
            value={inputs.ssh.username}
            className={classes.inputShort}
            onChange={handleInput}
            error={helperTexts.username}
            helperText={helperTexts.username}
          />
        </div>
        <TextField
          id="sections:config"
          label="Nginx configurations"
          value={inputs.sections.config}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.config}
          helperText={helperTexts.config}
        />
        <TextField
          id="sections:static"
          label="Nginx static"
          value={inputs.sections.static}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.static}
          helperText={helperTexts.static}
        />
        <TextField
          id="sections:nodeApis"
          label="Node.js APIs"
          value={inputs.sections.nodeApis}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.nodeApis}
          helperText={helperTexts.nodeApis}
        />
        <TextField
          id="sections:deploy"
          label="Deployment scripts"
          value={inputs.sections.deploy}
          className={classes.inputLong}
          onChange={handleInput}
          error={helperTexts.deploy}
          helperText={helperTexts.deploy}
        />
        <Typography variant="h6" className={classes.title}>
          Local
        </Typography>
        <TextField
          id="ssh:privateKey"
          label="SSH private key"
          value={inputs.ssh.privateKey}
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
  const { isConfigured, helperTexts, inputs } = state.config;
  return { isConfigured, helperTexts, inputs };
};

export default connect(mapState, { getInputs, setStored, setInput })(Config);

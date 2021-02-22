import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";

import { colorError } from "../styles";
import { changeInput, close, confirm } from "../actions/deletionDialog";

const useStyles = makeStyles({
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const DeletionDialog = ({
  location,
  section,
  filename,
  input,
  error,
  changeInput,
  close,
  confirm,
}) => {
  const isOpen = !!section;

  const handleInput = (event) => changeInput(event.target.value);

  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Type in the name of the file &quot;
          {filename}
          &quot; to confirm your deletion.
        </DialogContentText>
        <TextField
          autoFocus
          label="Filename"
          fullWidth
          value={input}
          onChange={handleInput}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Button style={colorError} onClick={close}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => confirm({ location, filename, input })}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = (state) => {
  const { sections } = state.config;
  const { section, filename, input, error } = state.deletionDialog;
  return {
    location: sections[section],
    section,
    filename,
    input,
    error,
  };
};

export default connect(mapState, { changeInput, close, confirm })(
  DeletionDialog
);

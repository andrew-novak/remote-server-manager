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

import { changeInput, close, confirm } from "../actions/deletionDialog";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonCancel: {
    color: theme.palette.error.main,
  },
}));

const DeletionDialog = ({
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
        <Button className={classes.buttonCancel} onClick={close}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => confirm(section, filename, input)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = (state) => {
  const { section, filename, input, error } = state.deletionDialog;
  return {
    section,
    filename,
    input,
    error,
  };
};

export default connect(mapState, { changeInput, close, confirm })(
  DeletionDialog
);

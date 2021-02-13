import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";

import { displayNext, hideCurrent, removeCurrent } from "../actions/snackbars";

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const ConsecutiveSnackbars = ({
  snackPack,
  isOpen,
  messageInfo,
  displayNext,
  hideCurrent,
  removeCurrent,
}) => {
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      displayNext();
    } else if (snackPack.length && messageInfo && isOpen) {
      hideCurrent();
    }
  }, [snackPack, messageInfo, isOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    hideCurrent();
  };

  const handleExited = () => removeCurrent();

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
      message={messageInfo ? messageInfo.message : null}
    />
  );
};
/*
action={
  <Fragment>
    <Button color="secondary" size="small" onClick={ handleClose }>
      UNDO
    </Button>
    <IconButton
      aria-label="close"
      color="inherit"
      className={ classes.close }
      onClick={ handleClose }
    >
      <CloseIcon />
    </IconButton>
  </Fragment>
}
*/

const mapState = (state) => {
  const { snackPack, isOpen, messageInfo } = state.snackbars;
  return { snackPack, isOpen, messageInfo };
};

export default connect(mapState, { displayNext, hideCurrent, removeCurrent })(
  ConsecutiveSnackbars
);

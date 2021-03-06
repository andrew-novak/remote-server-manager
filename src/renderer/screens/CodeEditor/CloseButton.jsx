import React from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery, IconButton, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";

import theme from "../../theme";
import { colorError } from "../../styles";
import { close } from "../../actions/codeEditor";

const CancelButton = ({ close }) => {
  const history = useHistory();

  const handleClick = () => close(history.goBack);

  const isSmaller = useMediaQuery(theme.breakpoints.down("xs"));

  if (isSmaller)
    return (
      <IconButton style={colorError} onClick={handleClick}>
        <ArrowBackIcon />
      </IconButton>
    );

  return (
    <Button
      style={colorError}
      startIcon={<ArrowBackIcon />}
      onClick={handleClick}
    >
      Cancel
    </Button>
  );
};

export default connect(null, { close })(CancelButton);

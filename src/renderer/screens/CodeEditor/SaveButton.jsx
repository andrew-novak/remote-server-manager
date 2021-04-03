import React from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery, IconButton, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";

import theme from "../../theme";
import { createFile, overrideFile } from "../../actions/files";

const SaveButton = ({
  sshConfig,
  isNew,
  originalFilename,
  filename,
  code,
  targetDir,
  sectionPaths,
  createFile,
  overrideFile,
}) => {
  const history = useHistory();

  const options = {
    sshConfig,
    originalFilename,
    filename,
    content: code,
    targetDir,
    goBack: history.goBack,
    sectionPaths,
  };

  const handleClick = () =>
    isNew ? createFile(options) : overrideFile(options);

  const isSmaller = useMediaQuery(theme.breakpoints.down("xs"));

  if (isSmaller) {
    return (
      <IconButton color="primary" onClick={handleClick}>
        <SaveIcon />
      </IconButton>
    );
  }

  return (
    <Button color="primary" startIcon={<SaveIcon />} onClick={handleClick}>
      {isNew ? "Save" : "Override"}
    </Button>
  );
};

const mapState = (state) => {
  const sshConfig = state.config.stored.ssh;
  const { isNew, section, originalFilename, filename, code } = state.codeEditor;
  const targetDir = state.config.stored.sections[section];
  const sectionPaths = state.config.stored.sections;
  return {
    sshConfig,
    isNew,
    originalFilename,
    filename,
    code,
    targetDir,
    sectionPaths,
  };
};

export default connect(mapState, { createFile, overrideFile })(SaveButton);

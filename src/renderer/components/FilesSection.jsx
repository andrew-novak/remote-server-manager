/* eslint-disable react/no-array-index-key */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";
import IconAdd from "@material-ui/icons/Add";
import IconSend from "@material-ui/icons/Send";
import IconClose from "@material-ui/icons/Close";
import IconEdit from "@material-ui/icons/Edit";
import IconDelete from "@material-ui/icons/Delete";
import { connect } from "react-redux";

import Dropzone from "./Dropzone";
import { colorError } from "../styles";
import { open as openCodeEditor } from "../actions/codeEditor";
import {
  open as openDropzone,
  setFiles as setDropzoneFiles,
  close as closeDropzone,
} from "../actions/dropzones";
import { sendFiles } from "../actions/files";
import { open as openDeletionDialog } from "../actions/deletionDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  dropzone: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  itemText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const FilesSection = ({
  section,
  sshConfig,
  sectionPaths,
  title,
  textEdition,
  files,
  dropzones,
  openDropzone,
  setDropzoneFiles,
  closeDropzone,
  sendFiles,
  openCodeEditor,
  openDeletionDialog,
}) => {
  const { isOpen: isDropzoneOpen, files: dropzoneFiles } = dropzones[section];
  const filenames = files[section];
  const location = sectionPaths[section];

  const history = useHistory();
  const goToEditor = () => history.push("/code-editor");

  const classes = useStyles();

  // noWrap
  const content = filenames.map((filename, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={filename}
        classes={{ primary: classes.itemText }}
      />
      <ListItemSecondaryAction>
        {textEdition ? (
          <IconButton
            onClick={() =>
              openCodeEditor({
                sshConfig,
                section,
                location,
                filename,
                goToEditor,
              })
            }
          >
            <IconEdit />
          </IconButton>
        ) : null}
        <IconButton onClick={() => openDeletionDialog(section, filename)}>
          <IconDelete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </div>
      <div className={classes.actions}>
        {textEdition ? (
          <Button
            color="primary"
            startIcon={<IconAdd />}
            onClick={() => openCodeEditor({ section, goToEditor })}
          >
            Create new
          </Button>
        ) : null}
      </div>
      <div className={classes.actions}>
        {isDropzoneOpen ? (
          <>
            <Button
              style={colorError}
              startIcon={<IconClose />}
              onClick={() => closeDropzone(section)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              startIcon={<IconSend />}
              disabled={dropzoneFiles.length === 0}
              onClick={() =>
                sendFiles({
                  sshConfig,
                  targetDir: location,
                  section,
                  files: dropzoneFiles,
                  sectionPaths,
                })
              }
            >
              Send
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            startIcon={<IconAdd />}
            onClick={() => openDropzone(section)}
          >
            Add existing
          </Button>
        )}
      </div>
      {isDropzoneOpen ? (
        <div className={classes.dropzone}>
          <Dropzone
            files={dropzoneFiles}
            setFiles={(files) => setDropzoneFiles(section, files)}
          />
        </div>
      ) : null}
      <List>{content}</List>
    </Paper>
  );
};

const mapState = (state) => {
  const sshConfig = state.config.ssh;
  const sectionPaths = state.config.sections;
  const { files, dropzones } = state;
  return { sshConfig, sectionPaths, files, dropzones };
};

export default connect(mapState, {
  openDropzone,
  setDropzoneFiles,
  closeDropzone,
  sendFiles,
  openCodeEditor,
  openDeletionDialog,
})(FilesSection);

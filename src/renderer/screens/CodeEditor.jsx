import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core/";
import IconArrowBack from "@material-ui/icons/ArrowBack";
import IconSave from "@material-ui/icons/Save";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-nginx";
import "prismjs/themes/prism.css";
import { connect } from "react-redux";

import { colorError } from "../styles";
import { close, setCode } from "../actions/codeEditor";
import { overrideFile } from "../actions/files";

const CodeEditor = ({
  sshConfig,
  tempDir,
  remoteDir,
  filename,
  code,
  close,
  setCode,
  overrideFile,
}) => {
  const history = useHistory();
  const goBack = () => history.goBack();
  return (
    <>
      <AppBar position="fixed" style={{ background: "white" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Button
            style={colorError}
            startIcon={<IconArrowBack />}
            onClick={() => close(goBack)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            startIcon={<IconSave />}
            onClick={() =>
              overrideFile({
                sshConfig,
                tempDir,
                remoteDir,
                filename,
                content: code,
              })
            }
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.nginx)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </>
  );
};

const mapState = (state) => {
  const { section, filename, code } = state.codeEditor;
  const sshConfig = state.config.ssh;
  const tempDir = state.config.temporary;
  const remoteDir = state.config.sections[section];
  return { sshConfig, tempDir, remoteDir, filename, code };
};

export default connect(mapState, { close, setCode, overrideFile })(CodeEditor);

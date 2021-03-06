import React from "react";
import { AppBar, Toolbar, TextField } from "@material-ui/core/";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-nginx";
import "prismjs/themes/prism.css";
import { connect } from "react-redux";

import CloseButton from "./CloseButton";
import SaveButton from "./SaveButton";
import { setFilename, setCode } from "../../actions/codeEditor";

const CodeEditor = ({ filename, code, setFilename, setCode }) => (
  <>
    <AppBar position="fixed" style={{ background: "white" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <CloseButton />
        <TextField
          value={filename}
          onChange={(event) => setFilename(event.target.value)}
        />
        <SaveButton />
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

const mapState = (state) => {
  const sshConfig = state.config.ssh;
  const { isNew, section, filename, code } = state.codeEditor;
  const tempDir = state.config.temporary;
  const targetDir = state.config.sections[section];
  return { sshConfig, isNew, filename, code, tempDir, targetDir };
};

export default connect(mapState, { setFilename, setCode })(CodeEditor);

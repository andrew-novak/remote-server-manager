import React from "react";
import { AppBar, Toolbar, TextField } from "@material-ui/core/";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-bash";
import "prismjs/themes/prism.css";
import { connect } from "react-redux";

import CloseButton from "./CloseButton";
import SaveButton from "./SaveButton";
import { setFilename, setCode } from "../../actions/codeEditor";

const CodeEditor = ({
  filename,
  section,
  code,
  helperTexts,
  setFilename,
  setCode,
}) => {
  const highlightLang = section === "config" ? languages.nginx : languages.bash;
  return (
    <>
      <AppBar position="fixed" style={{ background: "white" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <CloseButton />
          <TextField
            value={filename}
            onChange={(event) => setFilename(event.target.value)}
            error={helperTexts.filename}
            helperText={helperTexts.filename}
          />
          <SaveButton />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, highlightLang)}
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
  const { section, filename, code, helperTexts } = state.codeEditor;
  return { section, filename, code, helperTexts };
};

export default connect(mapState, { setFilename, setCode })(CodeEditor);

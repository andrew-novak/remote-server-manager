import React from "react";
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
import { close, setCode, save } from "../actions/codeEditor";

const CodeEditorScreen = ({
  section,
  filename,
  code,
  close,
  setCode,
  save,
}) => (
  <>
    <AppBar position="fixed" style={{ background: "white" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Button
          style={colorError}
          startIcon={<IconArrowBack />}
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          startIcon={<IconSave />}
          onClick={() => save(section, filename, code)}
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

const mapState = (state) => {
  const { section, filename, code } = state.codeEditor;
  return { section, filename, code };
};

export default connect(mapState, { close, setCode, save })(CodeEditorScreen);

/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import IconUpload from "@material-ui/icons/CloudUpload";
import { Typography } from "@material-ui/core";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Dropzone = ({ files, setFiles }) => {
  const mergeFileArrays = (...arrays) => {
    let jointArray = [];
    arrays.forEach((array) => {
      jointArray = [...jointArray, ...array];
    });
    const uniqueArray = jointArray.reduce((acc, file) => {
      const found = acc.find((f) => f.path === file.path);
      if (!found) {
        acc.push(file);
      }
      return acc;
    }, []);
    return uniqueArray;
  };

  const onDropAccepted = (acceptedFiles) => {
    const merged = mergeFileArrays(files, acceptedFiles);
    setFiles([...merged]);
  };

  const {
    // acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDropAccepted });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const filenames = files.map((file) => (
    <Typography color="primary">{file.name}</Typography>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <IconUpload />
        <Typography>Drag &apos;n&apos; drop or click</Typography>
        {filenames}
      </div>
    </div>
  );
};

export default Dropzone;

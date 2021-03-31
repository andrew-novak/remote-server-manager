export default (data, delimiter) => {
  const str = data.toString().replace(/(\r\n|\n|\r)/gm, "");
  return str.split(delimiter);
};

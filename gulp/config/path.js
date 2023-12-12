import nodePath from "path"

const rootFolder = nodePath.basename(nodePath.resolve())
const srcFolder = "./src";
const buildFolder = "./dist";

export const path = {
  rootFolder: rootFolder,
  srcFolder: srcFolder,
  buildFolder: buildFolder
}
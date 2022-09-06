const { existsSync, mkdirSync, rmSync } = require("fs");
const { execSync } = require("child_process");

function getFileName(index) {
  return index >= 3 ? `js-0${index}` : `mjs-0${index}`;
}

function rmFolder(folderName) {
  return rmSync(`./${folderName}`, { recursive: true });
}

function makeDirAndReturnName(folderName) {
  if (existsSync(folderName)) {
    rmFolder(folderName);
  }

  mkdirSync(folderName);

  return folderName;
}

function initializePackage(folderName) {
  execSync(`npm init -y --scope @viniciusaportela --silent`, {
    cwd: `./${folderName}`,
  });

  return folderName;
}

function printNameAndPackageVersion(folderName) {
  const { name, version } = require(`./${folderName}/package.json`);

  console.log({ n: name, v: version });

  return folderName;
}

const FOLDER_AMOUNT = 4;

Array.from(Array(FOLDER_AMOUNT).keys())
  .map((index) => makeDirAndReturnName(getFileName(index + 1)))
  .map((folderName) => initializePackage(folderName))
  .map((folderName) => printNameAndPackageVersion(folderName))
  .forEach((folderName) => rmFolder(folderName));

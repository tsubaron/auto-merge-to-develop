const core = require("@actions/core");
const github = require("@actions/github");
const Mustache = require("mustache");
const fs = require("fs");

const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];
const BASE_BRANCH = process.env["BASE_BRANCH"];
const HEAD_BRANCH = process.env["HEAD_BRANCH"];
const OWNER = process.env["OWNER"];
const REPO = process.env["REPO"];
const TEMPLATE_FILE_NAME = process.env["TEMPLATE"];
const TITLE = BASE_BRANCH + " to develop " + formatDate(new Date());

// Debug outputs
console.log("GITHUB_TOKEN: ", GITHUB_TOKEN);
console.log("BASE_BRANCH: ", BASE_BRANCH);
console.log("HEAD_BRANCH: ", HEAD_BRANCH);
console.log("OWNER: ", OWNER);
console.log("REPO: ", REPO);
console.log("TEMPLATE_FILE_NAME: ", TEMPLATE_FILE_NAME);
console.log("TITLE: ", TITLE);

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

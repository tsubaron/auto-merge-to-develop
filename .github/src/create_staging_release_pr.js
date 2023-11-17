const core = require("@actions/core");
const github = require("@actions/github");
const Mustache = require("mustache");
const fs = require("fs");

const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];
const BASE_BRANCH = "develop";
const HEAD_BRANCH = process.env["HEAD_BRANCH"];
const OWNER = process.env["OWNER"];
const REPO = process.env["REPO"];
const TEMPLATE_FILE_NAME = process.env["TEMPLATE"];
const TITLE = `${HEAD_BRANCH} to ${BASE_BRANCH} ` + formatDate(new Date());

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

async function createPullRequest(title, body) {
  const octokit = github.getOctokit(GITHUB_TOKEN);
  const requestBody = {
    owner: OWNER,
    repo: REPO,
    title: title,
    body: body,
    head: HEAD_BRANCH,
    base: BASE_BRANCH,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };
  const response = await octokit.request(
    `POST /repos/${OWNER}/${REPO}/pulls`,
    requestBody
  );
  return response;
}

const fileContent = fs.readFileSync(TEMPLATE_FILE_NAME, "utf-8");
const description = Mustache.render(fileContent, {
  base_branch: BASE_BRANCH,
  head_branch: HEAD_BRANCH,
});
createPullRequest(TITLE, description).then((response) => {
  console.log("Request to create PR: #", response.data.number);
});
core.setOutput("Done!");

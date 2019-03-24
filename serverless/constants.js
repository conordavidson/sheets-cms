const path = require("path");

const ON_PRODUCTION = process.env.NODE_ENV === "production";
const ON_DEVELOPMENT = process.env.NODE_ENV === "development";
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_FILE_PATH =
  "./.service-account-credentials.json";
const GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = ON_PRODUCTION
  ? JSON.parse(process.env.SERVICE_ACCOUNT_CREDENTIALS)
  : require(GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_FILE_PATH);

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const GCP_BUCKET_ID = process.env.GCP_BUCKET_ID;

const OUTPUT_PATH = path.join(__dirname, "./tmp/src.zip");
const EXTRACT_PATH = path.join(__dirname, "./tmp/src");

module.exports = {
  ON_PRODUCTION,
  ON_DEVELOPMENT,
  CLIENT_SECRET,
  GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_FILE_PATH,
  GOOGLE_SERVICE_ACCOUNT_CREDENTIALS,
  GCP_PROJECT_ID,
  GCP_BUCKET_ID,
  OUTPUT_PATH,
  EXTRACT_PATH
};

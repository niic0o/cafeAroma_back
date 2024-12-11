require("dotenv").config();

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';

module.exports = MP_ACCESS_TOKEN;
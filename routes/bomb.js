const express = require("express");
const router = express.Router();
const bomb = require("../services/bomb.js");

/* GET programming languages */

router.get("/", async function (req, res, next) {
  try {
    res.json(await bomb.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting bomb`, err.message);
    next(err);
  }
});

module.exports = router;

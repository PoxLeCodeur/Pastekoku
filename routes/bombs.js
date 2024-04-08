const express = require("express");
const router = express.Router();
const bombs = require("../services/bombs");

router.get("/", async function (req, res, next) {
  try {
    res.json(await bombs.getMultiple(req.query.page));
  } catch (err) {
    console.error("Error while getting bombs ", err.message);
    next(err);
  }
});
module.exports = router;

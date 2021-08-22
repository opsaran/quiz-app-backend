const express = require("express");
const {
  getcreators,
  postquiz,
  gettopics,
  getrandomquiz,
  postnewuser,
  getusers,
} = require("../controllers/router_controllers");

const router = express.Router();
router.get("/", getcreators);
router.post("/", postquiz);
router.get("/topics", gettopics);
router.get("/randomquiz/:topic", getrandomquiz);
router.post("/newuser", postnewuser);
router.get("/usersample", getusers);
module.exports = router;

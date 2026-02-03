const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

router.get("/profile", authUserMiddleware, userController.getProfile);
router.put("/profile", authUserMiddleware, userController.updateProfile);
router.post("/follow/:partnerId", authUserMiddleware, userController.followPartner);
router.delete("/follow/:partnerId", authUserMiddleware, userController.unfollowPartner);

module.exports = router;

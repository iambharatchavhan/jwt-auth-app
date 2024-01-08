const express = require("express");

const { AddAdmin } = require("../database/index");
const { addAdminMiddleware } = require("../middleware/admin");
const bcrypt = require("bcrypt");
require('dotenv').config();
const router = express.Router();
const { secretToken } = require("../middleware/jwt");


// ------------------------------sing-up-----------------------------------------------------//


router.post("/create-admin", addAdminMiddleware, async (req, res) => {
  // getting inputs from user
  const { username, password, role } = req.body;

  try {
    // if admin already in database
    const admin = await AddAdmin.findOne({ username });
    if (admin) {
      res.status(500).json({ message: "user already exist" });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);

      // creating new admin
      await AddAdmin.create({
        username: username,
        password: hashedPassword,
        role: "admin",
      });
      res.json({ message: "new admin created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ------------------------------sing-up-----------------------------------------------------//



// ------------------------------sing-in-----------------------------------------------------//


router.post("/admin-sign-in", addAdminMiddleware, async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await AddAdmin.findOne({ username });
    if (!admin) {
      res.status(400).json({ message: "Invalid email" });
    }
    const verifyPassword = await bcrypt.compare(password, admin.password);
    if (!verifyPassword) {
      res.status(400).json({ message: "Invalid password" });
    }

    const token = secretToken(username);

    res.status(200).json({ token: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// ------------------------------sing-in-----------------------------------------------------//
router.get("/find-admins", addAdminMiddleware, async (req, res) => {
  try {
    const admins = await AddAdmin.find({});

    if (!admins) {
      res.status.json({ message: "admin are not found please add one" });
    }

    res.json({ admins });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

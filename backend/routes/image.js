const express = require("express");
const router = express.Router();
const path = require("path");
const { Image, User } = require("../db");
const multer = require("multer");
const { validateToken } = require("../services/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = validateToken(token);
  const userId = decoded.userId;

  const newImage = new Image({
    filename: req.file.filename,
    path: req.file.path,
    userId,
  });

  await newImage.save();

  res.json({ message: "Image uploaded successfully" });
});

router.get("/view", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = validateToken(token);
  const Id = decoded.userId;

  const userImages = await Image.find({ userId: Id });
  res.json(userImages);
});

module.exports = { uploadImgRouter: router };

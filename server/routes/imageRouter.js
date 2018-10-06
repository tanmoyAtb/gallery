const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var multer = require("multer");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./images/");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb("Only images please!!", false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	}
}).single("image");

router.post("/fileupload", (req, res) => {
	console.log("fileBB", req.file);
	console.log("bodyBB", req.body);
	upload(req, res, function(err) {
		if (err) {
			// A Multer error occurred when uploading.
			console.log("file", req.file);
			console.log("body", req.body);
			res.send(err);
		} else {
			console.log("file", req.file);
			console.log("body", req.body);
			res.send("success");
			// An unknown error occurred when uploading.
		}

		// Everything went fine.
	});
});

module.exports = router;

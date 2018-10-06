const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const settings = require("./settings/config");

mongoose.Promise = require("bluebird");
mongoose
	.connect(
		settings.dbUrl,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log("DB connected");
	})
	.catch(err => {
		console.error("DB not connected", err);
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept," +
			"X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	next();
});

app.use('/images', express.static('./images'));
const imageRouter = require("./routes/imageRouter");
app.use("/api/", imageRouter);

// front end conjunction
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`BigPrint listening on ${port}`));

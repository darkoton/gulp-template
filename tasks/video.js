const { src, dest } = require("gulp")

const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const newer = require("gulp-newer")
const webp = require("gulp-webp")

const video = function (cb) {
	src("./#src/video/**/*")

		.pipe(dest("./dist/video"))

	cb()
}
module.exports = video;
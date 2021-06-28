const router = require("express").Router();
module.exports = router;

router.use("/snacks", require("./snacks"));
router.use("/rating", require("./rating"));
router.use("/group", require("./group"));
router.use("/membership", require("./membership"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

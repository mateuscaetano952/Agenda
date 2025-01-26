exports.middlewareGlobal = (req, res, next) => {
    console.log("");
    console.log("Passei pelo middleware");
    console.log("");
    next();
};
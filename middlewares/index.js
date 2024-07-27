const fs = require("fs");

function logReqRes(filename){
    return (res,req,next)=>{
        fs.appendFile(
             filename,
            `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
            (err,data) => {
            next();
            }
          ); 
    }
}

module.exports = {
    logReqRes,
}
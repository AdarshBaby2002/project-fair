const ApplicationMiddleware=(req,res,next)=>{
    console.log("Application Middleware");
    next();
}
module.exports=ApplicationMiddleware
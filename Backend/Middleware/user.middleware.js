const jwt=require('jsonwebtoken')

 let authentication=(req,res,next)=>{
    let token=req.headers.authorization.split(' ')[1];
    
    if(token){
        let decoded=jwt.verify(token,'masai');
       // console.log(decoded)
        if(decoded.userID){
            req.body.userID=decoded.userID;
          //  console.log(req.body);
            next();
        }
        else{
            res.status(400).send({msg:"Please login !"})
        }
    }else{
        res.status(400).send({msg:"Please login !"});
    }
    
    
}

module.exports={authentication}
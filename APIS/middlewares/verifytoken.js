
const jwt=require("jsonwebtoken")

const checkToken=(req,res,next) =>
{
    let tokenWithBearer=req.headers.authorization;
    let token
    if(tokenWithBearer===undefined)
    {
        return res.send({message:"Unauthorized access"})
    }
    else
    {
        token=tokenWithBearer.split(" ")[1]
        jwt.verify(token,'abcdef',(err,decoded) =>
        {
            if(err)
            {
                return res.send({message:"Session expired...Login to continue"})
            }
            else
            {
                next()
            }
        })
    } 

}


module.exports=checkToken; 


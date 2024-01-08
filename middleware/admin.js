const {z} = require("zod")



const addAdminSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6),
})

const addAdminMiddleware = (req,res,next) =>{

    try {
        addAdminSchema.parse(req.body)
        next()
    } catch (error) {
        res.status(400).json({'message':'something wrong with the admin inputs'})
    }
}





module.exports = {addAdminMiddleware};
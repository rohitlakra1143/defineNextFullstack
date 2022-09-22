const User = require('../Models/testimonialUser');
const Counter = require('../Models/counter')
const logger = require('../utils/logger')

/*<-------------------------All Users ------------------------------>*/

const getUsers = async function (req, res) {
  
    let pageNumber = req.query.pageNumber;
    let pageSize = req.query.pageSize;
    try {
        if(pageNumber==='undefined' || pageSize ==='undefined') {
            pageNumber=1
            pageSize=10
        }
        let users = await User.find({ isActive: true })
         .skip((pageNumber - 1) * pageSize)//--->to skip all documents of pervious size
         .limit(pageSize)
        return res.status(200).json({success:true,data:{data:users,total:users.length}})
    } catch (e) {
        logger.log('error',`${e.message}`)
        return res.status(404).json({ success: false, message: `Error Fetching Data!` });
    }

}

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}
/*<-------------------------Creating------------------------------>*/

const createUser = async function (req, res) {
    console.log(req.body);
    logger.logger.log("info","Creating User........")
    try {
        let id = await getNextSequence("userId")
        
        const user = new User();
        
        user.testimonialId = id,
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.post = req.body.post;
        user.description = req.body.description;
        user.image = req.body.image;
        

        const usersaved = await user.save()
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: usersaved,
           });
    } catch (e) {
        logger.logger.log("error",e.message)
        return res.status(500).json({ message: "Internal Server Error", success: false,error:e.message });
    }
}

/*<-------------------------Updating------------------------------>*/
const updateUser = async function (req, res) {
    try {
        const user = await User.findOne({ testimonialId: req.params.id });
        if (user) {

            user.set({
                name: req.body.name,
                lastname: req.body.lastname,
                post: req.body.post,
                description: req.body.description,
                image: req.body.image,

            });
            const updateUser = await user.save();
            return res.status(200).json({
                success: true,
                message: 'User Updated successfully',
                user: updateUser,
               });
        } else {
            throw new Error("No Such User");
        }

    } catch (e) {

        logger.logger.log("error",e.message)

        return res.json({ success: false, message:'Error Updating User',error:e.message })
    }
}

/*<-------------------------deleting------------------------------>*/
const deleteUser = async function (req, res) {
    try {
        const isUser = await User.findOne({ testimonialId: req.params.id });

        
        if (isUser) {
            
            if(isUser.isActive===false)  throw new Error("Invalid User");

            isUser.set({ isActive: false });
            const result = await isUser.save();
            console.log(result)
            return res.status(200).json({ success: true, user: result,message:'User Deleted successfully' });

        } else {
            throw new Error("Invalid User");
        }

    } catch (e) {
        logger.logger.log("error",e.message)

        return res.status(404).json({ message:"Invalid User Details", success: false,error:e.message });
    }

}

async function getNextSequence(name) {
    try {
        let seqId;
        var seqNo = await Counter.findOneAndUpdate(
            { id: name },
            { $inc: { seq: 1 } },
            { new: true });

        if (seqNo == null) {
            const newVal = new Counter({ id: "userId", seq: 1 })
            await newVal.save()
            seqId = 1
        } else {
            seqId = seqNo.seq;
        }
        return seqId

    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
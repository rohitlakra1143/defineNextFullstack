const User = require('../Models/testimonialUser');
const Counter = require('../Models/counter')

/*<-------------------------All Users ------------------------------>*/

const getUsers = async function (req, res) {
    //console.log("Hiiii",req.query)
    // let name=req.query.name;
    // console.log(name);
    const pageNumber = 2;
    const pageSize = 10;
    try {

        // let users=await User.find(req.query);
        // return res.json(users);

        // if (req.query.name !== undefined) {
        //     console.log("Inside Query filter :-", req.query);
        let users = await User.find({ isActive: true })
        // .sort({ name: 1 })
        // .select({ name: 1, lastname: 1, email: 1, phoneNumber: 1, age: 1 });
        console.log("Hiiii", users)
        return res.json(users)
        //  }
        if (isEmpty(req.query)) {
            console.log("INto Else ")
            console.log(req.query)
            const pageNumber = 2;
            const pageSize = 10;
            let users = await User

                .find()
                /*-----------------------------------------------Pagination------------------------ */
                .skip((pageNumber - 1) * pageSize)//--->to skip all documents of pervious size
                .limit(pageSize)

                .sort({ name: -1 })
            //.select({ name: 1, lastname: 1 ,email:1,phoneNumber:1,age:1});
            console.log((pageNumber - 1) * pageSize)
            return res.json(users)
        } else {
            return res.status(500).json({ status: 500, message: 'Invalid Data' });
        }


    } catch (e) {
        return res.json({ success: false, message: `${e}` });
    }

}

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}
/*<-------------------------Creating------------------------------>*/

const createUser = async function (req, res) {
    console.log(req.body);
    console.log("Creating User........")
    try {
        let id = await getNextSequence("userId")
        console.log("Id ", id)
        const user = new User();
        
        user.testimonialId = id,
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.post = req.body.post;
        user.description = req.body.description;
        user.image = req.body.image;
        

        const usersaved = await user.save()
        return res.json(usersaved)
        // .then((result)=>{
        //     console.log('User created.....')
        //     return res.json(result);})
        // .catch(err=>{
        //     console.log("error creating.....")
        //     return res.json({err:err.message,success:false})});
    } catch (e) {
        return res.status(500).json({ error: e.message, success: false });
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
            const result = await user.save();
            console.log(result)
            return res.json({ success: true, user: result });
        } else {
            throw new Error("No Such User");
        }

    } catch (e) {
        return res.json({ success: false, Error: e.message })
    }
}

/*<-------------------------deleting------------------------------>*/
const deleteUser = async function (req, res) {
    console.log("Hiiiii......", req.params.id);
    try {
        const isUser = await User.findOne({ testimonialId: req.params.id });

        if (isUser) {
            console.log("Hiiiii...22222...Inside ", isUser);
            isUser.set({ isActive: false });
            const result = await isUser.save();
            console.log(result)
            return res.json({ success: true, user: result });

            // deleteOne({ name: req.params.name })
            //    .then(() => { return res.json({ success: 'true', message: `User deleted` }) })

        } else {
            throw new Error("Invalid User");
        }

    } catch (e) {
        return res.status(404).json({ err: e.message, success: false });
    }

}

async function getNextSequence(name) {
    try {
        let seqId;
        var seqNo = await Counter.findOneAndUpdate(
            { id: name },
            { $inc: { seq: 1 } },
            { new: true });
        // .then(async (err,val)=>{

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
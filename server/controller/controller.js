var Userdb = require('../model/model.js');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message:"content cannot be empty ! "});
        return;
    }

    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data =>{
            // res.send(data)
            res.redirect('/add_user');
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Some error occurred while creating a create operation"
            });
    });
}

// retrieve and return all/single user/users
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message:`not found user with id ${id}`})
                }else{
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message:"Error retreiving user with id "+id})
            })
    }else{
            Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({message:err.message || "Error occured while retriving the collection"})
            })
    }
}

// Update a user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data => {
        if(!data){
            res.status(404).send({message:`Cannot Update user whith ${id}. Maybe user not found`})
        }
        else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message:"Error Update user information"})
    })
}

// Delete a user with specified user id
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message:`cannot delete with ${id}. Maybe id is wrong`});
        }else{
            res.send({
                message:"User was deleted succedfully!!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete User with id = "+id
        });
    });
}
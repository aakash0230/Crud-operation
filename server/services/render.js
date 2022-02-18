const axios = require("axios");

exports.homeRoutes = (req, res) => {
    // make a get request to api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            console.log(response.data)
            res.render("index",{users:response.data});
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_user = (req, res) => {
    res.render("add_user");
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
        .then(function(userdata){
            console.log("This is user Data \n");
            console.log(userdata);
            console.log("This is userdata.data \n");
            console.log(userdata.data);
            res.render("update_user",{user:userdata.data})
        })
        .catch(err => {
            res.send(err);
        })
}
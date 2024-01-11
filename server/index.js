const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://nipa:243778800@cluster0.cji7cyo.mongodb.net/?retryWrites=true&w=majority')

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
})
const AdminModel = mongoose.model("admins",AdminSchema)


app.post("/login", (req, res) => {
    const { username, password } = req.body;
    AdminModel.findOne({ username: username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
                }
            } else {
                res.json("No record existed")
            }
        })
})


app.listen(3001, () => {
    console.log("server is running")
})
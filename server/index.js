const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./model/Todo')
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0:27017/todo")
    .then(console.log("Database is Connected"))
    .catch(err => console.log(err))

app.get('/', async (req, res) => {
    try {
        const data = await Todo.find()
        res.json(data);
    } catch (error) {
        console.log(error);
    }
})

app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const up = await Todo.findByIdAndUpdate({ _id: id }, { complete: true })
        res.json(up)
    } catch (error) {
        console.log(error);
    }
})

app.post("/add", async (req, res) => {
    try {
        const { name, description } = req.body;
        const data = await Todo.create({
            name: name,
            description: description
        })
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/delete/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const del = await Todo.findOneAndDelete({_id: id})
        res.json(del)
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
})
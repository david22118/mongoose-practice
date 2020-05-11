// Server setup
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/computerDB', { useNewUrlParser: true })

const Schema = mongoose.Schema

const computerSchema = new Schema({
    maker: String,
  price: Number
})

const Computer = mongoose.model('computers', computerSchema)


let p1 = new Computer({ maker: "dell", price: 25 }) 
let p2 = new Computer({ maker: "aplle", price: 25 }) 
let p3 = new Computer({ maker: "hp", price: 25 }) 
let p4 = new Computer({ maker: "microsoft", price: 25 }) 
const computers = [p1,p2,p3,p4]
/* computers.forEach(c=>c.save()) */



//Routes
app.put('/computers/:id',function(req,res){
    const id = req.params.id
    Computer.findByIdAndUpdate(id, { price: 70 }, function (err, computer) {
        console.log(computer)
        computer.save()
    })

})
app.delete("/apocalypse",function(req,res){
    console.log("kill")

    Computer.deleteMany(function (err) {
         
    })

res.end()
})

app.post('/computers',function(req,res){
const comp = req.body

let  p  = new Computer({maker:comp.maker, price:comp.price})
 p.save()
})
app.get('/computers', function (req, res) {
    Computer.find({}, function (err, computers) {
        res.send(computers)
    })
})

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})
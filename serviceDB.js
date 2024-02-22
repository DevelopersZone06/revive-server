require("dotenv").config(); 
const connectDB = require("./connect"); 
const Service = require("./models/services"); 
const ServiceJson = require('./services.json')

const start = async () => {
    try{
        await connectDB(process.env.Place_your_API_here)
        await Service.create(ServiceJson)
        console.log("success")
    }
    catch (error) {
        console.log(error)
    }
}

start()
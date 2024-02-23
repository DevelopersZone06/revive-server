require("dotenv").config(); 
const connectDB = require("./connect"); 
const Service = require("./models/services"); 
const ServiceJson = require('./services.json')
import uri from "./index"

const start = async () => {
    try{
        await connectDB(uri)
        await Service.create(ServiceJson)
        console.log("success")
    }
    catch (error) {
        console.log(error)
    }
}

start()
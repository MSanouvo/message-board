const { Router } = require("express")
const controller = require("../controllers/controllers")

const index = Router()

index.get("/", controller.messageList)
index.get("/new", controller.newMessage) 
index.post("/new", controller.postMessage)
index.get("/message/:id", controller.getMessage)


module.exports = index
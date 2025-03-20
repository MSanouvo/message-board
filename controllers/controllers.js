const { render } = require("ejs")
const db = require("../db/queries")

const links = [
    { href: "/", text: "Home" },
    { href: "new", text: "New Message"}
]

async function messageList(req, res) {
    const messages = await db.getDatabase()
    res.render("index", {
        links: links,
        messages: messages
    })
}

function newMessage(req, res) {
    res.render("form", { links: links})
}

async function postMessage(req, res) {
    const message  = req.body
    console.log("posting: "+message.message)
    console.log("posted by: "+message.user)
    await db.addMessage(message.message, message.user)
    res.redirect("/")
}

async function getMessage(req, res) {
    const messages = await db.getDatabase()
    const id = parseInt(req.params.id)
    if(id >=0 && id <= messages.length){
        res.render('msg', {
            message: messages[id], 
            links: links
        }) 
    } else {
        res.status(404).send("Message not found")
    }
}

module.exports = {
    messageList,
    newMessage,
    postMessage,
    getMessage
}
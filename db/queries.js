const pool = require("./pool")

async function getDatabase() {
    const { rows } = await pool.query("SELECT * FROM messages")
    console.log(rows)
    return rows
}

async function addMessage(message, user) {
    await pool.query("INSERT INTO messages (message, author) VALUES ($1, $2)", [message, user]);
  }

async function deleteMessage(message) {
    await pool.query("DELETE FROM messages WHERE message = $1", [message])
}

async function updateMessage(oldMessage, newMessage) {
    // const oldMessage = await pool.query("SELECT message FROM messages WHERE message = $1", [message])
    await pool.query("UPDATE messages SET message = $1 WHERE message = $2", [newMessage, oldMessage])
}

module.exports = {
    getDatabase,
    addMessage,
    deleteMessage,
    updateMessage
}
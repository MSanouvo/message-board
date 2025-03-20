const { Client } = require("pg")
require("dotenv").config()

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR ( 255 )
);

INSERT INTO messages (message)
VALUES
    ('Welcome to the message board !');
`

const addColumns = `
ALTER TABLE messages
ADD author VARCHAR (255),
ADD date TIMESTAMP NOT NULL DEFAULT NOW();
`

async function main() {
    console.log("seeding...")
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING
    })
    await client.connect()
    await client.query(addColumns)
    await client.end()
    console.log('done')
}

main()
const { Pool } = require('pg')
const { get } = require('http')
// pools will use environment variables
// for connection information
const pool = new Pool()

console.log("Start...")

const getTime = async () => {
    // you can also use async/await
    const res = await pool.query('SELECT NOW()')
    console.log(res)
    await pool.end()
}

getTime()

setInterval(() => {
    console.log("Hello world")
}, 5000)

console.log("End...")
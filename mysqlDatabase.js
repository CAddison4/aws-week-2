import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
})
.promise()

//Get Notes (Details)
export async function getNotes() {
    const query = `
    SELECT * 
    FROM notes
    `
    const [rows] = await pool.query(query)
    return rows
    
}

//Create Note
export async function addNote(title, contents) {
    const query = `
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `

    await pool.query(query, [title, contents])
}

//Delete Note
export async function deleteNote(id) {
    const query = `
    DELETE FROM notes
    WHERE id = ?
    `
    await pool.query(query, [id])
}
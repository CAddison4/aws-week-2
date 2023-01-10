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

    try{
        const [rows] = await pool.query(query)
        return rows
    } catch(error) {
        console.log("error", error)
        return []
    }
    
    
}

//Create Note
export async function addNote(title, content) {
    const query = `
    INSERT INTO notes (title, content)
    VALUES (?, ?)
    `

    await pool.query(query, [title, content])
}

//Delete Note
export async function deleteNote(id) {
    const query = `
    DELETE FROM notes
    WHERE id = ?
    `
    await pool.query(query, [id])
}
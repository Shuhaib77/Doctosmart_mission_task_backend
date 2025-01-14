import express from "express";
import cors from "cors"
import { connect_db } from "./config/db_connection.js";
import user_routes from "./Routes/user_route.js";


const app=express()

app.use(express.json())
app.use(cors())
app.use("/api",user_routes)

connect_db()
export default app


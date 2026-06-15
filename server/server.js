import express from "express";
import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";



// create express app anf HTTP server
const app = express();
const server = http.createServer(app)

//initilize socket.io server
export const io = new Server(server,{
    cors:{origin:"*"}
})

// store online users
export const userSocketMap={};//{userId:socketId}

// Socket.io Connection handler
io.on("connection",(socket)=>{
    const userId= socket.handshake.query.userId;
    console.log("User Connected",userId);

    if(userId) userSocketMap[userId]=socket.id;
    //Emit online user to all connected clients

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("User Disconnected",userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })


})

//middleware setup
app.use(express.json({limit:"20mb"}));
app.use(cors());


//Routes setup
app.use("/api/status",(req,res)=>res.send("server is live"));
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);

//connect to mongodb
await connectDB();

const PORT =process.env.PORT || 5000;
server.listen(PORT,()=>console.log(`server is running on ${PORT}`)
);

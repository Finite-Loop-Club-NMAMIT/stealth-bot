import express from 'express';
const app=express();
import {config} from 'dotenv';
config();

app.get("*",(req,res)=>{
    res.send('<h1 style="color:blue;">Discord BOT is live</h1>');
})

app.listen(80,()=>{
    console.log('Server is running on port 80');
})
import express from 'express';
import fs from 'fs';
const app = express();
import cors from 'cors'

app.use(cors())

app.use(express.json()) // its a middleware 

const dbData = fs.readFileSync('./data.json' , 'utf-8');
const output = {
    data:"",
    status:"",
    message:"",
};

const data = JSON.parse(dbData);


app.get('/api/v1/weather',(req , res)=>{
    let city = req.query.location;
    const userAskedData = data.find((element)=>element.name.toLowerCase()===city.toLowerCase())
    if(userAskedData){
        output.data=userAskedData;
        output.status="200 Ok";
        output.message="Success"
    }

    else{
        output.data="NULL";
        output.status="404 Error";
        output.message="Fail"
    }
    res.json(output);
    res.end();
});

app.get('*',(req , res)=>{
    res.send("Wrong url");
});

const port = 5500;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})
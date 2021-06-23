// importing express module
const exp=require('express')

//importing mongodb and MongoClient
const mc=require("mongodb").MongoClient;

// assiging express module to app
const app=exp();

const path=require("path")

app.use(exp.static(path.join(__dirname,'./dist/CONNECTION/')))

const databaseUrl="mongodb+srv://soumith:soumith123@cluster0.vlkyk.mongodb.net/MyFirstdb?retryWrites=true&w=majority"

// const databaseUrl="mongodb://soumith:soumith123@cluster0-shard-00-00.vlkyk.mongodb.net:27017,cluster0-shard-00-01.vlkyk.mongodb.net:27017,cluster0-shard-00-02.vlkyk.mongodb.net:27017/MyFirstdb?ssl=true&replicaSet=atlas-14ai65-shard-0&authSource=admin&retryWrites=true&w=majority"

// connecting to databse
mc.connect(databaseUrl,{ useNewUrlParser:true, useUnifiedTopology: true },(err,client)=>
{
    if(err)
    {
        console.log("Error in connecting database is", err)
    }
    else
    {
        let databaseObj=client.db("MyFirstdb")

        let userCollectionObj=databaseObj.collection("empCollection")
        app.set("userCollectionObj", userCollectionObj)

        let productCollectionObj=databaseObj.collection("productCollection")
        app.set("productCollectionObj", productCollectionObj)

        console.log("Connected to empCollection database")
        console.log("connected to productCollection database")
    }
})

app.use(exp.json())

// importing apis 
const userApi=require("./APIS/user-api")
const productApi=require("./APIS/products-api")


// executing specific api based on path
app.use("/user",userApi)
app.use("/product",productApi)

userApi.use(exp.json());


// Handling errors when path is not found
app.use((req,res,next) =>
{
    res.send({message:`path ${req.url} is not found...`})
})


// Handling errors
app.use((err,rew,res,next) =>
{
    res.send({message:`${err.message}`})
})




// creating port
const port=3000;

app.listen(port, () => console.log(`server listening on port ${port}...` ))


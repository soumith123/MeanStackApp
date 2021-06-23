// importing express module
const exp=require("express")

// importing router from express module
const productApi=exp.Router();

// middle wear -- useful for post product
productApi.use(exp.json());

// to handle asynchronous error
const errorHandler=require("express-async-handler");

// importing cloudinary modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

cloudinary.config(
{
    cloud_name:'dwrklstdn',
    api_key:'729253834835715',
    api_secret:'Hvxr2kikdEfsLxVbY1VNkcx5yeQ'
})


const clsStorage=new CloudinaryStorage(
{
    cloudinary:cloudinary,
    params:async(req,file)=>
    {
        return{
            folder:"Products",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})

const multerObj=multer({storage:clsStorage})


// GET products
productApi.get("/getproducts", errorHandler(async (req,res) =>
{
    let productCollectionObj=req.app.get("productCollectionObj")
    let productsList= await productCollectionObj.find().toArray();
    if(productsList === null)
    {
        res.send({message:"Products list is empty"})
    }
    else
    {
        res.send({message:productsList})
    }
    
}))


// GET product by productName
productApi.get("/getproduct/:productName", errorHandler(async(req,res) =>
{
    let product=req.params.productName;
    let productObj= await productCollectionObj.findOne({productName : product})
    if (productObj == null)
    {
        res.send({message:"product is not exist"})
    }
    else
    {
        res.send({message:productObj})
    }

}))


// POST a product
productApi.post("/createproduct", multerObj.single("photo"),errorHandler(async(req,res) =>
{
    let productCollectionObj=req.app.get("productCollectionObj")

    let newProduct=JSON.parse(req.body.productObj);

    let product=await productCollectionObj.findOne({productName : newProduct.productName})
    
    if(product===null)
    {
        newProduct.productImage=req.file.path;
        delete newProduct.photo;
        await productCollectionObj.insertOne(newProduct)
        res.send({message:"New product created"})
    }
    else
    {
        res.send({message:"product already existed"})
    }
}))


// PUT product
productApi.put("/updateproduct/:productName", errorHandler(async(req,res) =>
{
    let updatedProduct=req.body;
    let product=await productCollectionObj.findOne({productName:updatedProduct.productName})
    if(product === null)
    {
        res.send({message:"No product to modify"})
    }
    else
    {
        await productCollectionObj.updateOne({productName:updatedProduct.productName},
            {$set:{...updatedProduct}})
        res.send({message:"Product updated"})
    }
}))



// DELETE product
productApi.delete("/deleteproduct/:productName", errorHandler(async(req,res) =>
{
    let deletedProduct=req.params.productName;
    let product= await productCollectionObj.findOne({productName:deletedProduct})
    if (product === null)
    {
        res.send({message:"No product existed to delete"})
    }
    else
    {
        await productCollectionObj.deleteOne({productName:deletedProduct})
        res.send({message:"Product deleted"})
    }
}))


// exporting productApi to index.js
module.exports=productApi;
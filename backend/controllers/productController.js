const Product = require("../models/productModels");
const errorHandler = require("../utils/errorhandler");


//creating products
exports.createProduct = async (req, res,next) => {

   const product = await Product.create(req.body); 
   //console.log(req.body);
   res.status(200).json({
     success: true,
     product,
   });
 };
 

//get all products

exports.getAllProducts = async (req,res,next) =>{

   const products = await Product.find(); 
   res.status(200).json({
    success: true,
    products,
  });

}

//get product details


exports.getProductDetails = async(req,res,next) =>{
  
  let product = await Product.findById(req.params.id);
  //const productsCount = 10;
  if(!product)
  {
    return next(new errorHandler("product not found",404))
  }

  res.status(200).json({
    success: true,
    product,
  });

}

//update products

exports.updateProduct = async (req,res,next) =>{

  let product = await Product.findById(req.params.id);
  
  
  if(!product)
  {
    return res.status(500).json({
        success:false,
        message:"product not found"
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
   
    new:true,
    runValidators:true,
    useFindandModify:false
  })

  
  res.status(200).json({
   success: true,
   product,
 });

}


//delete product

exports.deleteProduct = async (req,res,next) =>{

  let product = await Product.findById(req.params.id);
   
  if(!product)
  {
    return res.status(500).json({
        success:false,
        message:"product not found"
    })
  }

  await product.remove();
  
  res.status(200).json({
    success: true,
    message:"product deleted successfully",
  });
 

}

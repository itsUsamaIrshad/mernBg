import mongoose from "mongoose";




const transactionSchema = new mongoose.Schema({

    clerkId: {type: String , required:true},
    plan:{ type:String, required:true},
    amount:{ type:Number , required:true},
    credits:{ type:String , required:true},
    payment:{ type:Boolean ,  required:true},
    date:{type:Number}

})


const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema)

export default transactionModel;
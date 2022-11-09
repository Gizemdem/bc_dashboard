import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    globalID:String,
    name:String,
    type:String,
    status:{
        type:String,
        enum:['On Process', 'Completed', 'On Inspection', 'Payed'],
        default:'On Process'
    },
    dateETC:Date,
    dateOnProcess:Date,
    dateCompleted:Date,
    dateInspection:Date,
    datePayed:Date,    
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
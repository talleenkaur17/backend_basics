const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
app.listen(3000);
/**let users=[
    {
        'id':1,
        'name':"Abhishek"

    },
    {
        'id':2,
        'name':"Jasbir"
    },
    {
        'id':3,
        'name':"Karthik"
    }
];**/
const userRouter=express.Router();
const authRouter=express.Router();
app.use('/user',userRouter);
app.use('/auth', authRouter);

userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)
userRouter
.route("/:id").get(getUserById);
authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp);


async function getUsers(req,res){
    let allUsers=await userModel.findOne({name:'Abhishek'});
    
    res.json({message:'list of all users',
    data:allUsers});
    
}
function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
};
function updateUser(req,res){
    console.log('req.body->',req.body);
    let dataToBeupdated=req.body;
    for(key in dataToBeupdated){
        users[key]=dataToBeupdated[key];
    }

    
    res.json({
        message:"data updated successfully"
        
    });
};
function deleteUser(req,res){
    users={};
    res.json({
        message:"data has been deleted"
    });
}
function getUserById(req,res){

   
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"req recieved",
        data:obj
    });
   

};
function middleware1(req,res,next){
    console.log('middleware1 encountered');
    next();

};
function middleware2(req,res){
    console.log('middleware2  encountered');
    //next();
    console.log("middlewarre 2 ended req/res cycle");
    res.sendFile('/public/index.html',{root:__dirname});

};
function getSignUp(req,res,next){
   

    console.log("getSignUp called");
    next();
    
    //res.sendFile('/public/index.html',{root:__dirname});
};
async function postSignUp(req,res){
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    console.log('backend',user);
    res.json({
        message:"user signed up",
        data:user

    });
    

}
const db_link='mongodb+srv://admin:05hswBtz6FwBBFSq@cluster0.w5tqwal.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
console.log('db connected');
})
.catch(function(err){
    console.log(err);

})
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }

})
const userModel=mongoose.model('userModel',userSchema);

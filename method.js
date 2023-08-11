const express=require('express');
const app=express();
app.use(express.json());
app.listen(3000);
let users=[
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
];
const userRouter=express.Router();
const authRouter=express.Router();
app.use('/user',userRouter);
app.use('/auth', authRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)
userRouter
.route("/:id").get(getUserById);
authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp);






function getUser(req,res){
    res.send(users);
    
};
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
function getSignUp(req,res){
    res.sendFile('/public/index.html',{root:__dirname});

};
function postSignUp(req,res){
    let obj=req.body;
    res.json({
        message:"user signed up",
        data:obj

    });
    

}
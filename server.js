const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    console.log("request has been made from browser to server");
    res.setHeader('Content-type','text/html');

   fs.readFile('index.html',(err,fileData)=>{
    if(err){
        console.log(err);
    }
    else{
       
        res.end(fileData);
    }
   }
   )
   

   
   
});
server.listen(3000,'localhost',()=>{
console.log("Server is listening on port 3000");


});
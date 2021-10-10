const http = require("http");
const fs = require("fs");



let startserver=()=>{
    const server = http.createServer((req,res)=>{
        //to create date-time.txt files
      if(req.url==="/createfiles" && req.method==="GET")
      {
          let date = new Date();
          let time = date.toTimeString();

          fs.writeFile(`./Timefiles/${date.toDateString().split(" ").join("-")+"--"+date.getTime()}.txt`
          ,time,(err)=>{
              if(err)
              {
                  return console.log(err);
              }
              res.end(`${date.toDateString().split(" ").join("-")+"--"+date.getTime()}.txt is created`);
          })
      }

      //to get date-time.txt files
      if(req.url==="/getfiles"&&req.method==="GET")
      {
        
      
          fs.readdir("./Timefiles", async(err,files)=>{
              if(err)
              {
                  return console.log(err);
              }
              res.end(files.toString())

              //if used this will retrive all textfile with its content in object (key:value pair)
              //to use this you have to remove the above res.end(files.tostring()); 
              /*
              let fileobj ={};
              for(let file of files )
              {
                fs.readFile(`./Timefiles/${file}`,"utf8",(err,data)=>{
                    if(err)
                    {
                        return console.log(err);
                    }
                    fileobj[file] = data;
                    //this will send responce once all data is stored in object
                    if(files[files.length-1]=== file)
                    {
                        res.end(JSON.stringify(fileobj));
                       
                    }
                })
              }
                 */
            
          })
         
      }
 
    })
    
    server.listen(3001,()=>{console.log("server started");});
}


//this will create folder if doesnt exists and then start the server
if(!fs.existsSync("Timefiles"))
{
   fs.mkdir("Timefiles",(err)=>{
       console.log("created");
       if(err)
       {
           console.log(err);
       }
       startserver();
   })
}
else
{
    startserver();
}
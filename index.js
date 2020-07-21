const app = require("express")();
const appid = process.env.APPID;

app.get("/", (req,res) => 
res.send(`appid: ${appid} home page: says FRB federal reserve bank !`))

app.get("/app1", (req,res) => 
res.send(`appid: ${appid} app1 page: says says FRB federal reserve bank !`))
 
app.get("/app2", (req,res) => 
res.send(`appid: ${appid} app2 page: says FRB federal reserve bank !`))
 
app.get("/admin", (req,res) => 
res.send(`appid: ${appid} ADMIN page: very few people should see this`))
 
app.listen(appid, ()=>console.log(`${appid} is listening on ${appid}`))

 const kExpress = require("./kExpress");

 const app = kExpress();

 app.get('/', (req, res) => {
     res.end("hello worlds");
 })

 app.get("/users", (req, res) => {
     res.end(JSON.stringify({ name: 'liBing' }))
 })
 app.listen(3000, () => {
     console.log("kExpress is listening 3000")
 })
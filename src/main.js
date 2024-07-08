import { web } from "./application/web.js";

const port =  process.env.PORT
web.listen(port, ()=>{
    console.log('running')
})
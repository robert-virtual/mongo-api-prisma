import express  from "express"
import cors  from "cors"
import moviesRouter from "./routes/movies"
const app = express()
const port = process.env.PORT || 3000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


//routes
app.use("/movies",moviesRouter)

app.listen(port,function(){
  console.log(`server listening on http://localhost:${port}`)
})

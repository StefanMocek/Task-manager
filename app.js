const express = require("express")
require("dotenv").config()
const tasks = require("./routes/tasks")
const connectDB = require("./db/connection.js")
const notFound = require("./middleware/not-found")

const app = express()

// app.use(express.static("./public"))
app.get("/", (req,res)=>{
    res.json({"INFO":"It is just my backend John Smilgas Task Manager project"})
})

app.use(express.json())

app.use("/api/v1/tasks", tasks)

app.use(notFound)




const starter = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        const listener = app.listen(process.env.PORT || 3000, () => {
            console.log("Your app is listening on port " + listener.address().port)
        })
    } catch (error) {
        console.log(error)
    }
}

starter()

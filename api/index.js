import express from "express";
const app = express()
import cors from "cors"
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import likeRoutes from "./routes/likeRoutes.js"
import relationshipRoutes from "./routes/relationshipRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import storyRoutes from "./routes/storyRoutes.js"

const port = 8800

//middleware
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + file.originalname)
    }
})
  
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req,res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/relationships", relationshipRoutes)
app.use("/api/stories", storyRoutes)

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})
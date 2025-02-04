import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {register} from"./controllers/auth.js";
import {createPost} from"./controllers/posts.js";
import authRoutes from "./routes/authRoutes.js"
import usersRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import User from "./models/userModel.js"
import Post from "./models/postModels.js";
import {users,posts} from "./data/index.js"
import { verifyToken } from "./middleware/auth.js";

//config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/public/assets")))


//storage
const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "/public/assets")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"),verifyToken, register)
app.post("/posts",upload.single("picture"),verifyToken,createPost)

app.use("/auth",authRoutes)
app.use("/users", usersRoutes)
app.use("/posts",postRoutes)

// mongoose setup

const Port  =  process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
app.listen(Port, ()=>console.log(`server port:${Port}`))
// User.insertMany(users);
 //Post.insertMany(posts);
}).catch((error)=>console.log(`${error}`))
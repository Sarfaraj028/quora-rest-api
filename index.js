import express from 'express';
import path, {dirname} from 'path'
import { v4 as uuidv4 } from 'uuid';
import methodOverride from 'method-override';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const app = express()
// app.use(express.static(path.join(__dirname, "public")))
app.use(express.static("public"))
app.set("view engine", "ejs")

//middlewares to read any data fromated file
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.send("Home page")
})

//posts data
let posts = [
    {
        id: uuidv4(),
        username: "sarfaraj",
        content: "I have to work hard to achieve my goals."
    },
    {
        id: uuidv4(),
        username: "salman",
        content: "exploring people behaviour.."
    },
    {
        id: uuidv4(),
        username: "ekhlaq",
        content: "I am driving right now, can not connect sorry."
    },
]


//getting posts data
app.get('/posts', (req, res) =>{
    res.render("index", {posts})
})

//route for a form that will take in posts data 
app.get('/posts/new', (req, res) =>{
    res.render("new")
})

//route to posts data
app.post('/posts', (req, res) =>{
    const {username, content} = req.body
    const id = uuidv4()
    posts.push({id, username, content})

    //redirect to the all post page
    res.redirect("/posts") //here get method is default so it will reach get("posts") not post('posts')
})

//see specific user content by id 
app.get('/posts/:id', (req, res) =>{
    const {id} = req.params
    const post = posts.find((p)=> id === p.id)
    console.log(post); 
    
    res.render("show", {post})
})

//edit post 1.1
app.patch('/posts/:id', (req, res) =>{
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p)=> id === p.id)
    post.content = newContent 
    console.log(post);
    res.redirect("/posts")
})

//edit post 1.2
app.get('/posts/:id/edit', (req, res) =>{
    const {id} = req.params
    let post = posts.find((p)=> id === p.id)
    console.log(post);
    res.render("edit", {post})
})

app.listen(3000, () =>{
    console.log("Server is listening on the port 3000");
    
})
import express from "express";
import http from 'http';
import 'dotenv/config';
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import passport from "passport";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
import session from "express-session";
import {Server} from "socket.io";
import instamojo from "./routes/instamojo.js";
import sendEmail from"../Backend/utils/sendEmail.js"
import crypto from "crypto"
import moment from "moment-timezone"

const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})



db.connect();
const port = process.env.PORT;
const app = express();


const server = http.createServer(app);



app.use(express.json());        //to get data through json
app.use(express.urlencoded({ extended: "true" }));     //to get data through url
app.use(express.static("public"));
app.use(passport.initialize());     //initializing passport
app.use(cors());
app.use("/api",instamojo);
const io = new Server(server,{ cors: {origin: ["http://localhost:5173"],} });
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));
//Routes



//Register

app.post("/send_mail", async(req,res)=>{
    try {
        console.log(req.body);
        const token=crypto.randomBytes(32).toString("hex");
        // const url=`${process.env.BASE_URL}/${token}`
        await sendEmail(req.body.email, "Canteen Fresh Email Verification" , "hi test email");
        res.status(200).send({message:"An Email was Sent to your account please verify"});

    } catch (error) {
        res.send({message:"mail not sent"});
    }
   
});

app.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        bcrypt.hash(data.password, 10, async (err, hash) => {      //user password is encrypted
            if (err) {
                console.error("Error hasing password !", err);
            }
            else {
                const token=crypto.randomBytes(32).toString("hex");
                const response = await db.query("INSERT INTO users(enroll_id, first_name, last_name, email, password, ismerchant, verified, token) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                    [data.enroll_id.toUpperCase(), data.first_name.toLowerCase(), data.last_name.toLowerCase(), data.email, hash, false,false,token]);
                    
                    const url=`http://localhost:3000/verify_user?id=${data.enroll_id.toUpperCase()}&token=${token}`
                    await sendEmail(req.body.email, "Canteen Fresh Email Verification" , `Hi, Welcome to Canteen Fresh, Follow the link to verify your email account- ${url}`);
                    res.send({message:"An email was sent to your Account, please Verify"});
                // res.json(response.rows[0]);
            }
        });

    } catch (err) { 
        res.json(err.message);
    }
});

app.get("/verify_user", async(req,res)=>{
    try {
        const result=await db.query("SELECT * FROM users WHERE enroll_id = $1",[req.query.id]);
        const user=result.rows[0];
        console.log(user);
        if(result.rows.length === 0)
        {
            res.redirect("http://localhost:5173/email_verify_failed")
        }
        else{
            if(req.query.token === user.token)
            {
                await db.query("UPDATE users SET verified=$1, token=$2 WHERE enroll_id=$3",[true, "", req.query.id]);
                res.redirect("http://localhost:5173/email_verify_success");
            }
            else{

                res.redirect("http://localhost:5173/email_verify_failed")
            }
        }
    } catch (error) {
        console.error(error);
    }
   
})

app.post("/updateUser",async(req,res)=>{
    try {
        console.log(req.body);
        const data = req.body;
        bcrypt.hash(data.password, 10, async (err, hash) => {      //user password is encrypted
            if (err) {
                console.error("Error hasing password !", err);
            }
            else {
                const token=crypto.randomBytes(32).toString("hex");
                const response = await db.query("UPDATE users SET enroll_id=$1, first_name=$2, last_name=$3, email=$4, password=$5, ismerchant=$6, verified=$7, token=$8 WHERE enroll_id=$9 RETURNING *",
                    [data.enroll_id.toUpperCase(), data.first_name.toLowerCase(), data.last_name.toLowerCase(), data.email, hash, false,false,token,data.enroll_id.toUpperCase()]);
                    
                    const url=`http://localhost:3000/verify_user?id=${data.enroll_id.toUpperCase()}&token=${token}`
                    await sendEmail(req.body.email, "Canteen Fresh Email Verification" , url);
                    res.send({message:"An email was sent to your Account, please Verify"});
                // res.json(response.rows[0]);
            }
        });

    } catch (err) { 
        res.json(err.message);
    }
})

//Login
app.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const result = await db.query("SELECT * FROM users WHERE enroll_id = $1", [data.enroll_id.toUpperCase()]);
        if (result.rows.length > 0) {
            if(result.rows[0].verified === true)
            {
                const savedHash = result.rows[0].password;
            const currPassword = data.password;
            bcrypt.compare(currPassword, savedHash, (err, result) => {
                if (err) {
                    res.json(err.message);
                } else if (result) {
                    // here we will send jwt tokken to the browser!!!
                    const payload = {
                        enroll_id: data.enroll_id.toUpperCase(),
                        type: "user"
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
                    return res.status(200).send({
                        token: "Bearer " + token,
                        status:true
                    })
                }
                else {
                    res.json({ "status": "Incorrect Password!" });
                }
            })
            }
            else{
                res.json({ "status": "User not found" });
            }
            
        }
        else {
            res.json({ "status": "User not found" });
        }
    } catch (error) {
        console.error(error.message);
    }
})
//for checking in
app.get("/protected", passport.authenticate('jwt', { session: "false" }), (req, res) => {
    if (req.user.type === "user") {
        res.status(200).send({
            user_id: req.user.user_id,
            enroll_id: req.user.enroll_id
        })
    }
    else{
        res.status(200).send(req.user)
    }
});
app.get('/isAuthenticated', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            // Handle error
            return res.status(500).json({ message: 'An error occurred during authentication' });
        }
        if (!user) {
            // Authentication failed
            return res.status(401).json({ authenticated: false });
        }
        // Authentication succeeded
        req.user = user;
        return res.json({ authenticated: true, user });
    })(req, res, next);
});
//for getting all the items in the menu

app.get("/users",async(req,res)=>{
    const result=await db.query("SELECT * FROM users");
    let data=[];
    try {
        result.rows.map((user)=>{
            data.push({first_name:user.first_name,last_name:user.last_name,enroll_id:user.enroll_id,email:user.email,user_id:user.user_id,verified:user.verified});
        });
        res.send(data);
    } catch (error) {
        console.error(err);
    }
    
})

app.get("/all", passport.authenticate('jwt', { session: "false" }), async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM menu");
        let data = [];
        result.rows.forEach(item => {
            if (item.available == true) {
                
                data.push({ item_id: item.item_id, name: item.name, price: item.price, shop: item.shop,shop_id:item.shop_id,imageUrl : item.image });
            }

        });
        if(req.user.ismerchant === true)
        {
            res.send({
                id:req.user.id,
                ismerchant:req.user.ismerchant,
                shop:req.user.shop,
                data:data
            })
        }
        else
        {
            res.send({
            user_id: req.user.user_id,
            enroll_id: req.user.enroll_id,
            data: data
        });
        }
        
    } catch (error) {
        console.log(error);
    }
});

app.get("/menu_home",async(req,res)=>{
    try {
        const result = await db.query("SELECT * FROM menu ORDER BY RANDOM() LIMIT 4");
        let data = [];
        result.rows.forEach(item => {
            if (item.available == true) {
                data.push({ item_id: item.item_id, name: item.name, price: item.price, shop: item.shop,shop_id:item.shop_id,imageUrl : item.image });
            }
        });
        res.send(data);
    } catch (error) {
        console.error(error);
    }
})

app.post("/all",async (req,res)=>{
    console.log(req.body);
    const data=req.body;
    try {
        const result = await db.query("INSERT INTO menu(name, price, available, shop, shop_id, image) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
        [data.name,data.price,data.available,data.shop,data.shop_id,data.image]);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
    
});

//setting sockets for live orders

db.query('LISTEN new_order');

db.on('notification', (msg) => {

    //   const payload =await db.query("SELECT * FROM myorders ORDER BY time DESC");

  const payload = JSON.parse(msg.payload);
  io.emit('new_order', payload); // Emitting the event to the client
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});


//edit menu
app.post("/edit_menu",async (req,res)=>{
    console.log(req.body);
    const data=req.body;
    try {
        const result=await db.query("UPDATE menu SET name=$1, price=$2, image=$3 WHERE item_id=$4 RETURNING *",[data.name,data.price,data.imageUrl,data.item_id])
        res.send(result);
    } catch (error) {
        console.error(error);
    }

})

app.delete("/edit_menu",async (req,res)=>{
    console.log(req.body.source);
    const data=req.body.source;
    try {
        await db.query("DELETE FROM menu WHERE item_id=$1",[data.item_id])
    } catch (error) {
        console.error(error);
    }

})

app.post("/myorders", async (req, res) => {
    try {
        // console.log(req.body.orderData)
        const data = req.body.data
        const userData = req.body.user
        console.log(req.body.user)

        data.map(async (item) => {
            const result = await db.query("INSERT INTO myorders(item_id,user_id,name,price,quantity,payment,time,date,shop,shop_id,first_name,last_name,enroll_id,image,completed,rejected) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
                [item.item_id, userData.user_id, item.name, item.price, item.quantity, item.payment, item.time, item.date, item.shop,item.shop_id,userData.first_name,userData.last_name,userData.enroll_id,item.imageUrl,item.completed,item.rejected]);
        })
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/edit_myorders",async(req,res)=>{
    const item=req.body.item;
    const rejected=req.body.rejected;
    const completed=req.body.completed;
    try {
        const result=await db.query("UPDATE myorders SET rejected=$1, completed=$2 WHERE order_id=$3 RETURNING *",[rejected,completed,item.order_id]);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
})
//payment integration insta mojo


app.get("/myorders",passport.authenticate('jwt', { session: "false" }), async (req,res)=>{
    if(req.user.ismerchant === true){
        const merchant=req.user;
        try {
            const result=await db.query("SELECT * FROM myorders WHERE shop_id=$1 ORDER BY order_id DESC",[merchant.id]);
            let data=[];
            result.rows.forEach((item)=>{
                data.push({order_id:item.order_id , item_id:item.item_id , first_name:item.first_name, last_name:item.last_name, enroll_id:item.enroll_id , name:item.name , price:item.price , quantity:item.quantity , payment:item.payment ,imageUrl:item.image, time:item.time , date:item.date, completed:item.completed, rejected:item.rejected});
            });
            res.send(data);
        } catch (error) {
            console.error(error);
        }
    }
    else{
        const user=req.user;
        try {
            const result=await db.query("SELECT * FROM myorders WHERE user_id=$1 ORDER BY order_id DESC",[user.user_id]);
            let data=[];
            result.rows.forEach((item)=>{
                data.push({order_id:item.order_id , item_id:item.item_id , first_name:item.first_name, last_name:item.last_name, enroll_id:item.enroll_id , name:item.name , price:item.price , quantity:item.quantity ,imageUrl:item.image, payment:item.payment , time:item.time , date:item.date, completed:item.completed, rejected:item.rejected});
            });
            res.send(data);
        } catch (error) {
            console.error(err);
        }
    }

    console.log(req.user);
})

//passport jwt token varification
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use(new JwtStrategy(opts, async function (jwt_payload, cb) {
    // console.log(jwt_payload);
    //finding user from database
    try {
        let result;
        if (jwt_payload.type === "user") {
            result = await db.query("SELECT * FROM users WHERE enroll_id=$1", [jwt_payload.enroll_id]);
        }
        else {
            result = await db.query("SELECT * FROM merchant WHERE id=$1", [jwt_payload.id]);
        }
        if (result) {
            return cb(null, result.rows[0]);
        }
        else {
            return cb(null, false);
        }
    } catch (error) {
        return cb(err, false);
    }
}));

//merchant register
app.post("/m_register", async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        bcrypt.hash(data.password, 10, async (err, hash) => {      //user password is encrypted
            if (err) {
                console.error("Error hasing password !", err);
            }
            else {
                const response = await db.query("INSERT INTO merchant(first_name,last_name, shop, phone_num, pay_num, email, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                    [data.first_name.toLowerCase(), data.last_name.toLowerCase(), data.shop.toLowerCase(), data.phone_num, data.pay_num, data.email, hash]);
                res.json(response.rows[0]);
            }
        });

    } catch (err) {
        res.json(err.message);
    }
});

//merchant login
app.post("/m_login", async (req, res) => {
    try {
        const data = req.body;
        const result = await db.query("SELECT * FROM merchant WHERE email = $1", [data.email]);
        if (result.rows.length > 0) {
            const id=result.rows[0].id
            const savedHash = result.rows[0].password;
            const currPassword = data.password;
            bcrypt.compare(currPassword, savedHash, (err, result) => {
                if (err) {
                    res.json(err.message);
                } else if (result) {
                    // here we will send jwt tokken to the browser!!!
                    const payload = {
                        id: id,
                        type: "merchant"
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
                    return res.status(200).send({
                        token: "Bearer " + token,
                        status:true
                    })
                }
                else {
                    res.json({ "status": "Incorrect Password!" });
                }
            })
        }
        else {
            res.json({ "status": "User not found" });
        }
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/merchant",async(req,res)=>{
    try {
        let data=[]
        const result=await db.query("SELECT * FROM merchant");
        result.rows.map((item)=>{
            data.push({id:item.id,first_name:item.first_name,last_name:item.last_name,shop:item.shop,phone_num:item.phone_num,pay_num:item.pay_num,email:item.email,ismerchant:item.ismerchant})
        })
        res.send(data);
    } catch (error) {
        console.error(error);
    }
})

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

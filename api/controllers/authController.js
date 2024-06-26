import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    const { username, email, password, name } = req.body;

    if (!username || !email || !password || !name) {
        return res.status(400).json("Please provide all required fields: username, email, password, name.");
    }

    // CHECK IF USER EXISTS
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [username], (err, data) => {
        if (err) {
            console.error('Error checking user existence:', err);
            return res.status(500).json(err);
        }
        if (data.length) return res.status(409).json("User already exists!");

        // CREATE A NEW USER

        // HASH THE PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)";
        const values = [username, email, hashedPassword, name];

        db.query(q, [values], (err, data) => {
            if (err) {
                console.error('Error creating new user:', err);
                return res.status(500).json(err);
            }
            return res.status(200).json("User has been created!");
        });
    });
};

export const login = (req, res) => {
    
    const q = "SELECT * FROM users WHERE username = ?"
    try {
        db.query(q, [req.body.username], (err,data) => {

            if (err) return res.status(500).json(err)
            if (data.length === 0) return res.status(404).json("User not found!")

            const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

            if(!checkPassword) return res.status(400).json("Wrong password or username!")

            const token = jwt.sign({ id: data[0].id }, "secretkey")

            const { password, ...others } = data[0]

            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            }).status(200).json(others)
        })
    } catch (err) {
        console.log(err)
    }
};

export const logout = (req, res) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }).status(200).json("User has been logged out!");
};
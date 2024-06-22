import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getUser = (req, res) => {
    
    const userId = req.params.userId
    const q = "SELECT * FROM users WHERE id = ?"

    db.query(q, [userId], (err,data) => {

        if(err) return res.status(500).json(err)
        const { password,...info } = data[0]
    
        return res.json(info)
    })
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      // Initialize query parts
      let query = "UPDATE users SET ";
      const values = [];
      const fields = ["name", "city", "website", "profilePic", "coverPic"];
  
      fields.forEach((field) => {
        if (req.body[field] !== undefined && req.body[field] !== null && req.body[field] !== '') {
          query += `\`${field}\` = ?, `;
          values.push(req.body[field]);
        }
      });
  
      // Remove the last comma and space
      query = query.slice(0, -2);
      query += " WHERE id = ?";
      values.push(userInfo.id);
  
      db.query(query, values, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      });
    });
  };

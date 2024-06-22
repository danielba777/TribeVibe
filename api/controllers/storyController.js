import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getStories = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      console.error("No token provided");
      return res.status(401).json("Not logged in!");
    }
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) {
        console.error("Token verification failed", err);
        return res.status(403).json("Token is not valid!");
      }
  
      const userId = req.query.userId || userInfo.id;
  
      const q = req.query.userId !== undefined
        ? `SELECT s.*, u.id AS userId, name, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId) WHERE s.userId = ?`
        : `SELECT s.*, u.id AS userId, name, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId) 
           LEFT JOIN relationships AS r ON (s.userId = r.followedUserId) WHERE (r.followerUserId = ? OR s.userId = ?) AND s.userId != ?`;
  
      const values = req.query.userId !== undefined ? [userId] : [userInfo.id, userInfo.id, userInfo.id];
  
      db.query(q, values, (err, data) => {
        if (err) {
          console.error("Database query failed", err);
          return res.status(500).json(err);
        }
        return res.status(200).json(data);
      });
    });
};

export const addStory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO stories (`img`,`userId`) VALUES (?)";

        const values = [
            req.body.img,
            userInfo.id
        ];

        db.query(q, [values], (err, data) => {
            if (err) {
                console.error("Error inserting story:", err); 
                return res.status(500).json(err);
            }
            return res.status(200).json("Story has been created!");
        });
    });
};
  
export const deleteStory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!")
  
      const q = "DELETE FROM stories WHERE `id`=? AND `userId` = ?"
  
      db.query(q, [req.params.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.affectedRows > 0) return res.status(200).json("Story has been deleted.")
        return res.status(403).json("You can delete only your story")
      });
    });
};
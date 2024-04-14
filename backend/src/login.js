import express from "express";
import axios from "axios";

const loginRouter = express.Router();

loginRouter.post("/api/v1/login", async(req, res) => {
    try {
        // 從請求中獲取用戶名和密碼
        const { username, password } = req.body;
        
        // 發送登入請求到後端登入端點
        const response = await axios.post("/api/v1/login", {
            username,
            password,
        });
    
        // 檢查後端登入端點的回應
        if (response.status === 200) {
            // 登入成功，將用戶名儲存在 session 中
            req.session.username = username;
            // 返回成功的回應給前端
            res.status(200).json({ isLoggedIn: true });
        } else {
            // 登入失敗，返回相應的錯誤給前端
            res.status(response.status).json({ isLoggedIn: false });
        }
    } catch (error) {
        // 捕獲任何錯誤，並返回錯誤給前端
        console.error("登入失敗：", error);
        res.status(500).json({ isLoggedIn: false });
    }
});

loginRouter.get("/api/v1/login", async(req, res) => {
    try {
        await axios.get("/api/v1/login");
        // 返回成功的登出回應給前端
        res.status(200).json({ isLoggedIn: false });
    } catch (error) {
        // 捕獲任何錯誤，並返回錯誤給前端
        console.error("登出失敗：", error);
        res.status(500).json({ isLoggedIn: true });
    }
});

export default loginRouter;
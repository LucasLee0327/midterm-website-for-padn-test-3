import { prisma } from "../../../../adapters.js";
import { fileTypeFromBuffer } from 'file-type';

export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);  
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneUser(req, res) {
  const { username, password, avatar } = req.body;

  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      avatar: avatar
    },
  });
  return res.status(201).json(user);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getOneUser(req, res) {
  const username = req.session.username;
  if (!username) return res.status(400).json({ error: "Invalid username" });
  const user = await prisma.user.findUnique({ where: { username: username } });
  if (user === null) return res.status(404).json({ error: "Not Found" });
  return res.json(user);
}

/**
 * 上傳使用者頭像
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function uploadAvatar(req, res) {
  try {
    const base64Image = req.body.avatar;
    const username = req.session.username;

    if (!username) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const user = await prisma.user.findUnique({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 檢查檔案類型是否為 JPEG 或 PNG
    const base64WithoutHeader = base64Image.substring(base64Image.indexOf(',') + 1);
    const buffer = Buffer.from(base64WithoutHeader, 'base64');
    const type = await fileTypeFromBuffer(buffer);
    if (!type || (type.mime !== 'image/jpeg' && type.mime !== 'image/png')) {
      return res.status(400).json({ message: 'Please upload a JPEG or PNG image.' });
    }

    // 更新使用者的圖片字段
    const updatedUser = await prisma.user.update({
      where: { username: username },
      data: {
        avatar: base64Image
      }
    });

    // 回應成功訊息
    res.status(200).json({ message: 'Image uploaded successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error uploading image:', error);
    // 返回錯誤的回應給前端
    res.status(500).json({ message: 'Error uploading image.' });
  }
}


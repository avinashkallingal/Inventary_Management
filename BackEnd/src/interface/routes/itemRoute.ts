import express from 'express';
import upload from '../../utils/multer';
import { itemController } from '../controllers/itemController';
import authMiddleware from '../middlewares/Aurh';

const itemRouter = express.Router();

itemRouter.post('/addItem', upload.single('image'), itemController.addItem);
itemRouter.get('/getItems', itemController.getItems);
itemRouter.get('/getItem/:itemId', itemController.getItem);
itemRouter.get('/search', itemController.searchItems);
itemRouter.put("/updateItem", upload.single("image"), itemController.updateItem);
itemRouter.delete('/deleteItem/:itemId', itemController.deleteItem);
// blogRouter.get('/getUserBlogs/:id', authMiddleware, blogController.getUserBlog);
// blogRouter.get('/getSingleBlog/:blogId', authMiddleware, blogController.getSingleBlog);
// blogRouter.put('/editBlog', authMiddleware, upload.single('image'), blogController.editBlog);
// blogRouter.delete('/deleteBlog/:blogId',authMiddleware,blogController.deleteBlog)

export default itemRouter;
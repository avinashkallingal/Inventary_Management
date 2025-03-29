import express from 'express';
import upload from '../../application/services/upload/multer';
import { orderController } from '../controllers/orderController';
import authMiddleware from '../middlewares/Aurh';

const orderRouter = express.Router();

orderRouter.post('/addOrder', orderController.addOrder);
orderRouter.get('/getOrders', orderController.getOrders);
// blogRouter.get('/getUserBlogs/:id', authMiddleware, blogController.getUserBlog);
// blogRouter.get('/getSingleBlog/:blogId', authMiddleware, blogController.getSingleBlog);
// blogRouter.put('/editBlog', authMiddleware, upload.single('image'), blogController.editBlog);
// blogRouter.delete('/deleteBlog/:blogId',authMiddleware,blogController.deleteBlog)

export default orderRouter;
import express from 'express';
import upload from '../../utils/multer';
import { reportController } from '../controllers/reportController';
import authMiddleware from '../middlewares/Aurh';

const reportRouter = express.Router();


reportRouter.get('/getOrders', reportController.getOrders);
reportRouter.get('/sales', reportController.getSalesReport);
reportRouter.get('/items', reportController.getItemsReport);
reportRouter.get('/ledger', reportController.getCustomerLedger);
reportRouter.post('/sendEmail', reportController.sendEmail);
// blogRouter.get('/getUserBlogs/:id', authMiddleware, blogController.getUserBlog);
// blogRouter.get('/getSingleBlog/:blogId', authMiddleware, blogController.getSingleBlog);
// blogRouter.put('/editBlog', authMiddleware, upload.single('image'), blogController.editBlog);
// blogRouter.delete('/deleteBlog/:blogId',authMiddleware,blogController.deleteBlog)

export default reportRouter;
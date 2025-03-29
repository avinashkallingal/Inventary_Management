import express from 'express';
import upload from '../../application/services/upload/multer';
import { customerController } from '../controllers/customerController';
import authMiddleware from '../middlewares/Aurh';

const customerRouter = express.Router();

customerRouter.post('/addCustomer', customerController.addCustomer);
customerRouter.get('/getCustomers', customerController.getCustomers);
customerRouter.get('/getCustomer/:customerId', customerController.getCustomer);
customerRouter.put('/updateCustomer', customerController.editCustomer);
customerRouter.delete('/deleteCustomer/:customerId', customerController.deleteCustomer);
customerRouter.get('/search', customerController.searchCustomers);
// blogRouter.get('/getUserBlogs/:id', authMiddleware, blogController.getUserBlog);
// blogRouter.get('/getSingleBlog/:blogId', authMiddleware, blogController.getSingleBlog);
// blogRouter.put('/editBlog', authMiddleware, upload.single('image'), blogController.editBlog);
// blogRouter.delete('/deleteBlog/:blogId',authMiddleware,blogController.deleteBlog)

export default customerRouter;
const express = require('express');
const router = express.Router();
const {register,login} = require('../controller/auth')
const {createBlog,updateBlog,deleteBlog,getBlogById,getAllBlogs} = require('../controller/blog');
// const { isAdmin } = require('../middleware/isadmin');


router.post('/register',register);
router.post('/login',login);
router.post('/create',createBlog);
router.put('/update/:id',updateBlog);
router.delete('/delete/:id',deleteBlog);
router.get('/get',getAllBlogs);
router.get('/get/:id',getBlogById);
module.exports = router

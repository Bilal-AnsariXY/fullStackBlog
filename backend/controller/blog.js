const Blog = require('../model/blogModel');
// const Blog = require('../models/blog'); // Adjust path if needed

// CREATE a new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ status: false, message: "Title and Description are required" });
        }

        const newBlog = await Blog.create({ title, description });

        res.status(201).json({
            status: true,
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Failed to create blog" });
    }
};

// GET all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            status: true,
            blogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Failed to fetch blogs" });
    }
};

// GET a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }
        res.status(200).json({ status: true, blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Failed to fetch blog" });
    }
};

// UPDATE a blog
exports.updateBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }

        res.status(200).json({
            status: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Failed to update blog" });
    }
};

// DELETE a blog
exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }

        res.status(200).json({
            status: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Failed to delete blog" });
    }
};

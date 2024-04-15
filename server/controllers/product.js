const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    await new Product(req.body).save();
    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listYourProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id })
      .populate("user", "first_name last_name picture username cover gender")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const title = req.query.title || "";
    const category = req.query.category || "";
    const categoryFilter = category ? { category } : {};
    const titleFilter = title
      ? { title: { $regex: title, $options: "i" } }
      : {};
    const products = await Product.find({
      ...categoryFilter,
      ...titleFilter,
    })
      .populate("user", "first_name last_name picture username cover gender")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.categoriesProducts = async (req, res) => {
  try {
    const distinctCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
        },
      },
    ]);
    res.status(200).json(distinctCategories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.findProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "user",
      "first_name last_name picture username cover createdAt"
    );
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

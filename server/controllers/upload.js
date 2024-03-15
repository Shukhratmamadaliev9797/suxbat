const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadMedia = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let media = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      media.push(url);
      removeTmp(file.tempFilePath);
    }

    res.json(media);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listImages = async (req, res) => {
  const { path, sort, max } = req.body;
  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: path, resource_type: getCloudinaryResourceType(file.mimetype) },
      (err, result) => {
        if (err) {
          removeTmp(file.tempFilePath);
          reject({ message: "Upload failed" });
        }

        resolve({ url: result?.secure_url });
      }
    );
  });
};

const getCloudinaryResourceType = (mimetype) => {
  if (mimetype.startsWith("image/")) {
    return "image";
  } else if (mimetype.startsWith("video/")) {
    return "video";
  }
  return null;
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

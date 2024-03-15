const fs = require("fs");

module.exports = async function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected" });
    }

    let files = Object.values(req.files).flat();

    const allowedImageFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const allowedVideoFormats = ["video/mp4", "video/webm", "video/quicktime"];

    files.forEach((file) => {
      if (
        !allowedImageFormats.includes(file.mimetype) &&
        !allowedVideoFormats.includes(file.mimetype)
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format" });
      }

      if (file.size > 1024 * 1024 * 40) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File size is too large" });
      }
    });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

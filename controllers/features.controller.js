const download = require('image-downloader');
const { fileExtension } = require('../middleware/tokenMiddleware');
const sharp = require('sharp');

const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg'];

// Resize image on post.
exports.create_thumbnail_post = (req, res, next) => {
  // Save image url and extension.
  const { imageUrl } = req.body;
  // Save image extension. Convert to lowercase if in caps.
  const imageUrlExt = fileExtension(imageUrl).toLowerCase();

  // If image url extension is a type of image file, proceed to resize.
  if (imageTypes.includes(imageUrlExt)) {
    // Download image and save.
    const options = {
      url: imageUrl,
      dest: './public/images/original/',
    }
    // Set location for resized images to be saved.
    const resizeFolder = './public/images/resized/';

    // Download image from the url and save in selected destination in options.
    download.image(options)
      .then(({ filename }) => {
        // Resize image to 50x50 and save to desired location.
        // Return conversion status to user.
        sharp(filename)
          .resize(50, 50)
          .toFile(`${resizeFolder}output.${imageUrlExt}`, (err) => {
            if (err) { return next(err) }
            const imgRoute = './images/resized/output.' + imageUrlExt;
            return res.json({
              converted: true, user: req.user.username, success: 'Image has been resized', thumbnail: imgRoute,
            });
          });
      })
      .catch(() => {
        res.status(400).json({ error: 'Oops something went wrong. Kindly check your image url and try again' });
      });
  } else {
    res.status(400).json({ error: `We only handle image files with extensions - ${[...imageTypes]}` });
  }
}

const download = require('image-downloader');
const {fileExtension} = require('../middleware/middleware');
const sharp = require('sharp');

const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg'];

// Resize image on post.
exports.generate_thumbnail_post = (req, res, next) => {
  // Save image url and extension.
  const {imageUrl} = req.body;

  // Save image extension.
  const imageUrlExt = fileExtension(imageUrl).toLowerCase();

  // If image url extension is a type of image file, proceed to resize.
  if (imageTypes.includes(imageUrlExt)) {
    // Configure options for saving image from URL.
    const options = {
      url: imageUrl,
      dest: './public/images/original/',
    };

    // Set location for resized images to be saved.
    const resizeFolder = './public/images/resized/';

    /**
     * Download image from the url and save
     * in the destination specified in options.
     */
    download.image(options)
        .then(({filename}) => {
          // Resize image to 50x50 and save to ./public/images/resized
          sharp(filename)
              .resize(50, 50)
              .toFile(`${resizeFolder}output.${imageUrlExt}`,
                  (err) => {
                    if (err) {
                      return next(err);
                    }

                    // Generate path of resized image for response.
                    const imgRoute = './images/resized/output.' + imageUrlExt;
                    return res.json({
                      converted: true,
                      user: req.user.username,
                      success: 'Image has been resized',
                      thumbnail: imgRoute,
                    });
                  });
        })
        .catch(() => {
          res.status(400)
              .json({
                error: 'Image URL is invalid.',
              });
        });
  } else {
    res.status(400)
        .json({
          error: `Only these extensions are supported: ${[...imageTypes]}.`,
        });
  }
};

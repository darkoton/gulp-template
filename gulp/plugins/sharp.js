import { Transform } from 'stream';
import sharp from 'sharp';
import path from 'path';

export function convertImageToWebP() {
  return new Transform({
    objectMode: true,
    async transform(file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      // Work with Buffer contents
      if (file.isBuffer()) {
        try {
          file.contents = await sharp(file.contents).webp().toBuffer();
          file.path = file.path.replace(path.extname(file.path), '.webp');
          callback(null, file);
        } catch (err) {
          console.error('Error converting image to WebP:', err);
          callback(null, file);
        }
      }
    },
  });
}

export function convertImageToAvif() {
  return new Transform({
    objectMode: true,
    async transform(file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      // Work with Buffer contents
      if (file.isBuffer()) {
        try {
          file.contents = await sharp(file.contents).avif().toBuffer();
          file.path = file.path.replace(path.extname(file.path), '.avif');
          callback(null, file);
        } catch (err) {
          console.error('Error converting image to Avif:', err);
          callback(null, file);
        }
      }
    },
  });
}

export function optimizeImage() {
  return new Transform({
    objectMode: true,
    async transform(file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      if (file.isBuffer()) {
        const ext = path.extname(file.path).toLowerCase();
        const originalSize = file.contents.length;

        try {
          let optimized;
          switch (ext) {
            case '.jpg':
            case '.jpeg':
              optimized = await sharp(file.contents)
                .jpeg({
                  quality: 80,
                  progressive: true,
                })
                .toBuffer();
              break;
            case '.png':
              optimized = await sharp(file.contents)
                .png({
                  compressionLevel: 9,
                })
                .toBuffer();
              break;
            case '.webp':
              optimized = await sharp(file.contents)
                .webp({
                  quality: 80,
                })
                .toBuffer();
              break;
            case '.gif':
              optimized = await sharp(file.contents, { animated: true })
                .gif({
                  effort: 7,
                })
                .toBuffer();
              break;
            default:
              optimized = file.contents;
          }

          if (optimized.length < originalSize) {
            file.contents = optimized;
          }

          callback(null, file);
        } catch (err) {
          console.error('Error optimizing image:', err);
          callback(null, file);
        }
      }
    },
  });
}

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const s3 = new aws.S3({    
    sslEnabled: false,
});

const upload = multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'smart-university-job-resumes',
      contentType: multerS3.DEFAULT_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now()+ "-" + file.originalname)
      }
    })
  })

module.exports = upload;
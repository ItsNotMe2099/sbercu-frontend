
import { serialize } from 'object-to-formdata'
const axios = require('axios');
S3Upload.prototype.server = '';
S3Upload.prototype.signingUrl = '/sign-s3';
S3Upload.prototype.signingUrlMethod = 'GET';
S3Upload.prototype.successResponses = [200, 201];
S3Upload.prototype.fileElement = null;
S3Upload.prototype.files = null;

S3Upload.prototype.onFinishS3Put = function(signResult, file) {
  return console.log('base.onFinishS3Put()', signResult.publicUrl);
};

S3Upload.prototype.preprocess = function(file, next) {
  console.log('base.preprocess()', file);
  return next(file);
};

S3Upload.prototype.onProgress = function(percent, status, file) {
  return console.log('base.onProgress()', percent, status);
};

S3Upload.prototype.onError = function(status, file) {
  return console.log('base.onError()', status);
};

S3Upload.prototype.onSignedUrl = function(result) {};

S3Upload.prototype.scrubFilename = function(filename) {
  return filename.replace(/[^\w\d_\-\.]+/ig, '');
};

function S3Upload(options) {
  if (options == null) {
    options = {};
  }
  for (var option in options) {
    if (options.hasOwnProperty(option)) {
      this[option] = options[option];
    }
  }
  var files = this.fileElement ? this.fileElement.files : this.files || [];
  this.handleFileSelect(files);
}

S3Upload.prototype.handleFileSelect = function(files) {
  var result = [];
  for (var i=0; i < files.length; i++) {
    var file = files[i];
    this.preprocess(file, function(processedFile){
      this.onProgress(0, 'Waiting', processedFile);
      result.push(this.uploadFile(processedFile));
      return result;
    }.bind(this));
  }
};


S3Upload.prototype._getErrorRequestContext = function (xhr) {
  return {
    response: xhr.responseText,
    status: xhr.status,
    statusText: xhr.statusText,
    readyState: xhr.readyState
  };
}

S3Upload.prototype.executeOnSignedUrl = function(file, callback) {
  var fileName = file.name;
  var queryString = '?objectName=' + fileName + '&contentType=' + encodeURIComponent(file.type);
  if (this.s3path) {
    queryString += '&path=' + encodeURIComponent(this.s3path);
  }
  if (this.signingUrlQueryParams) {
    var signingUrlQueryParams = typeof this.signingUrlQueryParams === 'function' ? this.signingUrlQueryParams() : this.signingUrlQueryParams;
    Object.keys(signingUrlQueryParams).forEach(function(key) {
      var val = signingUrlQueryParams[key];
      queryString += '&' + key + '=' + val;
    });
  }
  return fetch( this.server + this.signingUrl + queryString, { // Your POST endpoint
    method: this.signingUrlMethod,
    headers: {
      // Content-Type may need to be completely **omitted**
      // or you may need something
      "Content-Type": "application/json",
      ...this.signingUrlHeaders
    },
     // This is your file object
  }).then(
    response => {
    response.json().then((data) => {
      this.onSignedUrl(data);
      console.log("OnData", data);
      callback(data);
    })

    } // if the response is a JSON object
  ).then(
    success => console.log(success) // Handle the success response object
  ).catch(
    error =>    this.onError(
      'Upload error: ' + error,
      file
    ));

};

S3Upload.prototype.uploadToS3 = function(file, signResult) {
  console.log("Upload file", file)
  var formData = new FormData();
  formData.append("file", file)
  axios.put(`${signResult.signedUrl}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...this.uploadRequestHeaders
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log("percentCompleted",percentCompleted)
      if(percentCompleted !== 100) {
        this.onProgress(percentCompleted);
      }
    }
  }).then(
    response => {
      console.log("Response", response);
      this.onProgress(100, 'Upload completed', file);
      console.log("Response", response);
      this.onFinishS3Put(response.data, file)

    } // if the response is a JSON object
  ).then(
    success => console.log(success) // Handle the success response object
  ).catch(
    error =>    this.onError(
    'Upload error: ' + error,
    file
  ));

};

S3Upload.prototype.uploadFile = function(file) {
  var uploadToS3Callback = this.uploadToS3.bind(this, file);

  if(this.getSignedUrl) return this.getSignedUrl(file, uploadToS3Callback);
  return this.executeOnSignedUrl(file, uploadToS3Callback);
};

S3Upload.prototype.abortUpload = function() {
  this.httprequest && this.httprequest.abort();
};

export default S3Upload;

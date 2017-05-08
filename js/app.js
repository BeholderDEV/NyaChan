function validarPost (post, files) {
  var myEl
  if ((post.body === ' ' || post.body === undefined) && (files === undefined || files.length < 1)) {
    if (post.body === ' ' || post.body === undefined) {
      myEl = angular.element(document.querySelector('#comment-group'))
      myEl.addClass('has-error')
    }
    if (files === undefined || files.length < 1) {
      myEl = angular.element(document.querySelector('#file-group'))
      myEl.addClass('has-error')
    }
    return false
  } else {
    myEl = angular.element(document.querySelector('#comment-group'))
    myEl.removeClass('has-error')
    myEl = angular.element(document.querySelector('#file-group'))
    myEl.removeClass('has-error')
    return true
  }
}

function filesToJSON (files, uploadedFiles) {
  var filesJSON = []
  for (var i = 0; i < uploadedFiles.length; i++) {
    var ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase()
    var jsonFile = {
      size: uploadedFiles[i].size,
      name: files[i].name,
      extension: ext,
      height: uploadedFiles[i].height,
      width: uploadedFiles[i].width,
      source: uploadedFiles[i].mainUrl,
      thumb: uploadedFiles[i].thumbUrl
    }
    filesJSON[i] = jsonFile
  }
  return filesJSON
}

function validFile (filename) {
  console.log('validando')
  var validFormats = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webm', 'pdf' ]
  var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()
  return validFormats.indexOf(ext) !== -1
}

function toggleThumb (post) {
  console.log('aaa')
}

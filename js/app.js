function validarPost (post, files) {
  var myEl
  if ((post.body === ' ' || post.body === undefined) && files === undefined) {
    if (post.body === ' ' || post.body === undefined) {
      myEl = angular.element(document.querySelector('#comment-group'))
      myEl.addClass('has-error')
    }
    if (files === undefined) {
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

function filesToJSON(files, uploadedFiles)
{
  var filesJSON = []
  for(var i=0; i<uploadedFiles.length;i++)
  {
    var ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase()
    var jsonFile = {
      size: uploadedFiles[0].size,
      name: files[0].name,
      extension: ext,
      height: uploadedFiles[0].height,
      width: uploadedFiles[0].width,
      source: uploadedFiles[0].mainUrl,
      thumb: uploadedFiles[0].thumbUrl
    }
    filesJSON[i]=jsonFile
  }
}

function validFile (filename) {
  console.log('validando')
  var validFormats = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webm', 'pdf' ]
  var ext = filename[0].substring(filename[0].lastIndexOf('.') + 1).toLowerCase()
  return validFormats.indexOf(ext) !== -1
}

function toggleThumb (post) {
  console.log('aaa')
}

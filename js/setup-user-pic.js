'use strict';

(function () {

  // var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // var upload = document.querySelector('.notice__photo');
  // var uploadInput = upload.querySelector('input');
  // var uploadPreview = upload.querySelector('.notice__preview img');
  // var uploadDropArea = upload.querySelector('.drop-zone');

  // var uploadPicture = function (formPicture) {
  //   var picture = formPicture;
  //   var pictureName = picture.name.toLowerCase();

  //   var matches = FILE_TYPES.some(function (it) {
  //     return pictureName.endsWith(it);
  //   });

  //   if (matches) {
  //     var reader = new FileReader();
  //     reader.addEventListener('load', function () {
  //       uploadPreview.src = reader.result;
  //     });
  //     reader.readAsDataURL(picture);
  //   }
  // };

  // uploadDropArea.addEventListener('dragover', function (evt) {
  //   evt.preventDefault();
  // });

  // uploadDropArea.addEventListener('drop', function (evt) {
  //   evt.preventDefault();
  //   var picture = evt.dataTransfer.files;
  //   // uploadPicture(picture);
  //   console.log(picture);
  // });

  // uploadInput.addEventListener('change', function () {
  //   var picture = uploadInput.files;
  //   console.log(picture);
  //   // uploadPicture(picture);
  // });

})();

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  // var addListeners = function () {
  //   dropArea.addEventListener('dragover', function (evt) {
  //     evt.preventDefault();
  //   });

  //   dropArea.addEventListener('drop', function (evt) {
  //     evt.preventDefault();
  //     getFiles(evt.dataTransfer.files);

  //   });

  //   input.addEventListener('change', function () {
  //     getFiles(uploadInput.files);
  //   });
  // };

  // var getFiles = function (image) {

  // };

  // var image = function (previewImg, input, dropArea) {
  //   addListeners();
  // };

  // var gallery = function (previewGallery, input, dropArea) {
  //   addListeners();
  // };


})();

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var upload = document.querySelector('.notice__photo');
  var uploadInput = upload.querySelector('input');
  var uploadPreview = upload.querySelector('.notice__preview img');
  var uploadDropArea = upload.querySelector('.drop-zone');

  var addListeners = function (previewContainer, input, dropArea, callback) {
    dropArea.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    dropArea.addEventListener('drop', function (evt) {
      evt.preventDefault();
      callback(previewContainer, evt.dataTransfer.files);

    });

    input.addEventListener('change', function () {
      callback(previewContainer, input.files);
    });
  };

  var getFile = function (previewContainer, image) {
    var picture = image[0];
    var pictureName = picture.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return pictureName.endsWith(it);
    });

    if (matches) {
      renderPreview(previewContainer, picture);
    }
  };

  var getFiles = function (previewContainer, image) {
    var pictures = Array.from(image);
    console.log(previewContainer);
    var picturesCopy = pictures.filter(function (picture) {
      var pictureName = picture.name.toLowerCase();
      return FILE_TYPES.some(function (it) {
        return pictureName.endsWith(it);
      });
    });
    console.log(picturesCopy);

    if (picturesCopy.length > 0) {
      picturesCopy.forEach(function (item, index) {
        createGalleryItem(previewContainer, item, index);
      });
    }

    addDraggGallery();
  };

  var createGalleryItem = function (container, item, index) {
    var image = document.createElement('img');
    image.style.width = '50px';
    image.style.height = '50px';
    image.classList.add('drop');
    image.id = 'c' + index;
    image.removeAttribute('dragable');
    renderPreview(image, item);
    container.appendChild(image);
  };

  var renderPreview = function (container, picture) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      container.src = reader.result;
    });
    reader.readAsDataURL(picture);
  };

  var addDraggGallery = function () {
    document.querySelectorAll('.drop').forEach(e => {
      e.draggable = true;
      e.ondragstart = e => {
        e.dataTransfer.setData("id", e.target.id);
        e.target.classList.add('dragging');
      }
      e.ondragover = e => {
        let old = document.querySelector('.over');
        old && old.classList.remove('over')
        e.target.classList.add('over');
        e.preventDefault();
      };
      e.ondrop = e => {
        let old = document.querySelector('.dragging');
        old && old.classList.remove('dragging')
        old = document.querySelector('.over');
        old && old.classList.remove('over');
        let v = e.target.src;
        let fromEl = document.querySelector('#' + e.dataTransfer.getData('id'));
        e.target.src = fromEl.src;
        fromEl.src = v;

      };
    })
  };

  var uploadImage = function (previewContainer, input, dropArea) {
    addListeners(previewContainer, input, dropArea, getFile);
  };

  var uploadGallery = function (previewContainer, input, dropArea) {
    addListeners(previewContainer, input, dropArea, getFiles);
  };

  uploadGallery(upload, uploadInput, uploadDropArea);

})();

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

  // var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // var upload = document.querySelector('.notice__photo');
  // var uploadInput = upload.querySelector('input');
  // var uploadPreview = upload.querySelector('.notice__preview img');
  // var uploadDropArea = upload.querySelector('.drop-zone');

  // var addListeners = function (previewContainer, input, dropArea, callback) {
  //   dropArea.addEventListener('dragover', function (evt) {
  //     evt.preventDefault();
  //   });

  //   dropArea.addEventListener('drop', function (evt) {
  //     evt.preventDefault();
  //     callback(previewContainer, evt.dataTransfer.files);

  //   });

  //   input.addEventListener('change', function () {
  //     callback(previewContainer, input.files);
  //   });
  // };

  // var getFile = function (previewContainer, image) {
  //   var picture = image[0];

  //   var matches = FILE_TYPES.some(function (it) {
  //     var pictureName = picture.name.toLowerCase();
  //     return pictureName.endsWith(it);
  //   });

  //   if (matches) {
  //     renderPreview(previewContainer, picture);
  //   }
  // };

  // var getFiles = function (previewContainer, image) {
  //   var pictures = Array.from(image);

  //   pictures.filter(function (picture) {
  //     var pictureName = picture.name.toLowerCase();
  //     return FILE_TYPES.some(function (it) {
  //       return pictureName.endsWith(it);
  //     });
  //   });

  //   if (pictures.length > 0) {
  //     pictures.forEach(function (item, index) {
  //       createGalleryItem(previewContainer, item, index);
  //     });
  //   }

  //   addDraggGallery();
  // };

  // var createGalleryItem = function (container, item, index) {
  //   var image = document.createElement('img');
  //   image.style.width = '50px';
  //   image.style.height = '50px';
  //   image.classList.add('drop');
  //   image.id = 'c' + index;
  //   image.removeAttribute('dragable');
  //   renderPreview(image, item);
  //   container.appendChild(image);
  // };

  // var renderPreview = function (container, picture) {
  //   var reader = new FileReader();
  //   reader.addEventListener('load', function () {
  //     container.src = reader.result;
  //   });
  //   reader.readAsDataURL(picture);
  // };

  // var addDraggGallery = function () {
  //   document.querySelectorAll('.drop').forEach(e => {
  //     e.draggable = true;
  //     e.ondragstart = e => {
  //       e.dataTransfer.setData("id", e.target.id);
  //       e.target.classList.add('dragging');
  //     }
  //     e.ondragover = e => {
  //       let old = document.querySelector('.over');
  //       old && old.classList.remove('over')
  //       e.target.classList.add('over');
  //       e.preventDefault();
  //     };
  //     e.ondrop = e => {
  //       let old = document.querySelector('.dragging');
  //       old && old.classList.remove('dragging')
  //       old = document.querySelector('.over');
  //       old && old.classList.remove('over');
  //       let v = e.target.src;
  //       let fromEl = document.querySelector('#' + e.dataTransfer.getData('id'));
  //       e.target.src = fromEl.src;
  //       fromEl.src = v;

  //     };
  //   })
  // };

  // var uploadImage = function (previewContainer, input, dropArea) {
  //   addListeners(previewContainer, input, dropArea, getFile);
  // };

  // var uploadGallery = function (previewContainer, input, dropArea) {
  //   addListeners(previewContainer, input, dropArea, getFiles);
  // };

  // uploadGallery(upload, uploadInput, uploadDropArea);

})();

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var enableGalleryDrag = function (gallery) {
    var galleryImages = gallery.querySelectorAll('img');

    galleryImages.forEach(function (image, index) {
      image.draggable = true;
      image.id = 'c' + index;

      image.addEventListener('dragstart', function (evt) {
        evt.dataTransfer.setData('id', evt.target.id);
        evt.target.classList.add('dragging');
      });

      image.addEventListener('dragover', function (evt) {
        var old = document.querySelector('.over');
        if (old) {
          old.classList.remove('over');
        }
        evt.target.classList.add('over');
        evt.preventDefault();
      });

      image.addEventListener('drop', function (evt) {
        var old = document.querySelector('.dragging');
        if (old) {
          old.classList.remove('dragging');
        }
        old = document.querySelector('.over');
        if (old) {
          old.classList.remove('over');
        }
        var v = evt.target.src;
        var fromEl = document.querySelector('#' + evt.dataTransfer.getData('id'));
        evt.target.src = fromEl.src;
        fromEl.src = v;
      });
    });
  };

  var renderPreview = function (container, picture) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      container.src = reader.result;
    });
    reader.readAsDataURL(picture);
  };

  var createGalleryItem = function (picture) {
    var image = document.createElement('img');
    renderPreview(image, picture);
    return image;
  };

  var previewImage = function (container, input, dropArea) {
    dropArea.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    dropArea.addEventListener('drop', function (evt) {
      evt.preventDefault();
      getFile(evt.dataTransfer.files);
    });

    input.addEventListener('change', function () {
      getFile(input.files);
    });

    var getFile = function (file) {
      var picture = file[0];

      var matches = FILE_TYPES.some(function (it) {
        var pictureName = picture.name.toLowerCase();
        return pictureName.endsWith(it);
      });

      if (matches) {
        renderPreview(container, picture);
      }
    };
  };

  var previewGallery = function (container, input, dropArea) {
    dropArea.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    dropArea.addEventListener('drop', function (evt) {
      evt.preventDefault();
      getFiles(evt.dataTransfer.files);
    });

    input.addEventListener('change', function () {
      getFiles(input.files);
    });

    var getFiles = function (files) {
      var pictures = Array.from(files);

      pictures.filter(function (picture) {
        var pictureName = picture.name.toLowerCase();
        return FILE_TYPES.some(function (it) {
          return pictureName.endsWith(it);
        });
      });

      if (pictures.length > 0) {
        var fragment = document.createDocumentFragment();
        pictures.forEach(function (picture) {
          fragment.appendChild(createGalleryItem(picture));
        });
        container.appendChild(fragment);
      }

      enableGalleryDrag(container);
    };
  };

  window.uploadPreview = {
    image: previewImage,
    gallery: previewGallery,
  };

})();

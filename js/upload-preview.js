'use strict';

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
        if (old !== null) {
          old.classList.remove('over');
        }
        evt.target.classList.add('over');
        evt.preventDefault();
      });

      image.addEventListener('drop', function (evt) {
        var old = document.querySelector('.dragging');
        if (old !== null) {
          old.classList.remove('dragging');
        }
        old = document.querySelector('.over');
        if (old !== null) {
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

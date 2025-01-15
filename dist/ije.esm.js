import { element, capitalLetters, on } from 'mmuo';
import { Offcanvas, Modal, Toast } from 'bootstrap';

function showCanvass(msg) {
  //Just in case one have been created already, we remove it
  var offcanvasBottom = element('#offcanvasBottom', false);

  if (offcanvasBottom.isPresent()) {
    offcanvasBottom.remove();
  }

  element('div').addClasses('offcanvas offcanvas-bottom').id('offcanvasBottom').attr('tabindex', -1).attr('aria-labelledby', 'offcanvasBottomLabel').html("<div class='offcanvas-header d-flex justify-content-center'>\n    <h5 class='offcanvas-title text-center' id='offcanvasBottomLabel'>".concat(msg, "</h5>\n    </div>")).css('height', "80px").appendTo(document.body);
  new Offcanvas(document.getElementById("offcanvasBottom")).show();
}

function showSpinner() {
  //Just in case one have been created already, we remove i
  var spinnderDiv = element('.spinner-div', false);

  if (spinnderDiv.isPresent()) {
    spinnderDiv.remove();
  }

  element('div').addClasses('d-flex justify-content-center spinner-div').html("<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span></div").appendTo(document.body);
}

function removeSpinner() {
  //Just in case one have been created already, we remove it
  var spinnderDiv = element('.spinner-div', false);

  if (spinnderDiv.isPresent()) {
    spinnderDiv.remove();
  }
}

function showAlert(caption, href, textWord) {
  var classToUse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var bc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  //Just in case one have been created already, we remove it
  var alertModal = element('.alert-modal', false);

  if (alertModal.isPresent()) {
    alertModal.remove();
  }

  element('div').id('myModal').addClasses('modal fade alert-modal').attr('tabindex', -1).attr('role', 'dialog').attr('aria-labelledby', 'myModalLabel').attr('aria-hidden', 'true').html("<div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='btn-close' data-bs-dismiss='modal' aria-hidden='true'> </button> </div> <div class='modal-body'><div class='card'> <div class='card-body'><h5 class='card-title d-flex justify-content-center'>".concat(caption, "</h5></div><div class='card-footer'> <div class='btn-group d-flex justify-content-center' data-toggle='buttons'> <button type='button' class='close close-alert btn btn-dark btn-lg' data-bs-dismiss='modal' aria-hidden='true'>Cancel</button><a href='").concat(href, "' class='ms-2 ").concat(classToUse, " text-white btn btn-danger btn-lg' data-bc=\"").concat(bc, "\">").concat(capitalLetters(textWord), "</a></div></div> <div id='responseArea'></div></div></div> </div></div>")).appendTo(document.body);
  new Modal(document.getElementById("myModal")).show();
}

function DisplayAsToast(msg) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  var bgClass;

  switch (status) {
    case 'success':
      bgClass = 'bg-success';
      break;

    case 'error':
      bgClass = 'bg-danger';
      break;

    case 'warning':
      bgClass = 'bg-warning';
      break;
    // info

    default:
      bgClass = 'bg-primary';
  } //Just in case one has been created already, we remove it


  var notificationToastDiv = element('#notificationToastDiv', false);

  if (notificationToastDiv.isPresent()) {
    notificationToastDiv.remove();
  }

  element('div').addClasses('position-fixed top-0 end-0 p-3 d-flex justify-content-end').id('notificationToastDiv').html("<div id=\"notificationToast\" class=\"toast ".concat(bgClass, " text-white\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n    <div class=\"toast-body\">\n      <button type=\"button\" class=\"btn-close float-end\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n      ").concat(msg, "\n    </div>\n    </div>")).css('zIndex', '1100').appendTo(document.body);
  new Toast(document.getElementById("notificationToast")).show();
}

function triggerFileChanger(e) {
  var _window$maxUpload;

  e.preventDefault();
  var target_class = e.currentTarget.dataset.targetclass;
  var target = document.querySelector(".".concat(target_class));
  var maxUpload = (_window$maxUpload = window.maxUpload) !== null && _window$maxUpload !== void 0 ? _window$maxUpload : 5;

  if (target.files.length >= maxUpload) {
    showCanvass("You can (and should) only select a maximum of ".concat(maxUpload, " image(s) for upload"));
    return;
  } //The goal is to grab any previously uploaded file and then attach it to this new result created below


  if (target.files.length > 0) {
    if (document.getElementById("previously_uploaded") != null) {
      document.getElementById("previously_uploaded").remove();
    }

    var clonedNode = target.cloneNode(true);
    clonedNode.id = "previously_uploaded";
    clonedNode.removeAttribute("name");
    clonedNode.classList.remove(target_class);
    document.body.appendChild(clonedNode);
  }

  var event = new MouseEvent("click");
  target.dispatchEvent(event);
}

function isImage(file) {
  return file.type.split("/")[0] == 'image' ? true : false;
}

function defaultFormats() {
  return localStorage.getItem('mmuo_formats') ? JSON.parse(localStorage.getItem('mmuo_formats')) : ["image/jpeg", "image/png", "image/gif", "image/webp"];
}

function acceptedFormats() {
  var formats = defaultFormats();
  var fileFormats = [];

  for (var index in formats) {
    fileFormats.push(formats[index].split("/")[1]);
  }

  return fileFormats.toString();
}

function setImageUploadConfig(config) {
  var _config$size;

  localStorage.setItem('mmuo_formats', config.formats ? JSON.stringify(config.formats) : defaultFormats());
  localStorage.setItem('mmuo_size', (_config$size = config.size) !== null && _config$size !== void 0 ? _config$size : 3228267);
}

function uploadImage(e) {
  var _localStorage$getItem;

  var selectedFiles = e.currentTarget.files;
  var index = document.querySelectorAll(".remove-image").length;
  var preview_box_locator = e.currentTarget.getAttribute("data-preview");
  var preview_box = document.querySelector(".".concat(preview_box_locator));
  var acceptedDocs = defaultFormats();
  var acceptedSize = (_localStorage$getItem = localStorage.getItem('mmuo_formats')) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : 3228267;
  var imageUploaded = false;

  for (var _i = 0; _i < selectedFiles.length; _i++) {
    var size = selectedFiles[_i].size;
    var type = selectedFiles[_i].type;

    if (!acceptedDocs.includes(type)) {
      showCanvass("".concat(selectedFiles[_i].name, " is unknown. Please upload an image or file in: ").concat(acceptedFormats(), " format to continue."));

      if (isImage(selectedFiles[_i])) {
        removePhoto(_i);
      }

      break;
    }

    if (size > acceptedSize) {
      showCanvass("File size for ".concat(selectedFiles[_i].name, " too large. File must not be greater than ").concat((acceptedSize / 1024 / 1024).toFixed("0"), "MB"));

      if (isImage(selectedFiles[_i])) {
        removePhoto(_i);
      }

      break;
    }

    if (isImage(selectedFiles[_i])) {
      imageUploaded = true;
      var img = {
        src: URL.createObjectURL(selectedFiles[_i]),
        file: selectedFiles[_i],
        index: index
      };
      var div = document.createElement('div');
      div.className = 'div-for-this-photo me-2';
      div.innerHTML = "<a style='float:clear;' class='btn btn-lg remove-image' data-entry='".concat(index, "'  href='#'><span>&times;</span></a><a href='#' data-fancybox='gallery' data-caption='how it will be displayed ").concat(_i, "' class='card'><img class='card-img-top' src='").concat(img.src, "' /> </a>");
      preview_box.appendChild(div);
      index++;
    }
  }

  if (imageUploaded) {
    if (document.getElementById("previously_uploaded") != null) {
      var dt = new DataTransfer();

      var _document$getElementB = document.getElementById("previously_uploaded"),
          files = _document$getElementB.files;

      for (var i = 0; i < files.length; i++) {
        var merged_file = files[i];
        dt.items.add(merged_file);
      }

      var current_file = e.currentTarget.files;

      for (var p = 0; p < current_file.length; p++) {
        var _merged_file = current_file[p];
        dt.items.add(_merged_file);
      }

      e.currentTarget.files = dt.files;
      document.getElementById("previously_uploaded").remove(); // var found = document.querySelectorAll(".remove-image").length - 1

      document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
        listObj[currentIndex].setAttribute('data-entry', currentIndex);
      });
    }
  }
}

function removeImage(event) {
  event.preventDefault();
  var currentButton = event.currentTarget;
  var index = currentButton.dataset.entry;
  var dt = new DataTransfer();
  var input = document.querySelector('.image');

  for (var i = 0; i < input.files.length; i++) {
    var file = input.files[i];

    if (index != i) {
      dt.items.add(file); // here you exclude the file. thus removing it.
    }
  }

  input.files = dt.files; // Assign the updates list

  currentButton.parentElement.remove();
  document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
    listObj[currentIndex].setAttribute('data-entry', currentIndex);
  });
}

function removePhoto(index) {
  var dt = new DataTransfer();
  var input = document.getElementById('image');
  var files = input.files;

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
  }

  input.files = dt.files; // Assign the updates list

  document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
    listObj[currentIndex].setAttribute('data-entry', currentIndex);
  }); // var found = $(document).find('.remove-image').length - 1;
  // $(document).find('.remove-image').each(function (k) {
  // 		    $(this).attr('data-entry', found - k)
  // 	    })
}

function alertBeforeRunning(event) {
  event.preventDefault();
  var clickedLink = event.currentTarget;
  var href = clickedLink.getAttribute("href");
  var classToUse = clickedLink.dataset.classname || "remove";
  var textWord = clickedLink.text || "Continue";
  var caption = clickedLink.dataset.caption || "Shall we?"; //incase an event needs to be sent to the component for more action(s) to be carried out

  var bc = clickedLink.dataset.bc || null;
  showAlert(caption, href, textWord, classToUse, bc);
}

function openAsModal(event) {
  event.preventDefault();

  if (document.querySelector(".close-mmuo-modal")) {
    document.querySelector(".close-mmuo-modal").click();
  }

  showSpinner();
  var clickedLink = event.currentTarget;
  var href = clickedLink.getAttribute("href");

  if (!href || href == "#") {
    removeSpinner();
    return;
  }

  axios.request({
    url: href,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
  }).then(function (response) {
    if (document.querySelector(".mmuo-modal") != null) {
      new Modal(document.getElementById('mmuo-modal')).hide();
      document.querySelector(".mmuo-modal").remove();
    }

    var shrink = clickedLink.dataset.shrink;
    var backdrop = clickedLink.dataset.static;
    var element = document.createElement("div");
    element.className = "modal fade mmuo-modal";
    element.id = 'mmuo-modal';
    element.setAttribute('tabindex', -1);
    element.setAttribute('aria-labelledby', 'mmuoModal');
    element.setAttribute('aria-hidden', 'true');

    if (backdrop) {
      element.setAttribute('data-bs-backdrop', 'static');
    }

    element.setAttribute('role', 'dialog');
    element.innerHTML = "\n                        <div class='modal-dialog ".concat(!shrink ? 'modal-xl' : null, "'> \n                            <div class='modal-content'> <div class='modal-header'> \n                            <button type='button' class='close-mmuo-modal btn-close' data-bs-dismiss='modal' aria-hidden='true' aria-label='Close'></button>\n                            </div> \n                            <div class='modal-body'>\n                                ").concat(response.data, " \n                            </div> \n                        </div>");
    document.body.appendChild(element);
    var modal = new Modal(document.getElementById('mmuo-modal'));
    modal.show();
  }).catch(function (error) {
    showCanvass("<div class='text-danger'>" + error.response.data.message + "</div>");
  }).then(function () {
    removeSpinner();
  });
}

function getRequest(event) {
  event.preventDefault();

  if (document.querySelector(".close-alert")) {
    document.querySelector(".close-alert").click();
  }

  showSpinner();
  var clickedLink = event.currentTarget;
  var href = clickedLink.getAttribute("href");

  if (!href || href == "#") {
    document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, {
      detail: null
    }));
    removeSpinner();
    return;
  } else {
    axios.request({
      url: href,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    }).then(function (response) {
      document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, {
        detail: response
      }));
    }).catch(function (error) {
      var _error$response$data$, _error$response, _error$response$data, _error$data;

      clickedLink.dataset.error ? document.dispatchEvent(new CustomEvent(clickedLink.dataset.error, {
        detail: error
      })) : DisplayAsToast("<div class='text-danger'>".concat((_error$response$data$ = (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) !== null && _error$response$data$ !== void 0 ? _error$response$data$ : (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.message, "</div>"), 'error');
    }).then(function () {
      removeSpinner();
    });
  }
}

function triggerFileChangerEvent() {
  on(".select-photo", "click", triggerFileChanger);
}

function uploadImageEvent() {
  on(".image", "change", uploadImage);
}

function removeImageEvent() {
  on(".remove-image", "click", removeImage);
}

function openAsModalEvent() {
  on(".open-as-modal", "click", openAsModal);
}

function alertBeforeRunningEvent() {
  on(".pre-run", "click", alertBeforeRunning);
}

function getRequestEvent() {
  on(".run-get-request", "click", getRequest);
}

function registerEventListeners() {
  triggerFileChangerEvent();
  uploadImageEvent();
  removeImageEvent();
  openAsModalEvent(); //function to run when user attempts to run any feature that first needs coonfirmation. This replaces the native "alert" prompt of browsers.

  alertBeforeRunningEvent();
  getRequestEvent();
}

export { DisplayAsToast, alertBeforeRunning, alertBeforeRunningEvent, getRequest, getRequestEvent, openAsModalEvent, registerEventListeners, removeImageEvent, removeSpinner, setImageUploadConfig, showAlert, showCanvass, showSpinner, triggerFileChangerEvent, uploadImageEvent };

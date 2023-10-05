import { checkParent, removeElement, insertAfter, on } from 'mmuo';

function showCanvass(msg) {
  //Just in case one have been created already, we remove it
  if (document.querySelector("#offcanvasBottom") != null) {
    document.querySelector("#offcanvasBottom").remove();
  }

  var div = document.createElement('div');
  div.className = 'offcanvas offcanvas-bottom';
  div.id = 'offcanvasBottom';
  div.setAttribute('tabindex', -1);
  div.setAttribute('aria-labelledby', 'offcanvasBottomLabel');
  div.innerHTML = "<div class='offcanvas-header d-flex justify-content-center'>\n        <h5 class='offcanvas-title text-center' id='offcanvasBottomLabel'>".concat(msg, "</h5>\n      </div>");
  div.style.height = "80px";
  document.body.appendChild(div);
  new bootstrap.Offcanvas(document.getElementById("offcanvasBottom")).show();
}

function showSpinner() {
  //Just in case one have been created already, we remove it
  if (document.querySelector(".spinner-div") != null) {
    document.querySelector(".spinner-div").remove();
  }

  var div = document.createElement('div');
  div.className = 'd-flex justify-content-center spinner-div';
  div.innerHTML = "<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span></div";
  document.body.appendChild(div);
}

function removeSpinner() {
  //Just in case one have been created already, we remove it
  if (document.querySelector(".spinner-div") != null) {
    document.querySelector(".spinner-div").remove();
  }
}

function showAlert(caption, href, textWord) {
  var classToUse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var bc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  //Just in case one have been created already, we remove it
  if (document.querySelector(".alert-modal") != null) {
    document.querySelectorAll(".alert-modal").forEach(function (currentValue, currentIndex, listObj) {
      listObj[currentIndex].remove();
    }); //document.querySelector(".modal").remove();
  }

  var div = document.createElement('div');
  div.className = 'modal fade alert-modal';
  div.id = 'myModal';
  div.setAttribute('tabindex', -1);
  div.setAttribute('role', 'dialog');
  div.setAttribute('aria-labelledby', 'myModalLabel');
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = "<div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='btn-close' data-bs-dismiss='modal' aria-hidden='true'> </button> </div> <div class='modal-body'><div class='card'> <div class='card-body'><h5 class='card-title d-flex justify-content-center'>".concat(caption, "</h5></div><div class='card-footer'> <div class='btn-group d-flex justify-content-center' data-toggle='buttons'> <button type='button' class='close close-alert btn btn-dark btn-lg' data-bs-dismiss='modal' aria-hidden='true'>Cancel</button><a href='").concat(href, "' class='ms-2 ").concat(classToUse, " btn btn-danger btn-lg' data-bc=\"").concat(bc, "\">").concat(capitalLetters(textWord), "</a></div></div> <div id='responseArea'></div></div></div> </div></div>");
  document.body.appendChild(div);
  new bootstrap.Modal(document.getElementById("myModal")).show();
}

function DisplayAsToast(msg) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  var bgClass;

  switch (status) {
    case true:
      bgClass = 'bg-success';
      break;

    case false:
      bgClass = 'bg-danger';
      break;

    default:
      bgClass = 'bg-primary';
  } //Just in case one has been created already, we remove it


  if (document.querySelector("#notificationToastDiv") != null) {
    document.querySelector("#notificationToastDiv").remove();
  }

  var div = document.createElement('div');
  div.className = 'position-fixed top-0 end-0 p-3 d-flex justify-content-end';
  div.id = 'notificationToastDiv';
  div.style.zIndex = '1100';
  div.innerHTML = "<div id=\"notificationToast\" class=\"toast ".concat(bgClass, " text-white\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n        <div class=\"toast-body\">\n          <button type=\"button\" class=\"btn-close float-end\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n          ").concat(msg, "\n        </div>\n      </div>");
  document.body.appendChild(div);
  new bootstrap.Toast(document.getElementById("notificationToast")).show();
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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
      new bootstrap.Modal(document.getElementById('mmuo-modal')).hide();
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
    element.innerHTML = "\n                        <div class='modal-dialog ".concat(!shrink ? 'modal-xl' : null, "'> \n                            <div class='modal-content'> <div class='modal-header'> \n                            <button type='button' class='close-mmuo-modal btn-close' data-bs-dismiss='modal' aria-hidden='true' aria-label='Close'></button> \n                            </div> \n                            <div class='modal-body'>\n                                ").concat(response.data, " \n                            </div> \n                        </div>");
    document.body.appendChild(element);
    var modal = new bootstrap.Modal(document.getElementById('mmuo-modal'));
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
      showCanvass("<div class='text-danger'>" + error.response.data.message + "</div>");
    }).then(function () {
      removeSpinner();
    });
  }
}

function postRequest(event) {
  event.preventDefault();
  var this_form = event.currentTarget;
  var submit_button = this_form.querySelector("input[type='submit']") || this_form.querySelector("button[type='submit']");

  if (this_form.querySelector(".div.success")) {
    this_form.querySelector(".div.success").remove();
  }

  var div = document.createElement("div");
  div.className = "success";
  var childNode = checkParent(this_form, submit_button);
  this_form.insertBefore(div, childNode);
  var responseArea = this_form.querySelector(".success");

  if (this_form.querySelector("#hidden_content") != null) {
    this_form.querySelector("#hidden_content").value = frames["richedit"].document.body.innerHTML;
  }

  var notFilled = false; //We make sure those fields that are required are filled incase the user mistakenly skips any.

  this_form.querySelectorAll("input").forEach(function (currentValue, currentIndex, listObj) {
    var currentNode = listObj[currentIndex];

    if (currentNode.dataset.name != undefined || currentNode.getAttribute("required") != undefined) {
      if (currentNode.value == "") {
        notFilled = true;
        var name = currentNode.dataset.name || currentNode.getAttribute("name");
        currentNode.classList.remove("is-valid");
        currentNode.classList.add("is-invalid");
        responseArea.innerHTML = "<span class='text-danger'>You should fill in the " + capitalLetters(name) + " field before you proceed</span>";
        return false;
      }

      currentNode.classList.remove("is-invalid");
      currentNode.classList.add("is-valid");
    }
  });

  if (notFilled == true) {
    return false;
  }

  var sub_value = submit_button.value;
  var action = this_form.getAttribute("action");
  var method = this_form.getAttribute('method') || 'post';
  var data_to_send = new FormData(this_form);
  showSpinner();
  submit_button.value = "...in progress";
  submit_button.setAttribute("disabled", "disabled");
  var config = {
    url: action,
    method: method,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  switch (method.toLowerCase()) {
    case 'patch':
    case "put":
    case "delete":
    case "post":
      config = _objectSpread2(_objectSpread2({}, config), {}, {
        data: this_form.dataset.json ? JSON.parse(JSON.stringify(Object.fromEntries(data_to_send))) : data_to_send
      });
      break;

    default:
      config = _objectSpread2(_objectSpread2({}, config), {}, {
        params: JSON.parse(JSON.stringify(Object.fromEntries(data_to_send)))
      });
  }

  axios.request(config).then(function (response) {
    var _response$data, _response$data$messag, _response$data2;

    removeElement(this_form, ".server-response");

    if (this_form.dataset.bc) {
      document.dispatchEvent(new CustomEvent(this_form.dataset.bc, {
        detail: response
      }));
    }

    if ((_response$data = response.data) !== null && _response$data !== void 0 && (_response$data$messag = _response$data.message) !== null && _response$data$messag !== void 0 && _response$data$messag.url || (_response$data2 = response.data) !== null && _response$data2 !== void 0 && _response$data2.url) {
      var _response$data3, _response$data3$messa, _response$data4;

      var url = ((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : (_response$data3$messa = _response$data3.message) === null || _response$data3$messa === void 0 ? void 0 : _response$data3$messa.url) || ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.url);

      if (this_form.dataset.ext) {
        window.open(url, '_ext');
      } else {
        location.href = url;
      }
    } else {
      var _ref, _response$data$messag2;

      var serverResponse = (_ref = response.data.msg || ((_response$data$messag2 = response.data.message) === null || _response$data$messag2 === void 0 ? void 0 : _response$data$messag2.message) || response.data.message) !== null && _ref !== void 0 ? _ref : response.data;

      if (_typeof(serverResponse) == 'object') {
        var _submit_button$datase;

        serverResponse = (_submit_button$datase = submit_button.dataset.mSuccess) !== null && _submit_button$datase !== void 0 ? _submit_button$datase : "Operation was successful";
      }

      responseArea.innerHTML = "<span class='text-success fw-bold'>".concat(serverResponse, "</span>");
    }
  }).catch(function (error) {
    var _error$response$data$2, _ref2;

    if (!error || !error.response) {
      return;
    }

    removeElement(this_form, ".server-response");

    switch (error.response.status) {
      case 422:
        var items = error.response.data.errors;

        if (items != undefined) {
          for (var item in items) {
            //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM
            if (this_form.querySelector("[name='".concat(item, "']")) == null) {
              continue;
            }

            var sibling = this_form.querySelector("[name='".concat(item, "']")).nextElementSibling;
            var id = "".concat(item, "_mmuo");

            if (sibling == null) {
              //Then we need to create it
              var element = document.createElement("div");
              element.id = id;
              element.className = "server-response text-danger";
              insertAfter(element, this_form.querySelector("[name='".concat(item, "']")));
            } else {
              if (sibling.id != id) {
                var element = document.createElement("div");
                element.id = id;
                element.className = "server-response text-danger";
                insertAfter(element, sibling);
              }
            }

            var responseForElement = this_form.querySelector("#".concat(id));
            responseForElement.innerHTML = items[item][0];
          }

          if (items.length > 1) {
            responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>Please make sure you fill required fields in the form and try again.</span>";
          } else {
            responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>".concat(error.response.data.message, "</span>");
          }
        } else {
          var _error$response$data, _error$response$data$, _error$response$data2, _error$response$data3, _error$response$data4, _error$response$data5;

          if ((_error$response$data = error.response.data) !== null && _error$response$data !== void 0 && (_error$response$data$ = _error$response$data.message) !== null && _error$response$data$ !== void 0 && _error$response$data$.message) {
            var msg = error.response.data.message.message;
          } else if ((_error$response$data2 = error.response.data) !== null && _error$response$data2 !== void 0 && _error$response$data2.message) {
            var msg = error.response.data.message;
          } else {
            var msg = error.response.data;
          }

          responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>" + msg + "</span>";

          if ((_error$response$data3 = error.response.data) !== null && _error$response$data3 !== void 0 && (_error$response$data4 = _error$response$data3.message) !== null && _error$response$data4 !== void 0 && _error$response$data4.target || (_error$response$data5 = error.response.data) !== null && _error$response$data5 !== void 0 && _error$response$data5.target) {
            var _error$response$data6;

            var inputName = error.response.data.message.target || ((_error$response$data6 = error.response.data) === null || _error$response$data6 === void 0 ? void 0 : _error$response$data6.target); //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM

            if (this_form.querySelector("[name='".concat(inputName, "']")) != null) {
              var sibling = this_form.querySelector("[name='".concat(inputName, "']")).nextElementSibling;

              var _id = "".concat(inputName, "_mmuo");

              if (sibling == null) {
                //Then we need to create it
                var element = document.createElement("div");
                element.id = _id;
                element.className = "server-response text-danger fw-bold";
                insertAfter(element, this_form.querySelector("[name='".concat(inputName, "']")));
              } else {
                if (sibling.id != _id) {
                  var element = document.createElement("div");
                  element.id = _id;
                  element.className = "server-response text-danger fw-bold";
                  insertAfter(element, sibling);
                }
              }

              var responseForElement = this_form.querySelector("#".concat(_id));
              responseForElement.innerHTML = msg;
            }
          }
        }

        break;

      case 401:
        responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>" + error.response.data.message + "</span>";
        break;

      case 403:
        var forbidden = (_error$response$data$2 = error.response.data.message) !== null && _error$response$data$2 !== void 0 ? _error$response$data$2 : error.response.data;
        responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>" + forbidden + "</span>";
        break;

      case 404:
        responseArea.innerHTML = (_ref2 = "<span class='server-response text-danger fw-bold'>" + error.response.data.message) !== null && _ref2 !== void 0 ? _ref2 : error.response.data + "</span>";
        break;

      default:
        responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>There was a problem in submission. Please try again</span>";
    }
  }).then(function () {
    submit_button.value = sub_value;
    submit_button.removeAttribute("disabled");
    removeSpinner();
  });
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

function postRequestEvent() {
  on("#form .form", "submit", postRequest);
}

function registerEventListeners() {
  triggerFileChangerEvent();
  uploadImageEvent();
  removeImageEvent();
  openAsModalEvent(); //function to run when user attempts to run any feature that first needs coonfirmation. This replaces the native "alert" prompt of browsers.

  alertBeforeRunningEvent();
  getRequestEvent(); //General for all pages that use a POST submit method especially.

  postRequestEvent();
}

export { DisplayAsToast, alertBeforeRunning, alertBeforeRunningEvent, getRequest, getRequestEvent, openAsModalEvent, postRequest, postRequestEvent, registerEventListeners, removeImageEvent, removeSpinner, setImageUploadConfig, showAlert, showCanvass, showSpinner, triggerFileChangerEvent, uploadImageEvent };
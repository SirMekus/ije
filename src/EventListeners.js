import { triggerFileChanger, uploadImage, removeImage } from "./ImageUpload.js";
import { alertBeforeRunning, openAsModal, getRequest, postRequest } from "./EventCallbacks.js"
import { on } from "mmuo"

function triggerFileChangerEvent(){
    on(".select-photo", "click", triggerFileChanger);
}

function uploadImageEvent(){
    on(".image", "change", uploadImage);
}

function removeImageEvent(){
    on(".remove-image", "click", removeImage);
}

function openAsModalEvent(){
    on(".open-as-modal", "click", openAsModal);
}

function alertBeforeRunningEvent(){
    on(".pre-run", "click", alertBeforeRunning);
}

function getRequestEvent(){
    on(".run-get-request", "click", getRequest);
}

function postRequestEvent(){
    on("#form .form", "submit", postRequest);
}

function registerEventListeners() {
    triggerFileChangerEvent()

    uploadImageEvent()

    removeImageEvent()

    openAsModalEvent();

    //function to run when user attempts to run any feature that first needs coonfirmation. This replaces the native "alert" prompt of browsers.
    alertBeforeRunningEvent()

    getRequestEvent()

    //General for all pages that use a POST submit method especially.
    postRequestEvent()
}

export { registerEventListeners, triggerFileChangerEvent, uploadImageEvent, removeImageEvent, openAsModalEvent, alertBeforeRunningEvent, getRequestEvent, postRequestEvent };
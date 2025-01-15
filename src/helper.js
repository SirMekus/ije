import { element as $, capitalLetters  } from "mmuo"
import { Offcanvas, Modal, Toast } from 'bootstrap';

function showCanvass(msg) {
    //Just in case one have been created already, we remove it
    const offcanvasBottom = $('#offcanvasBottom', false);

    if(offcanvasBottom.isPresent()){
        offcanvasBottom.remove();
    }

    $('div').addClasses('offcanvas offcanvas-bottom').id('offcanvasBottom').attr('tabindex', -1)
    .attr('aria-labelledby', 'offcanvasBottomLabel')
    .html(`<div class='offcanvas-header d-flex justify-content-center'>
    <h5 class='offcanvas-title text-center' id='offcanvasBottomLabel'>${msg}</h5>
    </div>`).css('height', "80px").appendTo(document.body)

    new Offcanvas(document.getElementById("offcanvasBottom")).show();
}

function showSpinner() {
    //Just in case one have been created already, we remove i
    const spinnderDiv = $('.spinner-div', false);
    if(spinnderDiv.isPresent()){
        spinnderDiv.remove();
    }

    $('div').addClasses('d-flex justify-content-center spinner-div')
    .html(`<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span></div`).appendTo(document.body);
}

function removeSpinner() {
    //Just in case one have been created already, we remove it
    const spinnderDiv = $('.spinner-div', false);
    if(spinnderDiv.isPresent()){
        spinnderDiv.remove();
    }
}

function showAlert(caption, href, textWord, classToUse=null, bc=null) {
    //Just in case one have been created already, we remove it
    const alertModal = $('.alert-modal', false);
    if(alertModal.isPresent()){
        alertModal.remove();
    }

    $('div').id('myModal').addClasses('modal fade alert-modal').attr('tabindex', -1).attr('role', 'dialog').attr('aria-labelledby', 'myModalLabel').attr('aria-hidden', 'true')
    .html(`<div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='btn-close' data-bs-dismiss='modal' aria-hidden='true'> </button> </div> <div class='modal-body'><div class='card'> <div class='card-body'><h5 class='card-title d-flex justify-content-center'>${caption}</h5></div><div class='card-footer'> <div class='btn-group d-flex justify-content-center' data-toggle='buttons'> <button type='button' class='close close-alert btn btn-dark btn-lg' data-bs-dismiss='modal' aria-hidden='true'>Cancel</button><a href='${href}' class='ms-2 ${classToUse} text-white btn btn-danger btn-lg' data-bc="${bc}">${capitalLetters(textWord)}</a></div></div> <div id='responseArea'></div></div></div> </div></div>`).appendTo(document.body)
      
    new Modal(document.getElementById("myModal")).show();
}

function DisplayAsToast(msg, status='info') {
    let bgClass

    switch(status){
        case 'success':
            bgClass = 'bg-success'
            break;

        case 'error':
            bgClass = 'bg-danger'
            break;

        case 'warning':
            bgClass = 'bg-warning'
            break;

        // info
        default:
            bgClass = 'bg-primary'
    }

    //Just in case one has been created already, we remove it
    const notificationToastDiv = $('#notificationToastDiv', false);
    if(notificationToastDiv.isPresent()){
        notificationToastDiv.remove();
    }

    $('div').addClasses('position-fixed top-0 end-0 p-3 d-flex justify-content-end').id('notificationToastDiv')
    .html(`<div id="notificationToast" class="toast ${bgClass} text-white" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body">
      <button type="button" class="btn-close float-end" data-bs-dismiss="toast" aria-label="Close"></button>
      ${msg}
    </div>
    </div>`).css('zIndex', '1100').appendTo(document.body)

    new Toast(document.getElementById("notificationToast")).show();
}

export {showCanvass, showSpinner, removeSpinner, showAlert, DisplayAsToast}
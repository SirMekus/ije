function showCanvass(msg) {
    //Just in case one have been created already, we remove it
    if(document.querySelector("#offcanvasBottom") != null){
    document.querySelector("#offcanvasBottom").remove();
    }

    let div = document.createElement('div');
        div.className = 'offcanvas offcanvas-bottom';
        div.id = 'offcanvasBottom'
        div.setAttribute('tabindex', -1)
        div.setAttribute('aria-labelledby', 'offcanvasBottomLabel')
        div.innerHTML = `<div class='offcanvas-header d-flex justify-content-center'>
        <h5 class='offcanvas-title text-center' id='offcanvasBottomLabel'>${msg}</h5>
      </div>`;
      div.style.height = "80px";
      document.body.appendChild(div);
      
    new bootstrap.Offcanvas(document.getElementById("offcanvasBottom")).show();
}

function showSpinner() {
    //Just in case one have been created already, we remove it
    if(document.querySelector(".spinner-div") != null){
    document.querySelector(".spinner-div").remove();
    }

    let div = document.createElement('div');
        div.className = 'd-flex justify-content-center spinner-div';
        div.innerHTML = `<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span></div`;
      
    document.body.appendChild(div);
}

function removeSpinner() {
    //Just in case one have been created already, we remove it
    if(document.querySelector(".spinner-div") != null){
    document.querySelector(".spinner-div").remove();
    }
}

function showAlert(caption, href, textWord, classToUse=null, bc=null) {
    //Just in case one have been created already, we remove it
    if(document.querySelector(".alert-modal") != null){
        document.querySelectorAll(".alert-modal").forEach(function (currentValue, currentIndex, listObj) {
            listObj[currentIndex].remove();
        });
        //document.querySelector(".modal").remove();
    }

    let div = document.createElement('div');
        div.className = 'modal fade alert-modal';
        div.id = 'myModal'
        div.setAttribute('tabindex', -1)
        div.setAttribute('role', 'dialog')
        div.setAttribute('aria-labelledby', 'myModalLabel')
        div.setAttribute('aria-hidden', 'true')
        div.innerHTML = `<div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='btn-close' data-bs-dismiss='modal' aria-hidden='true'> </button> </div> <div class='modal-body'><div class='card'> <div class='card-body'><h5 class='card-title d-flex justify-content-center'>${caption}</h5></div><div class='card-footer'> <div class='btn-group d-flex justify-content-center' data-toggle='buttons'> <button type='button' class='close close-alert btn btn-dark btn-lg' data-bs-dismiss='modal' aria-hidden='true'>Cancel</button><a href='${href}' class='ms-2 ${classToUse} btn btn-danger btn-lg' data-bc="${bc}">${capitalLetters(textWord)}</a></div></div> <div id='responseArea'></div></div></div> </div></div>`;
      document.body.appendChild(div);
      
    new bootstrap.Modal(document.getElementById("myModal")).show();
}

function DisplayAsToast(msg, status='info') {
    let bgClass
    
    switch(status){
        case true:
            bgClass = 'bg-success'
            break;

        case false:
            bgClass = 'bg-danger'
            break;

        default:
            bgClass = 'bg-primary'
    }

    //Just in case one has been created already, we remove it
    if(document.querySelector("#notificationToastDiv") != null){
        document.querySelector("#notificationToastDiv").remove();
    }

    let div = document.createElement('div');
        div.className = 'position-fixed top-0 end-0 p-3 d-flex justify-content-end';
        div.id = 'notificationToastDiv'
        div.style.zIndex = '1100'
        div.innerHTML = `<div id="notificationToast" class="toast ${bgClass} text-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body">
          <button type="button" class="btn-close float-end" data-bs-dismiss="toast" aria-label="Close"></button>
          ${msg}
        </div>
      </div>`;
    
    document.body.appendChild(div);

    new bootstrap.Toast(document.getElementById("notificationToast")).show();
}

export {showCanvass, showSpinner, removeSpinner, showAlert, DisplayAsToast}
import { showAlert, showSpinner,removeSpinner,showCanvass } from "./helper.js";
import { Modal } from 'bootstrap';

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function alertBeforeRunning (event) {
    event.preventDefault();

    var clickedLink = event.currentTarget;

    var href = clickedLink.getAttribute("href");

    var classToUse = clickedLink.dataset.classname || "remove";

    var textWord = clickedLink.text || "Continue";

    var caption = clickedLink.dataset.caption || "Shall we?";

    //incase an event needs to be sent to the component for more action(s) to be carried out
    var bc = clickedLink.dataset.bc || null;

    showAlert(caption, href, textWord, classToUse, bc);
}

function openAsModal (event) {
    event.preventDefault();

    if(document.querySelector(".close-mmuo-modal")){
        document.querySelector(".close-mmuo-modal").click(); 
    }

    showSpinner()

    var clickedLink = event.currentTarget;
    
    var href = clickedLink.getAttribute("href");

    if(!href || href == "#"){
        removeSpinner()
        return
    }

    axios.request({
        url: href,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true
      }).then((response) => {
        if(document.querySelector(".mmuo-modal") != null){
            new Modal(document.getElementById('mmuo-modal')).hide();
            document.querySelector(".mmuo-modal").remove();
        }
        
        var shrink = clickedLink.dataset.shrink;
		
		var backdrop = clickedLink.dataset.static;
						
        var element = document.createElement("div");
        element.className = "modal fade mmuo-modal";
        element.id = 'mmuo-modal'
        element.setAttribute('tabindex', -1)
        element.setAttribute('aria-labelledby', 'mmuoModal')
        element.setAttribute('aria-hidden', 'true')
                        
        if(backdrop){
            element.setAttribute('data-bs-backdrop', 'static');
        }
                        
        element.setAttribute('role', 'dialog');
                        
        element.innerHTML = `
                        <div class='modal-dialog ${!shrink ? 'modal-xl' : null}'> 
                            <div class='modal-content'> <div class='modal-header'> 
                            <button type='button' class='close-mmuo-modal btn-close' data-bs-dismiss='modal' aria-hidden='true' aria-label='Close'></button>
                            </div> 
                            <div class='modal-body'>
                                ${response.data} 
                            </div> 
                        </div>`

        document.body.appendChild(element);
					   
        var modal = new Modal(document.getElementById('mmuo-modal'))
           
        modal.show()
    }).catch((error) => {
        showCanvass("<div class='text-danger'>"+error.response.data.message +"</div>")
    }).then(() => {
        removeSpinner()
    })
}

function getRequest (event) {
    event.preventDefault();

    if(document.querySelector(".close-alert")){
        document.querySelector(".close-alert").click(); 
    }

    showSpinner()

    var clickedLink = event.currentTarget;
    
    var href = clickedLink.getAttribute("href");

    if(!href || href == "#"){
        document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, { detail: null }))
        
        removeSpinner()

        return
    }
    else{
        axios.request({
            url: href,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        }).then((response) => {
            document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, { detail: response }))
        }).catch((error) => {
            showCanvass("<div class='text-danger'>"+error.response.data.message +"</div>")
        }).then(() => {
            removeSpinner()
        })
    }
}

export { alertBeforeRunning, openAsModal, getRequest };
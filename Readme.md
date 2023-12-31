# Ije

Ije is a Javascript library for making AJAX requests, alternative to native browser `alert()` function, image/file upload and many other 'utility' features that will/can be added at interval basis (or in the future) - This is why it is called **Ije** - because we're on a `journey` to making front-end development fun.

 The package does the following at the moment (but can always be extended to include more features in the future):

- Image Preview/Upload
- Replacement of native browser's `alert()` function
- Performing AJAX **GET** requests via links (and can display the result as a modal within the same page)
- Exposes some AJAX loading indicator functions which you can use for your project (Modal, Alert box, etc)
- Displays pages as Modal
- Etc.

## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Pre-built Features](#pre-built-features)
- [Registering Events](#registering-events)
- [Image Upload](#1-image-upload)
  - [Via Trigger](#via-trigger)
  - [Via Normal File Input](#via-normal-file-input)
- [Ask Before Running A Link](#5-ask-before-running-a-link)
- [Running AJAX GET Requests Via Links](#6-running-ajax-get-requests-via-links)
- [Opening Page As Modal](#8-opening-page-as-modal)
- [Bonus](#bonus)  
  - [Emitting Events](#emitting-events)
  - [Utility Functions](#utility-functions)
    - [Displaying Spinner](#displaying-spinner)
    - [Displaying Pop Up Or Alert](#displaying-pop-up-or-alert)
    - [Bottom-To-Top Popup](#bottom-to-top-popup)

## Installation and Usage

To get started all you need to do is:

```bash
npm install ije
```

and you're in. The package exposes a `registerEventListeners()` function which already has some event listeners and classes for you to just dive right in. Simply import the function into your project and use right away. Example:

```javascript
import {registerEventListeners} from "ije"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    registerEventListeners()
});
```

OR,

```javascript
window.ije = require("ije");

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    window.ije.registerEventListeners()
});
```

Or, if you prefer to link via `<script>` in HTML, especially if you don't use a bundler, then prefix the function(s) with **"`ije`"**:

```javascript
<script src="/path_to_node_module_or_installation_directory/ije/dist/ije.umd.js"></script>   
<script src="/path_to_axios_node_module_installation_directory"></script> 

<script>
    window.addEventListener("DOMContentLoaded", function() {
        ije.registerEventListeners()
    });
</script>
```

> Please note that this package requires Bootstrap (for styling) to function effectively. And if you'll work with AJAX request, this package requires Axios as well. If you use a bundler you should import these dependencies into your application and set "axios" window variables. Example:

```javascript
//app.js or main.js
window.axios = require('axios');
```

OR,

```javascript
//app.js or main.js
import axios from 'axios';

window.axios = axios;
```

Please note that the `registerEventListeners` registers multiple events in the DOM. However, there may be case(s) where you just need to register or use a single event - for instance, only AJAX POST/Form request. In this case you should just import the needed event only. The event name is usually the function name suffixed with `'Event'`.

For instance, to use only the `triggerFileChanger` event in your project you will do:

```javascript
import {triggerFileChangerEvent} from "ije"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    triggerFileChangerEvent()
});
```

It will import the function itself and also register the event so you don't have to do anything at all.

## Pre-built Features

Please note that in using this function some classes and/or ID's have already been defined and registered so all you have to do is assign any of these classes or ID's to your HTML element and you're good to go. The functions are already defined (in the `registerEventListeners` function imported earlier) and you can use them on your own if you want to create or listen to custom events on your own. The workflow, should you choose to register events on your own with a different class/ID name, should be the same:

| Class/ID | Event | Function | Description
| ----------- | ----------- | ----------- | ----------- |
| .select-photo | 'click' | `triggerFileChanger`| If you prefer to have the native file element 'replaced' (hidden actually) so that a visual, like an arrow or link, when clicked, triggers file upload then that arrow or link should have this class with a `data-targetClass="image"` attribute that points to the class name of the file input/element itself.
| .image | change | `uploadImage` | This is the file input element itself that controls file upload from client's browser. The above typically triggers it. You will ideally hide it by default but should always add the `data-preview="preview-upload"` attribute as this points to the `div' element/area where the selected content/image will be previewed.
|.remove-image | click | `removeImage` | This will typically remove any previewed image from the 'preview' `div` as well as the file input/element itself. Each previewed image comes with this button on top itself by default.
|.pre-run | click | `alertBeforeRunning` | This replaces the native `alert()` function for something more appealing and friendly. It accepts optional `data-attribute=*` such as: `data-caption=*` if you want a different caption to be displayed to the user. For instance, **"Do you truly want to log out?"**; `data-classname=*` if you want a particular **class** to be added to the link that processes the request (should the user decide to proceed). This could be a class that makes an AJAX request in the background like our `.run-get-request` (which we'll learn of next).
|.run-get-request | click | `getRequest` | Performs an AJAX GET request. If you will like to do something with the result of the request, like a redirection, etc, you can add a `data-bc="[event_name]"` attribute to the request with any value. A `[event_name]` event will be emitted on successful request with any data from server passed to the event which you should then listen to on your own and do whatever you wish with the response or result.
|#form (or .form) | click | `postRequest` | Performs an AJAX POST request. It submits everything in the form. This should be used on a HTML form. You don't have to do anything at all. However, this works best with Laravel (PHP) as some response structures/patterns have been coded in it already.

All the above functions can simply be imported and used in your project.

> Note that these are just class/ID names you can use on the fly without any configuration and that these names, if they conflict with any class/ID name already in use, can be changed to your preference. However, you will have to manually register your events.
> Also note that proper styling is done with Bootstrap so you may want to include it in your project

## Registering Events

This uses the [Mmuo](https://www.github.com/SirMekus/mmuo) package. Example:

```javascript
import {on} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    on(elementOrSelector, event, functionToRun);
    //Where:
    //element => The element or selector you want to listen on
    //event => The event you want to listen to
    //functionToRun => The function you want to run as event listener
});
```

Please refer to the [documentation](https://www.github.com/SirMekus/mmuo) for details on how to register event listeners.

## Examples

Please note that the class names specified here are optional and you are free to use your own class names. The difference is that you will have to register your events yourself using any of our functions defined in the table above.

## 1 Image Upload

- ## Via Trigger

```javascript
<div class="preview-upload">
<!-- The selected photo will be displayed here -->
</div>

<div>
<!-- Notice where the "data-targetClass=*" points to. This button will trigger the user to select file from browser -->
    <a href="#" data-targetClass="image" class="select-photo">
        <i class="fas fa-plus-circle fa-sm"></i>
    </a>
</div>

<form enctype="multipart/form-data" action="#" method="post">
    <!-- Notice where the "data-preview=*" attribute points to - the div where the selected image will be displayed -->
    <input style="display:none;" type="file" class="image"
    data-preview="preview-upload" accept="image/*" />

    <div>
        <input type="submit" value="upload" />
    </div>
</form>
```

- ## Via Normal File Input

```javascript
<div class="preview-upload">
<!-- The selected photo will be displayed here. This is very important-->
</div>

<form enctype="multipart/form-data" action="#" method="post">
    <!-- Notice where the "data-preview=*" attribute points to-->
    <input type="file" class="image"
    data-preview="preview-upload" accept="image/*" />

    <div>
        <input type="submit" value="upload" />
    </div>
</form>
```

You can control the size of the image (so it doesn't display too large or occupy your screen) by styling the `div` or container where the image will be displayed. If you come from a Bootstrap CSS framework background you can simply give it the `d-flex` class (and can center the `div` as well with appropriate styling or Bootsrap class). Example:

```html
<div class='preview-upload d-flex'>

</div>
```

To explicitly specify allowed file formats (and/or file size) for your application simply set it via the `setImageUploadConfig()` function. Only files that conform to formats in the array will be recognised. Example:

```javascript
import {setImageUploadConfig} from "ije"

setImageUploadConfig({
    formats:["image/jpeg", "image/png", "image/gif", "image/webp", "audio/mpeg"],
    size:32132212
})
```

## 2. Ask Before Running A Link

```html
<a class="pre-run" data-caption="Shall we visit our school management platform" data-classname="run-get-request" data-bc="logout" href="https://www.i-runs.com">Visit Now</a>
```

The **"pre-run"** (but you can give it a different name) class is the most important here. It is important that only this class be present unless other classes are just for styling or won't affect our process. The following are explained:

- `data-caption=*` => A message that will be displayed to the user as an instruction or warning

- `data-classname=*` => Any class you want to be added to the link that will perform the user's click action if (s)he continues the action. This may be for styling or our **"AJAX GET REQUEST"** class (which we'll touch shortly)

- `data-bc=*` (optional) => In the link that will perform the user's action you can decide whether an event should be fired when successful. We'll touch this in the documentation soon (below).

Note that these are optional and that there are defaults in place already such that you can just simply do:

```html
<a class="pre-run" href="https://www.webloit.com">Shop Now</a>
```

And it will mean the same thing using our defined values.

## 3. Running AJAX GET Requests Via Links

A simple one looks just like this (simply attach the `run-get-request` class):

```html
<a class='run-get-request' href="/delete-user">Remove</a>
```

By default, on successful completion, it won't display any information on screen. However, if it fails you'll be notified with a prompt on screen (if the request was made via AJAX). If you will like to do something on successful completion then you should add an event via the `data-bc=*` property which you can listen to and do whatever you wish.

You can also warn (or instruct) before running the request by using the strategy discussed in the previous block and then including the class that controls the AJAX GET request via `data-classname=*` like below:

```html
<a class='pre-run' data-caption="Are you sure you want to remove this user?" data-classname="run-get-request"
href="/delete-user">Remove</a>
```


Or with adding an event:

```html
<a class='pre-run' data-caption="Are you sure you want to remove this user?" data-classname="run-get-request" data-bc="user_removed" 
href="/delete-user">Remove</a>
```

The **user_removed** event will be emitted which you can then listen to in your script like so:

```javascript
document.addEventListener("user_removed", (event) => {
    //event => contains the response from server and some other properties which you should inspect to find out
});
```

---

## Utility Functions

> Please note that these functions depend on Bootstrap for operation, and are among some of the functions exposed by this package for your consumption.

---

## Displaying Spinner

You may want to indicate to user that an action is taking place. You can import and use our `showSpinner` function for this. E.g

```javascript
import {showSpinner, removeSpinner} from "ije"

showSpinner()
axios.get("http://www.example.com").then((response) => {
        //success
    }).catch((error) => {
        //nsogbu (request failure)
    }).then(() => {
        removeSpinner()
    })
```

To give your spinner a theme color you should define a CSS `--color-theme` variable in your project

## Displaying Pop Up Or Alert

This is typically used to warn or instruct a user after clicking a link before carrying the action of the link (consider it a replacement to browser's `alert()`). Simply use our `showAlert` function like so:

```javascript
import {showAlert} from "ije"

showAlert(caption, link, textWord, classToUse=null, bc=null)

//String: caption => The caption or instruction that should be displayed to the user
//String: link => The link which the user can click to continue [default] action
//String: textWord = What text the link ('a' element) should have
//String: classToUse (optional): What class(es) should be added to the link tag/element
//bc => What event should be generated when user clicks the link. This is typically used if using any of our AJAX function.
```

## Bottom-To-Top Popup

You may want to display a message to the user after/before an action and will like it to appear from below the user's screen, simply do:

```javascript
import {showCanvass} from "ije"

//You will usually want to do this when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", function() {
    //Pass your message across as argument
    showCanvass(message)
});
```

---

## Meanwhile

 You can connect with me on [LinkedIn](https://www.linkedin.com/in/sirmekus) for insightful tips and so we can grow our networks together.

 Patronise us on [i-runs](https://www.i-runs.com).

 And follow me on [Twitter](https://www.twitter.com/Sire_Mekus).

 I encourage contribution even if it's in the documentation. Thank you

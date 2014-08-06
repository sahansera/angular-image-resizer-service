'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('imageResizerApp');

services.service('ImageResizerService', function () {

    // Create an Image, when loaded pass it on to the resizer
    var imgSelectorStr = null,

        startResize = function (imgSelector) {
            imgSelectorStr = imgSelector;
            $.when(
                createImage($(imgSelector).attr('src'))).then(resize, function () {
                console.log('error');
            });
        };

    // Draw initial canvas on new canvas and half it's size
    var halfSize = function (i) {
        var canvas = document.createElement("canvas");
        canvas.width = i.width / 2;
        canvas.height = i.height / 2;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(i, 0, 0, canvas.width, canvas.height);
        return canvas;
    };

    // Creates a new image object from the src
    var createImage = function (src) {
        var deferred = $.Deferred(),
            img = new Image();

        img.onload = function () {
            deferred.resolve(img);
        };
        img.src = src;
        //console.log(src);
        return deferred.promise();
    };

    /*
     * Draw the image object on a new canvas and half the size of the canvas
     * Put the base64 data into the target image
     */
    var resize = function (image) {
        var mainCanvas = document.createElement("canvas");
        mainCanvas.width = image.width;
        mainCanvas.height = image.height;
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
        var size = 200;
        while (mainCanvas.width > size) {
            mainCanvas = halfSize(mainCanvas);
        }
        (angular.element(document.querySelector(imgSelectorStr))).attr('src', mainCanvas.toDataURL("image/jpeg"));
    };

    // Controller binding for image resizing
    this.resizeImage = function (imgSelector) {
        startResize(imgSelector);
    };
});
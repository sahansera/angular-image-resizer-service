'use strict';

/* Controllers */

angular.module('imageResizerApp')
    .controller('ImageThumbnailController', ['$scope', 'ImageResizerService',
        function ($scope, ImageResizerService) {
            $scope.resizeImage = function () {
                ImageResizerService.resizeImage('#imgSampleThumb');
            };
        }]);
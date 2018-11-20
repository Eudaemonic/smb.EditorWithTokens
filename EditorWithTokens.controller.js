angular.module("umbraco").controller("smb.editorWithTokensController",
    function($scope) {

        $scope.lastFocused;
        angular.element("textarea").focus(function() {
            $scope.lastFocused = document.activeElement;
        });

        $scope.addToken = function() {

            $scope.insertText($scope.token.value);

        };


        //http://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery
        $scope.insertText = function(text) {
            var input = $scope.lastFocused;
            console.log(input);
            if (input === undefined) {
                return;
            }
            var scrollPos = input.scrollTop;
            var pos = 0;
            var browser = ((input.selectionStart || input.selectionStart == "0")
                ? "ff"
                : (document.selection ? "ie" : false));
            if (browser == "ie") {
                input.focus();
                var range = document.selection.createRange();
                range.moveStart("character", -input.value.length);
                pos = range.text.length;
            } else if (browser == "ff") {
                pos = input.selectionStart;
            };

            var front = (input.value).substring(0, pos);
            var back = (input.value).substring(pos, input.value.length);
            input.value = front + text + back;
            pos = pos + text.length;
            if (browser == "ie") {
                input.focus();
                var range = document.selection.createRange();
                range.moveStart("character", -input.value.length);
                range.moveStart("character", pos);
                range.moveEnd("character", 0);
                range.select();
            } else if (browser == "ff") {
                input.selectionStart = pos;
                input.selectionEnd = pos;
                input.focus();
            }
            input.scrollTop = scrollPos;

            $scope.model.value = angular.element(input).val();

        };
    });









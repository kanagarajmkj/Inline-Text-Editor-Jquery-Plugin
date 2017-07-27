(function ($) {
    var editorDataAtt = 'dynamic-editor';
    $.fn.makeEditable = function (onChangeCallback) {
        var querySelector = this.selector;
        $(document).on('click focus focusin', querySelector, function (e) {
            
            $obj = $(this);
            var editorId = $obj.data(editorDataAtt);
            if (!editorId)
                AddEditor($obj, onChangeCallback);    
            editorId = $obj.data(editorDataAtt);
            $editor = $('#' + editorId);
            $editor.width($obj.width());
            $editor.show();
            $editor.focusin();
            $obj.hide();
            e.preventDefault();
            return false;
        });
        return this;
    }
    function AddEditor($obj, onChangeCallback) {
        var dim = getElementDimentions($obj);
        var $editor = null;

        var id = guid();
        var text = createTextElement(id, dim, $obj.html());
        var $parent = $($obj.parent());
        $parent.append(text);
        $obj.data(editorDataAtt, id);
        $editor = $('#' + id);
        $editor.css({ 'color': 'black' });
        $editor.hide();

        $editor.on('blur focusout', function () {
            $obj.text($editor.val());
            if (onChangeCallback)
                onChangeCallback($obj[0]);
            $editor.hide();
            $obj.show();
        });
        $editor.on('click', function (e) {
            e.preventDefault();
            return false;
        });
    }

    function getElementDimentions($obj) {
        return { left: $obj.left, top: $obj.top, width: $obj.outerWidth(), height: $obj.outerHeight() };
    }
    function createTextElement(id, dimensions, innerContent) {
        return jQuery('<input/>', {
            id: id,
            rel: 'external',
            text: innerContent,
            value: innerContent,
            style: getStyle(dimensions.left, dimensions.top, dimensions.width, dimensions.height),
        });
    }
    function getStyle(left, top, width, height) {
        return "left:" + left + "px; top:" + top + "px; width:" + width + "px; height:" + height + "px;";
    }
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}(jQuery));
$(document).ready(function () {

    $('#btnGenString').click(function (e) {
        e.preventDefault();

        let result = '';
        let characters = ''
        const upperCh = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCh = 'abcdefghijklmnopqrstuvwxyz';
        const digits = '0123456789';
        characters += $('#uppercaseLettersChk').is(':checked') ? upperCh : ''
        characters += $('#lowercaseLettersChk').is(':checked') ? lowerCh : ''
        characters += $('#numericChk').is(':checked') ? digits : ''

        const strLength = $('#stringLength').val();
        for (let i = 0; i < strLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        $('#result').val(result)
    });

    let chkCount = 0
    $("input[type=checkbox]").click(function () {
        showBtn()
    });

    $('#stringLength').keyup(function () {
        showBtn()
    });

    $('#stringLength').click(function () {
        showBtn()
    });

    function showBtn() {
        chkCount = $("input:checked").length
        if (chkCount > 0 && $('#stringLength').val() > 0 && $('#btnGenString').css('display') == 'none') {
            $('#btnGenString').slideDown()
        }
        else if (chkCount <= 0 || $('#stringLength').val() <= 0) {
            $('#btnGenString').slideUp()
        }
    }

});

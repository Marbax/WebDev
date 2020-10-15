$(document).ready(function () {

    $('#clearAll').click(function () {
        $('body').remove()
    })

    $('.btns')
        .css('width', '100px')
        .wrap('<div>')
    $('#btn').click(function () {
        $('#kv').css({ 'width': '100px', 'height': '100px', 'background-color': 'green' })
    })
    $('#showBtn').click(function () {
        $('#someDiv').slideDown()
    })
    $('#hideBtn').click(function () {
        $('#someDiv').slideUp()
    })

    $('#hideshowBtn').click(function () {
        $('#someDiv').slideToggle()
    })
    $('#someDiv').wrap('<span>');



    $('.card').click(function () {
        $('#boyan .card .content').slideUp()
        $(this).children('.content').slideToggle()
    })


    $('.selBtn').css({ 'margin': '10px 7px', 'font-size': '2rem', 'padding': '5px 15px', 'cursor': 'pointer' })

    $('.selBtn').click(function () {
        if ($(this).hasClass('activeBtn')) {
            $('.selBtn').removeAttr('disabled').css({ 'cursor': 'pointer' })
            $(this).css({ 'box-shadow': 'none' }).removeClass('activeBtn');
        }
        else {
            $('.selBtn').attr({ 'disabled': 'true' }).css({ 'cursor': 'not-allowed' })
            $(this).css({ 'cursor': 'pointer', 'box-shadow': '0 0 40px rgba(0,0,0,0.7)' }).removeAttr('disabled').addClass('activeBtn');
        }
    })


    $('.content').append('<div>Kvadrat</div>')
});
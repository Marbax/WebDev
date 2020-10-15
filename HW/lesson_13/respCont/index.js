$(document).ready(function () {

    $('main').resize(function () {
        $('main').height(window.innerHeight)
        $('main').width(window.innerWidth);
    });
    $('main').resize()


    let panelsPerc = [.2, .8]
    $('#leftPnl').width($('main').width() * panelsPerc[0] - $('#outerSeparator').width() / 2)
    $('#leftPnl>.separator>p').css({ left: $('#leftPnl').width() / 2 });
    $('#rightPnl').width($('main').width() * panelsPerc[1] - $('#outerSeparator').width() / 2)
    $('#rightPnl>.separator>p').css({ left: $('#leftPnl').width() + $('#rightPnl').width() / 2 });

    $('#blueBl').height($('#leftPnl').height() / 2 - $('#leftPnl > .separator').height() / 2)
    $('#pinkBl').height($('#leftPnl').height() / 2 - $('#leftPnl > .separator').height() / 2)

    $('#greenBl').height($('#rightPnl').height() / 2 - $('#rightPnl > .separator').height() / 2)
    $('#orangeBl').height($('#rightPnl').height() / 2 - $('#rightPnl > .separator').height() / 2)


    let isDragging = false
    let dragable = null
    $('#leftPnl>.separator')
        .mousedown(function () {
            isDragging = true
            dragable = 'left'
        })

    $('#rightPnl>.separator')
        .mousedown(function () {
            isDragging = true
            dragable = 'right'
        })

    $('*').mousemove(function (e) {
        if (isDragging == true) {

            if (e.clientY > 100 && e.clientY < $('main').height() - 100) {

                if (dragable == 'left') {
                    leftPanelSizing(e.clientY)
                }
                else if (dragable == 'right') {
                    rightPanelSizing(e.clientY)
                }
            }
        }
    })

    $('*').mouseup(function () {
        isDragging = false
        dragable = null
    });

    function leftPanelSizing(mouseY) {
        $('#blueBl').height(mouseY - $('.separator-horizontal').height() / 2)
        $('#pinkBl').height($('#leftPnl').height() - mouseY - $('.separator-horizontal').height() / 2)
    }

    function rightPanelSizing(mouseY) {
        $('#greenBl').height(mouseY - $('.separator-horizontal').height() / 2)
        $('#orangeBl').height($('#rightPnl').height() - mouseY - $('.separator-horizontal').height() / 2)
    }

    $('#outerSeparator')
        .mousedown(function () {
            togglePanels()
        })


    function togglePanels() {
        if ($('#leftPnl').hasClass('toggled')) {
            $('#leftPnl').removeClass('toggled');
            $('#rightPnl').animate({ width: $('main').width() * panelsPerc[1] - $('#outerSeparator').width() / 2 }, 600);
            $('#leftPnl').animate({ width: 'toggle' }, 600);
            $('#leftPnl>.separator>p').animate({ left: 'toggle' }, 600);
            $('#rightPnl>.separator>p').animate({ left: $('#leftPnl').width() + $('#rightPnl').width() / 2.2 }, 600);
            $('#outerSeparator>p').text('\u2039')
        } else {
            $('#leftPnl').addClass('toggled');
            $('#leftPnl').animate({ width: 'toggle' }, 600);
            $('#rightPnl').animate({ width: $('main').width() - $('#outerSeparator').width() }, 600);
            $('#leftPnl>.separator>p').animate({ left: 'toggle' }, 500);
            $('#rightPnl>.separator>p').animate({ left: $('#rightPnl').width() / 2 }, 600);
            $('#outerSeparator>p').text('\u203A')
        }
    }


});

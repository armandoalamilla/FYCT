//Trigger del DropDown
$('.dropdown-trigger').dropdown({coverTrigger: false, alignment: 'right', constrainWidth: false });

$(function() {
    $('.card').hover(
        function() {
            $(this).find('> .card-image > img.activator').click();
        }, function() {
            $(this).find('> .card-reveal > .card-title').click();
        }
    );
})
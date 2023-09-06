// Функція для переведення на певну частину сайта при натисненні
function slowScroll(id) {
    $("html, body").animate({
        scrollTop: $(id).offset().top - 50
    }, 500);
    return false;
}

// Обробник подій, буде спрацьовувати при натисненні на нього
$(".header-top .menu").on("click", function() {
    if($("header .mobile-menu").is(":visible"))
        $(this).html('<i class="fas fa-bars"></i>');
    else
        $(this).html('<i class="fas fa-times"></i>');

    $("header .mobile-menu").slideToggle();
})

// Ф-ц. ,щоб відео відображалось при натисканні на кнопку
$('.video-play, #modal-video .close-button').on('click',function(){
    //  При натиснинні на кнопку буде відкр. модальне вікно
    $("#modal-video").toggle(); // toggle скриває або показує об'єкт
    $("body").toggleClass("overflow-hidden"); // Темнота для фону при відкритті відео
    resizeVideo();
});

// Обробка форми, відправка даних
$("#subscribe").on("click", function () {
    let email = $("#email").val();
    email = email.trim();
    if(email.split("@").length != 2 || email.split(".").length != 2) { // Якщо дані введенні менше 2 символів, буде виводити помилку
         $("#sub_form label").text("Ви ввели неправильний email");
         $("#sub_form label").fadeIn();
    }

// Ф-ц щоб пропадав підпис "Ви ввели неправильний email", через 1,5 сек
    setTimeout(function () {
        $("#sub_form label").fadeOut();
    }, 1500);
});

// При зміні ширини екрану, відео буде підлаштовуватись під екран
$(window).on('resize',function(){
    resizeVideo();
}).resize();

//  Адаптація ютуб-відео
function resizeVideo(){
    $("iframe").each(function() {
        let width = $(this).width();
        $(this).css("height", width / 1.77 + "px");
    });
}
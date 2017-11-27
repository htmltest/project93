$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('.slider-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1439,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $(window).on('load resize scroll', function() {
        if ($(window).scrollTop() > 870) {
            $('html').addClass('header-fixed');
        } else {
            $('html').removeClass('header-fixed');
        }
    });

    $('.main-history, .main-how, .service-call, .content-about, .content-contacts-inner').parallaxBackground();

    $('.services-list').isotope({
        itemSelector: '.services-item'
    });

    $('.services-header-category a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.services-header-category li.active').removeClass('active');
            $('.services-list').isotope({
                filter: curLi.data('filter')
            });
            curLi.addClass('active');
        }
        e.preventDefault();
    });

    $('.service-gallery-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLi.hasClass('active')) {
            $('.service-gallery-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.service-gallery-preview ul li').index(curLi);
            $('.service-gallery-big-list').slick('slickGoTo', curIndex);
        }
        e.preventDefault();
    });

    $('.service-gallery-big-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        adaptiveHeight: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.service-gallery-preview ul li.active').removeClass('active');
        $('.service-gallery-preview ul li').eq(nextSlide).addClass('active');
    });

    $('[data-fancybox]').fancybox({
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE       : 'Закрыть',
                NEXT        : 'Следующая',
                PREV        : 'Предыдущая',
                ERROR       : 'The requested content cannot be loaded. <br/> Please try again later.',
                PLAY_START  : 'Start slideshow',
                PLAY_STOP   : 'Pause slideshow',
                FULL_SCREEN : 'Full screen',
                THUMBS      : 'Thumbnails',
                DOWNLOAD    : 'Download',
                SHARE       : 'Share',
                ZOOM        : 'Zoom'
            },
        },
        buttons : [
            'close'
        ]
    });

    $('.service-balls-list-inner').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.menu-add-icon').click(function() {
        $('.menu-add').toggleClass('open');
    });

    $('.menu-add-close').click(function() {
        $('.menu-add').removeClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.menu-add').length == 0) {
            $('.menu-add').removeClass('open');
        }
    });

    $('.mobile-menu-link').click(function(e) {
        $('.mobile-menu').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.mobile-menu').length == 0) {
            $('.mobile-menu').removeClass('open');
        }
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    $('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });
});

$(window).on('load resize', function() {
    if ($(window).width() < 1200) {
        if (!$('.main-history-list').hasClass('slick-slider')) {
            $('.main-history-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                adaptiveHeight: true,
                dots: true
            });
        }
        if (!$('.service-stories .stories-list').hasClass('slick-slider')) {
            $('.service-stories .stories-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                adaptiveHeight: true,
                dots: false
            });
        }
        if (!$('.service-other-list').hasClass('slick-slider')) {
            $('.service-other-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                adaptiveHeight: true,
                dots: false
            });
        }
    } else {
        if ($('.main-history-list').hasClass('slick-slider')) {
            $('.main-history-list').slick('unslick');
        }
        if ($('.service-stories .stories-list').hasClass('slick-slider')) {
            $('.service-stories .stories-list').slick('unslick');
        }
        if ($('.service-other-list').hasClass('slick-slider')) {
            $('.service-other-list').slick('unslick');
        }
    }
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('focus');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function() {
        if ($(this).val() == '') {
            $(this).parent().removeClass('focus');
        }
    });

    var dateFormat = 'dd.mm.yy';
    curForm.find('.form-input-date input').datepicker({
        dateFormat: dateFormat,
        minDate: 0
    });
    window.setInterval(function() {
        $('.form-input-date input').each(function() {
            if ($(this).val() != '') {
                $(this).parent().addClass('focus');
            }
        });
    }, 100);

    $('.window #holidaySelect').change(function() {
        var curSelect = $(this);
        var holidayMonth = $('.window #holidaySelect option:selected').data('month');
        var holidayDay = $('.window #holidaySelect option:selected').data('day');
        if (typeof (holidayMonth) != 'undefined' && typeof (holidayDay) != 'undefined') {
            var curDate = new Date();
            var curYear = curDate.getFullYear();
            var curMonth = curDate.getMonth();
            var curDay = curDate.getDate();
            var newMonth = Number(String(holidayMonth).replace('0', '')) - 1;
            var newDay = Number(String(holidayDay).replace('0', ''));
            if (newMonth < curMonth) {
                curYear++;
            }
            if (newMonth == curMonth) {
                if (newDay <= curDay) {
                    curYear++;
                }
            }
            $('#holidayDate').datepicker('setDate', new Date(curYear, newMonth, newDay, 0, 0, 0, 0));
        }
    });

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });

    if (curForm.hasClass('window-form')) {
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                $(form).find('.form-loading').css({'display': 'block'});
                windowOpen($(form).attr('action'), $(form).serialize());
            }
        });
    } else {
        if (!curForm.hasClass('novalidate')) {
            curForm.validate({
                ignore: ''
            });
        }
    }
}

function windowOpen(linkWindow, dataWindow) {
    $('html').addClass('window-open');

    if ($('.window').length == 0) {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
            $('body').append('<div class="window"><div class="window-loading"></div></div>')

            $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

            if ($('.window-container img').length > 0) {
                $('.window-container img').each(function() {
                    $(this).attr('src', $(this).attr('src'));
                });
                $('.window-container').data('curImg', 0);
                $('.window-container img').load(function() {
                    var curImg = $('.window-container').data('curImg');
                    curImg++;
                    $('.window-container').data('curImg', curImg);
                    if ($('.window-container img').length == curImg) {
                        $('.window-container').removeClass('window-container-load');
                        windowPosition();
                    }
                });
            } else {
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }

            $(window).resize(function() {
                windowPosition();
            });

            $('.window-close, .window-close-link').click(function(e) {
                windowClose();
                e.preventDefault();
            });

            $('.window form').each(function() {
                initForm($(this));
            });
        }
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
    }
}
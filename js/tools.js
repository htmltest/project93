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
        var curLink = $(this);
        if (curLink.hasClass('order-link')) {
            windowOpen($(this).attr('href'), null, function() {
                var categoryCurrent = curLink.data('category');
                if (typeof (categoryCurrent) == 'undefined') {
                    categoryCurrent = '';
                }
                var holidayCurrent = curLink.data('holiday');
                if (typeof (holidayCurrent) == 'undefined') {
                    holidayCurrent = '';
                }
                if (holidayCurrent != '' && categoryCurrent == '') {
                    for (var i = 0; i < category.length; i++) {
                        var curEl = category[i];
                        var holidayList = curEl.list;
                        for (var j = 0; j < holidayList.length; j++) {
                            var curSubEl = holidayList[j];
                            if (holidayCurrent == curSubEl.value) {
                                categoryCurrent = curEl.value;
                            }
                        }
                    }
                }
                var categoryHTML = '<option value=""></option>';
                var holidayHTML = '<option value=""></option>';
                for (var i = 0; i < category.length; i++) {
                    var curEl = category[i];
                    var categorySelected = '';
                    if (categoryCurrent == curEl.value) {
                        categorySelected = ' selected="selected"';
                    }
                    categoryHTML += '<option value="' + curEl.value + '"' + categorySelected + '>' + curEl.title + '</option>';
                    if (categoryCurrent == curEl.value) {
                        var holidayList = curEl.list;
                        for (var j = 0; j < holidayList.length; j++) {
                            var curSubEl = holidayList[j];
                            var holidaySelected = '';
                            if (holidayCurrent == curSubEl.value) {
                                holidaySelected = ' selected="selected"';
                            }
                            var curHolidayMonth = '';
                            if (curSubEl.month != '') {
                                curHolidayMonth = ' data-month="' + curSubEl.month + '"';
                            }
                            var curHolidayDay = '';
                            if (curSubEl.day != '') {
                                curHolidayDay = ' data-day="' + curSubEl.day + '"';
                            }
                            holidayHTML += '<option value="' + curSubEl.value + '"' + curHolidayMonth + curHolidayDay + holidaySelected + '>' + curSubEl.title + '</option>';
                        }
                    }
                }
                $('.window #categorySelect').html(categoryHTML);
                $('.window #holidaySelect').html(holidayHTML);
            });
        } else {
            windowOpen($(this).attr('href'));
        }
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
                breakpoint: 1281,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $(window).on('load resize scroll', function() {
        if ($(window).scrollTop() > 830) {
            $('html').addClass('header-fixed');
        } else {
            $('html').removeClass('header-fixed');
        }
    });

    $('.main-history, .main-how, .service-call, .content-about, .content-contacts-inner').parallaxBackground();

    var curCount = 0;
    $('.services-list').isotope({
        itemSelector: '.services-item',
        filter: function() {
            var number = $(this).find('.number').text();
            curCount++;
            if (curCount < 13) {
                return true;
            } else {
                return false;
            }
        }
    });

    $('.services-header-category a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.services-header-category li.active').removeClass('active');
            var curFilter = curLi.data('filter').replace('.', '');
            curCount = 0;
            $('.services-list').isotope({
                filter: function() {
                    var number = $(this).find('.number').text();
                    if ($(this).hasClass(curFilter)) {
                        curCount++;
                        if (curCount < 13) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
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

    $(window).on('load resize', function() {
        if ($('.service-gallery-big-list').length > 0) {
            var curIndex = 0;
            if ($('.service-gallery-big-list').hasClass('slick-slider')) {
                curIndex = $('.service-gallery-big-list').slick('slickCurrentSlide');
                $('.service-gallery-big-list').slick('unslick');
            }
            var curHeight = $(window).height() - 289;
            if (curHeight < 200) {
                curHeight = 200;
            }
            $('.service-gallery-big-item').css({'height': curHeight});

            $('.service-gallery-big-list').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                adaptiveHeight: true,
                dots: false,
                initialSlide: curIndex,
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
        }
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
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
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

    $('.window #categorySelect').change(function() {
        var curValue = $(this).val();
        var holidayHTML = '<option value=""></option>';
        for (var i = 0; i < category.length; i++) {
            var curEl = category[i];
            if (curValue == curEl.value) {
                var holidayList = curEl.list;
                for (var j = 0; j < holidayList.length; j++) {
                    var curSubEl = holidayList[j];
                    var curHolidayMonth = '';
                    if (curSubEl.month != '') {
                        curHolidayMonth = ' data-month="' + curSubEl.month + '"';
                    }
                    var curHolidayDay = '';
                    if (curSubEl.day != '') {
                        curHolidayDay = ' data-day="' + curSubEl.day + '"';
                    }
                    holidayHTML += '<option value="' + curSubEl.value + '"' + curHolidayMonth + curHolidayDay + '>' + curSubEl.title + '</option>';
                }
            }
        }
        $('.window #holidaySelect').html(holidayHTML);
        $('.window #holidaySelect').trigger('chosen:updated');
    });

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

function windowOpen(linkWindow, dataWindow, callbackWindow) {
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
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
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

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
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
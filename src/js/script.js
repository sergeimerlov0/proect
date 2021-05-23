$(document).ready(function(){
    $('.carusel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        dotsClass: 'slick-dots',
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/arrow/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                
                    
            }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      $('.catalog-item__link').each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      })

      $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })

    //modal

    $('[data-modal=consultacion]').on('click', function() {
        $('.overlay, #consultacion').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultacion, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    $('.#order form').validate();
    $('#consultacion form').validate({
        rules: {
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            }
        }
    });
    $('#consultacion-form').validate();

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
    
  });
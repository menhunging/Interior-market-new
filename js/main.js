let positionMobileBtnFilter = null; // переменная для кнопки вызова фильтра
let positionAnchorFixed = null;
let responsive1199 = 1199;
let responsive1023 = 1023;
let responsive739 = 739;
let responsive639 = 639;
let responsive374 = 374;

var VIDEO_ID = null; // для запуска видео с ютуба

addEventListener("scroll", (event) => {
  currentScroll = $(window).scrollTop();

  // console.log("currentScroll", currentScroll);

  if (currentScroll > 200) {
    $(".header").addClass("fixed");
    $(".main").addClass("headerFixed");
  } else {
    $(".header").removeClass("fixed");
    $(".main").removeClass("headerFixed");
  }

  if ($(window).width() <= responsive1199) {
    if ($(".mobile-filter").length > 0) {
      fixedMobileBtnFilter();
    }
  }

  fixedAnchor();
});

$(document).ready(function () {
  if ($(".burger").length > 0) {
    let menuInvis = $(".menu-invis");
    let body = $("body");
    let overlay = $(".menu-overlay");

    $(".burger").on("click", function () {
      if (menuInvis.hasClass("opened")) {
        menuInvis.removeClass("opened");
        body.removeClass("hidden");
        overlay.removeClass("opened");
        $(document).off("mouseup");
      } else {
        menuInvis.addClass("opened");
        body.addClass("hidden");
        overlay.addClass("opened");

        $(document).mouseup(function (e) {
          if (
            !menuInvis.is(e.target) &&
            menuInvis.has(e.target).length === 0 &&
            !$(".burger").is(e.target)
          ) {
            body.removeClass("hidden");
            overlay.removeClass("opened");
            menuInvis.removeClass("opened");
            $(document).off("mouseup");
          }
        });
      }
    });
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".footer").length > 0) {
    if ($(window).width() <= responsive1199) {
      initAccardeon(".footer");
    }
  }

  if ($(".product-info__details").length > 0) {
    initAccardeon(".product-info__details");
  }

  if ($(".video").length > 0) {
    $(".video__btn--full").on("click", function () {
      if ($(this).parents(".video").find("video").length > 0) {
        let elem = $(this).parents(".video").find("video")[0];
        openFullVideo(elem);
      }
    });

    $(".video__btn--volume").on("click", function () {
      if ($(this).parents(".video").find("video").length > 0) {
        let elem = $(this).parents(".video").find("video");
        let isMuted = elem.prop("muted");
        elem.prop("muted", isMuted);

        $(this).toggleClass("mute");
      }
    });

    $(".video__btn--play").on("click", function () {
      let self = $(this);

      if ($(this).parents(".video").find("video").length > 0) {
        let elem = $(this).parents(".video").find("video");
        self.toggleClass("paused");
        self.hasClass("paused") ? elem.trigger("play") : elem.trigger("pause");
      }
    });
  }

  if ($(".video-iframe").length > 0) {
    let src = $(".video-iframe").attr("data-src");
    VIDEO_ID = src.split("embed/").pop();
  }

  if ($(".products__slider").length > 0) {
    const sliders = document.querySelectorAll(".products__slider");
    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 4,
            spaceBetween: 32,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            on: {
              init: function (swiper) {},
              slideChange: function (swiper) {},
            },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              350: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              740: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 4,
              },
              1441: {
                slidesPerView: 4.68,
              },
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }

  if ($("select").length > 0) {
    $("select").map(function () {
      $(this).selectric({
        onOpen: function (element) {},
        onChange: function (element) {
          if ($(element).attr("id") == "product-count") {
            window.location.href = $(this).val();
          }
        },
        onClose: function (element) {},
      });
    });
  }

  if ($(".catalog-collections").length > 0) {
    initCollection($(".catalog-collections"));
  }

  if ($(".caterogy-title").length > 0) {
    if ($(window).width() <= responsive1199) {
      wrapText("mobile");
    } else {
      wrapText("desktop");
    }
  }

  if ($(".mobile-filter").length > 0) {
    positionMobileBtnFilter = getPositionBtnFilter($(".mobile-filter"));

    $(".mobile-filter").on("click", function () {
      let section = $(".filter-section");
      let catalogLeft = $(".catalog__leftSide");
      let body = $("body");

      if (section.hasClass("opened")) {
        section.removeClass("opened");
        catalogLeft.removeClass("overlay");
        body.removeClass("hidden");
      } else {
        section.addClass("opened");
        catalogLeft.addClass("overlay");
        body.addClass("hidden");

        $(document).mouseup(function (e) {
          if (
            !section.is(e.target) &&
            section.has(e.target).length === 0 &&
            !$(".mobile-filter").is(e.target)
          ) {
            section.removeClass("opened");
            catalogLeft.removeClass("overlay");
            body.removeClass("hidden");
            $(document).off("mouseup");
          }
        });
      }
    });
  }

  if ($(".article-anchor").length > 0) {
    let sections = $(".step-text");

    let posSection = [];

    positionAnchorFixed =
      $(".article-anchor").offset().top + $(".article-anchor").height();

    sections.each(function (i, el) {
      posSection.push({
        id: $(el).attr("id"),
        pos: $(el).offset().top - 150,
      });
    });

    $(".article-anchor a").on("click", function (event) {
      event.preventDefault();

      let id = $(this).attr("href");
      let top = $(id).offset().top - 80;

      console.log(id);

      $("body,html").animate({ scrollTop: top }, 300);
    });

    $(window).scroll(function () {
      sections.each(function (i, el) {
        let top = $(el).offset().top;
        let bottom = top + $(el).height();
        let scroll = $(window).scrollTop();
        let id = $(el).attr("id");

        if (scroll > top && scroll < bottom) {
          $(".article-anchor a.active").removeClass("active");
          $('.article-anchor a[href="#' + id + '"]').addClass("active");
        }
      });
    });
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      $(this).inputmask({
        mask: "+7(999) 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    });
  }

  if ($(".count-block").length > 0) {
    $(".count-block").map(function () {
      let plus = $(this).find(".count-plus");
      let minus = $(this).find(".count-minus");
      let input = $(this).find(".input-count");
      let count = $(this).find(".input-count").val();

      plus.on("click", function (e) {
        e.preventDefault();
        count++;
        input.val(count);
      });

      minus.on("click", function (e) {
        e.preventDefault();
        count--;

        if (count <= 0) {
          count = 1;
        }

        input.val(count);
      });
    });
  }

  if ($(".btn-basket").length > 0) {
    let basketInvis = $(".basket-invis");
    let menuInvis = $(".menu-invis");
    let body = $("body");
    let overlay = $(".menu-overlay");

    $(".btn-basket").on("click", function () {
      $(document).off("mouseup");

      if (basketInvis.hasClass("opened")) {
        basketInvis.removeClass("opened");
      } else {
        menuInvis.removeClass("opened");
        basketInvis.addClass("opened");
        body.removeClass("hidden");
        overlay.removeClass("opened");

        $(document).mouseup(function (e) {
          if (
            !basketInvis.is(e.target) &&
            basketInvis.has(e.target).length === 0 &&
            !$(".btn-basket").is(e.target)
          ) {
            basketInvis.removeClass("opened");
            $(document).off("mouseup");
          }
        });
      }
    });
  }

  if ($(".btn-search").length > 0) {
    let searchInvis = $(".search-invis");

    $(document).off("mouseup");

    $(".btn-search").on("click", function () {
      if (searchInvis.hasClass("opened")) {
        searchInvis.removeClass("opened");
      } else {
        searchInvis.addClass("opened");

        $(document).mouseup(function (e) {
          if (
            !searchInvis.is(e.target) &&
            searchInvis.has(e.target).length === 0 &&
            !$(".btn-search").is(e.target)
          ) {
            searchInvis.removeClass("opened");
            $(document).off("mouseup");
          }
        });
      }
    });
  }

  if ($(".slider-caterogy").length > 0) {
    const sliders = document.querySelectorAll(".slider-caterogy");
    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 32,
            pagination: {
              el: ".swiper-pagination",
              type: "fraction",
              formatFractionCurrent: function (number) {
                return number;
              },
            },
            breakpoints: {
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 16,
              },
              744: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              850: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              1441: {
                slidesPerView: 4.68,
              },
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }

  if ($(".menu-invis").length > 0) {
    let links = $(".menu-invis .menu-link");

    links.map(function () {
      if ($(this).next("ul").length === 0) {
        $(this).addClass("not-arrow");
      }
    });

    links.on("click", function (event) {
      if (!$(this).hasClass("not-arrow")) {
        event.preventDefault();

        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).next("ul").slideUp();
        } else {
          close($(this));
          $(this).addClass("active");
          $(this).next("ul").slideDown();
        }
      }
    });

    function close(block) {
      let parentLinks = block.closest("ul").find(".menu-link");

      parentLinks.removeClass("active");
      parentLinks.next("ul").slideUp();
    }
  }

  if ($(".filter-section").length > 0) {
    let filterHead = $(".filter-head");

    filterHead.on("click", function (event) {
      event.preventDefault();

      if ($(this).hasClass("opened")) {
        $(this).removeClass("opened");
        $(this).next(".filter-body").slideUp();
      } else {
        close();
        $(this).addClass("opened");
        $(this).next(".filter-body").slideDown();
      }
    });

    function close() {
      $(".filter-body").slideUp();
      filterHead.removeClass("opened");
    }
  }

  if ($(".check-list").length > 0) {
    $(".check-list").map(function () {
      if ($(this).find(".check-block").length >= 8) {
        $(this).addClass("scroll");
      }
    });
  }

  if ($(".filter-section").length > 0) {
    initFilterSort();
  }

  if ($(".catalog-new__slider").length > 0) {
    const sliders = document.querySelectorAll(".catalog-new__slider");
    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 16,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }

  if ($(".filter-menu--category").length > 0) {
    $(".filter-menu--category .link__arrow").on("click", function () {
      let self = $(this);
      let sub = self.parents("li").find(".filter-sub");

      if (self.hasClass("active")) {
        self.removeClass("active");
        sub.stop().slideUp();
      } else {
        close();
        self.addClass("active");
        sub.stop().slideDown();
      }
    });

    function close() {
      $(".filter-menu--category .link__arrow").removeClass("active");
      $(".filter-menu--category .filter-sub").slideUp();
    }
  }

  if ($(".vacancy-list").length > 0) {
    $(".vacancy-item__head").on("click", function () {
      let parents = $(this)
        .parents(".vacancy-item")
        .find(".vacancy-item__body");

      if ($(this).hasClass("opened")) {
        $(this).removeClass("opened");
        parents.slideUp();
      } else {
        $(this).addClass("opened");
        parents.slideDown();
      }
    });
  }

  if ($(".orders-list").length > 0) {
    $(".orders-item__head").on("click", function () {
      let self = $(this);
      let parents = self.parents(".orders-item");

      if (self.hasClass("opened")) {
        self.removeClass("opened");
        parents.find(".orders-item__body").stop().slideUp();
      } else {
        self.addClass("opened");
        parents.find(".orders-item__body").stop().slideDown();
      }
    });
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,

      onShow: () => {
        $("body").addClass("modal-open");
      },

      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").map(function () {
      $(this).click((e) => e.preventDefault());
    });
  }

  if ($(".code-inputs__inputs").length > 0) {
    $(".code-inputs__inputs").map(function () {
      let countInput = $(this).find("input");

      $(countInput).on("input", function () {
        if ($(this).val() != "") {
          if ($(this).next("input")) {
            $(this).next("input").focus();
          }
        }
      });
    });

    $('input[type="number"][maxlength]').on("input", function () {
      if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
      }
    });
  }

  if ($("[data-fancybox]").length > 0) {
    Fancybox.bind("[data-fancybox]", {
      speedIn: 600,
      speedOut: 600,
      helpers: {
        media: {},
      },
    });
  }

  if ($(".article-anchor ul").length > 0) {
    $(".article-anchor ul").wrapAll($("<div class='block-blur'></div>"));
  }
});

$(document).on("fullscreenchange", function (event) {
  document.fullscreenElement
    ? event.target.setAttribute("controls", true)
    : event.target.removeAttribute("controls");
});

$(window).on("resize", function () {
  if ($(".js-head-open").length > 0) {
    if ($(window).width() >= responsive1199) {
      destroyAccardeon(".footer");
    } else {
      initAccardeon(".footer");
    }
  }

  if ($(".caterogy-title").length > 0) {
    if (
      $(window).width() <= responsive1199 &&
      !$(".caterogy-title").hasClass("wrap-js")
    ) {
      wrapText("mobile");
    } else {
      wrapText("desktop");
    }
  }

  if ($(".mobile-filter").length > 0) {
    if (
      $(window).width() <= responsive1199 &&
      !$(".mobile-filter").hasClass("fixed")
    ) {
      getPositionBtnFilter($(".mobile-filter"));
    }
  }
});

$(window).on("load", function () {
  if ($("#map").length > 0) {
    setTimeout(() => ymapsLoad(), 500);
    setTimeout(() => ymaps.ready(init), 1000);
  }

  function ymapsLoad() {
    var script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=0cec76e1-1847-46ed-a96a-c84c0917f2ad&lang=ru_RU";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.744756354739636, 37.57666889814756],
      zoom: 13,
      controls: [],
    });

    myPlacemarkWithContent = new ymaps.Placemark(
      [55.744756354739636, 37.57666889814756],
      {},
      {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: "default#imageWithContent",
        // // Своё изображение иконки метки.
        iconImageHref: "/img/placeholder.svg",
        // // Размеры метки.
        iconImageSize: [55, 55],
        // // Смещение левого верхнего угла иконки относительно
        // // её "ножки" (точки привязки).
        iconImageOffset: [-22.5, -55],
        // // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [0, 0],
      }
    );
    myMap.geoObjects.add(myPlacemarkWithContent);
    myMap.panes.get("ground").getElement().style.filter = "grayscale(100%)";
    myMap.behaviors.disable("scrollZoom");
  }
});

function initAccardeon(block) {
  if (!$(block).hasClass("accardeon-initialization")) {
    let content = $(block).find(".js-content");
    let links = $(block).find(".js-head-open");

    $(block).addClass("accardeon-initialization");

    content.stop().slideUp();
    links.removeClass("open");

    links.on("click", function () {
      if ($(this).hasClass("open")) {
        links.removeClass("open");
        content.stop().slideUp();

        $(this).siblings(".js-content").stop().slideToggle();
      } else {
        links.removeClass("open");
        content.stop().slideUp();

        $(this).addClass("open").siblings(".js-content").stop().slideToggle();
      }
    });
  }
}

function destroyAccardeon(block) {
  if ($(block).hasClass("accardeon-initialization")) {
    let content = $(block).find(".js-content");
    let links = $(block).find(".js-head-open");

    links.off("click").removeClass("open");
    content.slideDown();

    $(block).removeClass("accardeon-initialization");
  }
}

function openFullVideo(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function initCollection(block) {
  let minus = block.find(".catalog-collections__more--minus");
  let plus = block.find(".catalog-collections__more--plus");
}

function wrapText(device) {
  let html = $(".caterogy-title").html();
  $(".caterogy-title").remove();

  switch (device) {
    case "mobile":
      $(".caterogy-title").addClass("wrap-js");
      $(".catalog__rightSide").prepend(
        `<div class='caterogy-title'>${html}</div>`
      );
      break;

    case "desktop":
      $(".caterogy-title").removeClass("wrap-js");
      $(".caterory-info").prepend(`<div class='caterogy-title'>${html}</div>`);
      $(".catalog__leftSide").attr(
        "style",
        `margin-top:${$(".caterory-info").height()}px`
      );

      break;

    default:
      break;
  }
}

function getPositionBtnFilter(btn) {
  let positionBlock = btn.offset().top + btn.outerHeight();

  return positionBlock;
}

function fixedMobileBtnFilter() {
  let btnMobileFilter = $(".mobile-filter");
  let parents = btnMobileFilter.parents(".catalog__controls");

  if (currentScroll > positionMobileBtnFilter) {
    parents.css("padding-bottom", `${btnMobileFilter.outerHeight() + 12}px`);
    btnMobileFilter.addClass("fixed");
  } else {
    parents.css("padding-bottom", "0");
    btnMobileFilter.removeClass("fixed");
  }
}

function fixedAnchor() {
  let fixBlock = $(".article-anchor");

  if (currentScroll > positionAnchorFixed) {
    // parents.css("padding", `${fixBlock.outerHeight() + 48}px`);
    fixBlock.addClass("fixed");
  } else {
    // parents.css("padding-bottom", "0");
    fixBlock.removeClass("fixed");
  }
}

function initFilterSort() {
  $(".list-letters li").on("click", function (e) {
    e.preventDefault();

    if ($(this).find(".letter").hasClass("disabled")) {
      return;
    }

    $(".input-brand-filter").val("");
    $(".list-letters li").removeClass("active");
    $(this).addClass("active");

    let sortValue = $(this).text().toLowerCase();
    let brandsItems = $(".filter-brand .check-block");

    $(".check-list .letter").show();

    brandsItems.each(function () {
      let curreElem = $(this).find("label").text();
      let currArr = curreElem.toLowerCase().replace(/ /g, "").split("");
      let self = $(this);

      console.log("sortValue", sortValue, self);

      switch (sortValue) {
        case "a–z":
          self.show();
          break;

        case "#":
          $(".check-list .letter").hide();

          let str = Number(currArr[0]);
          str ? self.show() : self.hide();

          break;

        default:
          currArr[0] == sortValue ? self.show() : self.hide();

          $(".check-list .letter").each(function () {
            if ($(this).text().toLowerCase() !== sortValue) {
              $(this).hide();
            }
          });
      }
    });
  });

  $(".input-brand-filter").on("keyup", function () {
    let inputVal = $(this).val().toLowerCase(); //значение инпута

    $(".check-list .letter").hide();
    $(".list-letters li").removeClass("active");
    $(".list-letters li:first-child").addClass("active");

    setTimeout(function () {
      $(".filter-brand .check-block").each(function () {
        let chbVal = $(this).find("label").text().toLowerCase();
        chbVal.indexOf(inputVal) + 1 ? $(this).show() : $(this).hide();
      });
    }, 500);
  });
}

//Инициализация плеера для видео с ютуба
var player;
function onYouTubeIframeAPIReady() {
  if (VIDEO_ID) {
    player = new YT.Player("player", {
      width: "100%",
      height: "100%",
      playerVars: { autoplay: 0, controls: 0, showinfo: 0, rel: 0, mute: 0 },
      videoId: VIDEO_ID,
      events: {
        onReady: onPlayerReady,
      },
    });
  }
}

function onPlayerReady(event) {
  $(".video__btn--play").on("click", function () {
    !$(this).parents(".video").hasClass("clearPoster") &&
      closeVideoPoster($(this).parents(".video"));

    $(this).toggleClass("paused");
    $(this).hasClass("paused")
      ? event.target.playVideo()
      : event.target.pauseVideo();
  });

  $(".video__btn--volume").on("click", function () {
    let seft = $(this);

    if (player.getVolume() == 0) {
      player.setVolume("100");
      seft.removeClass("mute");
    } else {
      player.setVolume("0");
      seft.addClass("mute");
    }
  });

  iframe = $("#player");
  setupListener(event);
}

function setupListener(event) {
  $(".video__btn--full").on("click", () => playFullscreen(event));
}

function playFullscreen(event) {
  // event.target.playVideo();
  // $(".video__btn--play").toggleClass("paused");
  if (iframe[0].requestFullscreen) {
    iframe[0].requestFullscreen();
  } else if (iframe[0].mozRequestFullScreen) {
    iframe[0].mozRequestFullScreen();
  } else if (iframe[0].webkitRequestFullscreen) {
    iframe[0].webkitRequestFullscreen();
  } else if (iframe[0].msRequestFullscreen) {
    iframe[0].msRequestFullscreen();
  }
}

function closeVideoPoster(parents) {
  parents.addClass("clearPoster");
  $(".video-poster").hide();
}

$(document).on("click", ".cart-item-js", function (event) {
  var $self = $(this);

  var productId = $self.data('id');
  var action = $self.data('action');

  if(action == 'UpdateBasketItem'){
    var quantity = $('.basket-form .input-count[data-id="' + productId + '"]').val();
  }
  else if(action == 'UpdateBasketMiniItem') {
    var quantity = $('.basket-invis .input-count[data-id="' + productId + '"]').val();
  }
    var data = {
      id: productId,
      action: action,
      quantity:quantity
    }

    if(!action){
       data = {
        action: 'clearBasketFull',
      }
    }
  $.ajax({
    url: '/local/ajax/cart.php',
    method: 'post',
    dataType: 'html',
    data: data,
    success: function (response) {
      if(action == 'ClearBasketItem'){
        $('.basket-item[data-id="' + productId + '"]').remove();
        if($('.basket-form .basket-item').length <= 0){
            location.reload();
        }

        $('.count-basket').html(response);
      }
      else if(action == 'UpdateBasketItem' || action == 'UpdateBasketMiniItem'){

      }
      else {
        if(action){
          location.reload();
        }
        else {
          location.href = '/cart/success/';
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }

  });

});

$(document).on("submit", "#cartCheckout", function (e) {
  e.preventDefault();
  var form = $(this);
  var order = true;
  form.find('input[name="sp"]').val("nospam");
  var actionUrl = form.attr("action");
  $.ajax({
    type: "post",
    url: actionUrl,
    dataType: "html",
    data: form.serialize(),
    success: function (response) {
      form[0].reset();
      $('.clear-basket-success.cart-item-js').click();
    },
  });
});
$(document).on("click", ".catalog-collections__more--plus", function (event) {
  event.preventDefault();
  $('.collections-list li').show();
  $(this).hide();

});
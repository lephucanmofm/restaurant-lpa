document.addEventListener('DOMContentLoaded', function () {
    // handler mouse over, out reason-item--icon
    const reason_icons = document.querySelectorAll('.reason-item--icon');
    const icon_groups = document.querySelectorAll('.icon-group');

    iconMouseOver = (ele) => {

        ele.classList.add('over-active');
        ele.classList.remove('out-active');

    }
    iconMouseOut = (ele) => {
        ele.classList.add('out-active');
        ele.classList.remove('over-active');

    }
    for (let i = 0; i < reason_icons.length; i++) {
        reason_icons[i].addEventListener('mouseover', function () {
            iconMouseOver(this);
        });
        reason_icons[i].addEventListener('mouseout', function () {
            iconMouseOut(this);
        })
    }
    //end handler

    //slider deal
    $('.slider_deal').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: `<span class="btn-transfer" id="transfer-left">
        <i class="fas fa-chevron-left"></i>
        </span>`,
        nextArrow: `<span class="btn-transfer" id="transfer-right">
        <i class="fas fa-chevron-right"></i>
        </span>`,
        appendArrows: '.arrow-group'
    });

    //validate form book
    const form_book = document.forms[0];
    const name = form_book.elements['name_custormer'];
    const email = form_book.elements['mail_custormer'];
    const date = form_book.elements['date'];
    const book_now = document.getElementById('book_now');
    let now = new Date();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    let y = now.getFullYear();
    if (m < 10) {
        m = `0${m}`;
    }
    if (d < 10) {
        d = `0${d}`;
    }
    date.setAttribute('min', `${y}-${m}-${d}`);
    date.setAttribute('max', `${y}-${m}-${d}`);
    date.value = `${y}-${m}-${d}`;

    const regEmail = /[a-zA-Z0-9._$]+(@gmail.com)/;
    const regName = /[a-zA-Z]/;

    // click menu-icon-mobile
    const menu_icon = document.querySelector('.icon_menu-mobile');
    const menu_mobile = document.querySelector('.menu-mobile');
    const exit_icon = document.querySelector('.icon-exit');
    const nav_mobile__item = document.querySelectorAll('.nav-mobile--item');
    menu_icon.addEventListener('click', function (e) {
        e.preventDefault();
        menu_mobile.classList.add('show_menu');
    })
    exit_icon.addEventListener('click', function (e) {
        e.preventDefault();
        menu_mobile.classList.remove('show_menu');
    })
    for (let nav_item_mobi of nav_mobile__item) {

        nav_item_mobi.addEventListener('click', function (e) {
            e.preventDefault();
            menu_mobile.classList.remove('show_menu');
        })
    }
    //fixed_header-mobile
    window.addEventListener('scroll', function () {
        const device_width = window.innerWidth;
        const pos_scroll = window.scrollY;
        const header_top = document.querySelector('.header-top');
        const logo_scroll = document.querySelector('.brand_logo-scroll');
        const nav_app = document.querySelector('.nav-app');
        if (device_width < 768) {

            return pos_scroll > 150 ? header_top.classList.add('header-top_fixed') : header_top.classList.remove('header-top_fixed')

        } else {
            header_top.classList.remove('header-top_fixed');
            if (pos_scroll > 200) {
                header_top.classList.add('hedaer-top_hidden');
                //    logo_scroll.classList.add('brand_logo-show');
                nav_app.classList.add('nav-app-fixed');
                nav_app.classList.add('nav-app-animation');
            } else {
                header_top.classList.remove('hedaer-top_hidden');
                // logo_scroll.classList.remove('brand_logo-show');
                nav_app.classList.remove('nav-app-fixed');
                nav_app.classList.remove('nav-app-animation');
            }
        }
    })

    //====================back to Top
    const scrollTop_app = document.querySelector('.scrollTop-app');
    //handler event window scroll
    window.addEventListener('scroll', scrollFunction);
    function scrollFunction() {
        if (window.pageYOffset > 300) {
            scrollTop_app.classList.add('show_scroll');
        } else {
            scrollTop_app.classList.remove('show_scroll');
        }
    }
    //handler event click back to top
    scrollTop_app.addEventListener('click', smoothScrollBackToTop);

    //process animation back to top
    function smoothScrollBackToTop() {
        const targetPosition = 0;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 750;
        let start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }
    }
    //=======================end back to top=========================

    //====================Animation scroll easing function==================
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };
    //=======================end easing function========================


    //scroll smooth link
    const nav_links = document.querySelectorAll('.nav--link');
    const nav_mobile_links = document.querySelectorAll('.nav-mobile--link');
    function navbarLinkClick(_self) {
        smoothScroll(_self);
    }
    function smoothScroll(_self) {
        
        // console.log(_self)  // console.log(event.currentTarget) cùng kết quả với nhau
        const targetId = _self.getAttribute("href");
       
        console.log(targetId)
        const targetPosition = document.querySelector(targetId).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 750;
        let start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            // window.scrollTo(0, distance*(progress/duration) + startPosition);
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }
    }
    for (let nav_link of nav_links) {
        //   console.log(nav_item);
        nav_link.addEventListener('click', function(){
            navbarLinkClick(this);
        })
    }
    for (let nav_mobile_link of nav_mobile_links) {
        nav_mobile_link.addEventListener('click', function(){
            navbarLinkClick(this)
        });
    }
   


})
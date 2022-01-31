(function ($) {
	
	"use strict";

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	
	$('.filters ul li').click(function(){
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');
          
          var data = $(this).attr('data-filter');
          $grid.isotope({
            filter: data
          })
        });

        var $grid = $(".grid").isotope({
          itemSelector: ".all",
          percentPosition: true,
          masonry: {
            columnWidth: ".all"
          }
        });


	const Accordion = {
	  settings: {
	    // Expand the first item by default
	    first_expanded: false,
	    // Allow items to be toggled independently
	    toggle: false
	  },

	  openAccordion: function(toggle, content) {
	    if (content.children.length) {
	      toggle.classList.add("is-open");
	      let final_height = Math.floor(content.children[0].offsetHeight);
	      content.style.height = final_height + "px";
	    }
	  },

	  closeAccordion: function(toggle, content) {
	    toggle.classList.remove("is-open");
	    content.style.height = 0;
	  },

	  init: function(el) {
	    const _this = this;

	    // Override default settings with classes
	    let is_first_expanded = _this.settings.first_expanded;
	    if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
	    let is_toggle = _this.settings.toggle;
	    if (el.classList.contains("is-toggle")) is_toggle = true;

	    // Loop through the accordion's sections and set up the click behavior
	    const sections = el.getElementsByClassName("accordion");
	    const all_toggles = el.getElementsByClassName("accordion-head");
	    const all_contents = el.getElementsByClassName("accordion-body");
	    for (let i = 0; i < sections.length; i++) {
	      const section = sections[i];
	      const toggle = all_toggles[i];
	      const content = all_contents[i];

	      // Click behavior
	      toggle.addEventListener("click", function(e) {
	        if (!is_toggle) {
	          // Hide all content areas first
	          for (let a = 0; a < all_contents.length; a++) {
	            _this.closeAccordion(all_toggles[a], all_contents[a]);
	          }

	          // Expand the clicked item
	          _this.openAccordion(toggle, content);
	        } else {
	          // Toggle the clicked item
	          if (toggle.classList.contains("is-open")) {
	            _this.closeAccordion(toggle, content);
	          } else {
	            _this.openAccordion(toggle, content);
	          }
	        }
	      });

	      // Expand the first item
	      if (i === 0 && is_first_expanded) {
	        _this.openAccordion(toggle, content);
	      }
	    }
	  }
	};

	(function() {
	  // Initiate all instances on the page
	  const accordions = document.getElementsByClassName("accordions");
	  for (let i = 0; i < accordions.length; i++) {
	    Accordion.init(accordions[i]);
	  }
	})();


	$('.owl-service-item').owlCarousel({
		items:3,
		loop:true,
		dots: true,
		nav: true,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:3
			  }
		  }
	  })

	$('.owl-courses-item').owlCarousel({
		items:4,
		loop:true,
		dots: true,
		nav: true,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:4
			  }
		  }
	  })
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }


	function visible(partial) {
        var $t = partial,
            $w = jQuery(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

    }

    $(window).scroll(function() {

        if (visible($('.count-digit'))) {
            if ($('.count-digit').hasClass('counter-loaded')) return;
            $('.count-digit').addClass('counter-loaded');

            $('.count-digit').each(function() {
                var $this = $(this);
                jQuery({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        }
    })


})(window.jQuery);















/**
* Template Name: HeroBiz - v1.0.0
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
	"use strict";
  
	/**
	 * Preloader
	 */
	const preloader = document.querySelector('#preloader');
	if (preloader) {
	  window.addEventListener('load', () => {
		preloader.remove();
	  });
	}
  
	/**
	 * Sticky header on scroll
	 */
	const selectHeader = document.querySelector('#header');
	if (selectHeader) {
	  document.addEventListener('scroll', () => {
		window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
	  });
	}
  
	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = document.querySelectorAll('#navbar .scrollto');
  
	function navbarlinksActive() {
	  navbarlinks.forEach(navbarlink => {
  
		if (!navbarlink.hash) return;
  
		let section = document.querySelector(navbarlink.hash);
		if (!section) return;
  
		let position = window.scrollY;
		if (navbarlink.hash != '#header') position += 200;
  
		if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
		  navbarlink.classList.add('active');
		} else {
		  navbarlink.classList.remove('active');
		}
	  })
	}
	window.addEventListener('load', navbarlinksActive);
	document.addEventListener('scroll', navbarlinksActive);
  
	/**
	 * Function to scroll to an element with top ofset
	 */
	function scrollto(el) {
	  const selectHeader = document.querySelector('#header');
	  let offset = 0;
  
	  if (selectHeader.classList.contains('sticked')) {
		offset = document.querySelector('#header.sticked').offsetHeight;
	  } else if (selectHeader.hasAttribute('data-scrollto-offset')) {
		offset = selectHeader.offsetHeight - parseInt(selectHeader.getAttribute('data-scrollto-offset'));
	  }
	  window.scrollTo({
		top: document.querySelector(el).offsetTop - offset,
		behavior: 'smooth'
	  });
	}
  
	/**
	 * Fires the scrollto function on click to links .scrollto
	 */
	let selectScrollto = document.querySelectorAll('.scrollto');
	selectScrollto.forEach(el => el.addEventListener('click', function(event) {
	  if (document.querySelector(this.hash)) {
		event.preventDefault();
  
		let mobileNavActive = document.querySelector('.mobile-nav-active');
		if (mobileNavActive) {
		  mobileNavActive.classList.remove('mobile-nav-active');
  
		  let navbarToggle = document.querySelector('.mobile-nav-toggle');
		  navbarToggle.classList.toggle('bi-list');
		  navbarToggle.classList.toggle('bi-x');
		}
		scrollto(this.hash);
	  }
	}));
  
	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
	  if (window.location.hash) {
		if (document.querySelector(window.location.hash)) {
		  scrollto(window.location.hash);
		}
	  }
	});
  
	/**
	 * Mobile nav toggle
	 */
	const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
	if (mobileNavToogle) {
	  mobileNavToogle.addEventListener('click', function(event) {
		event.preventDefault();
  
		document.querySelector('body').classList.toggle('mobile-nav-active');
  
		this.classList.toggle('bi-list');
		this.classList.toggle('bi-x');
	  });
	}
  
	/**
	 * Toggle mobile nav dropdowns
	 */
	const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  
	navDropdowns.forEach(el => {
	  el.addEventListener('click', function(event) {
		if (document.querySelector('.mobile-nav-active')) {
		  event.preventDefault();
		  this.classList.toggle('active');
		  this.nextElementSibling.classList.toggle('dropdown-active');
  
		  let dropDownIndicator = this.querySelector('.dropdown-indicator');
		  dropDownIndicator.classList.toggle('bi-chevron-up');
		  dropDownIndicator.classList.toggle('bi-chevron-down');
		}
	  })
	});
  
	/**
	 * Auto generate the hero carousel indicators
	 */
	let heroCarouselIndicators = document.querySelector('#hero .carousel-indicators');
	if (heroCarouselIndicators) {
	  let heroCarouselItems = document.querySelectorAll('#hero .carousel-item')
  
	  heroCarouselItems.forEach((item, index) => {
		if (index === 0) {
		  heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}" class="active"></li>`;
		} else {
		  heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}"></li>`;
		}
	  });
	}
  
	/**
	 * Scroll top button
	 */
	const scrollTop = document.querySelector('.scroll-top');
	if (scrollTop) {
	  const togglescrollTop = function() {
		window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
	  }
	  window.addEventListener('load', togglescrollTop);
	  document.addEventListener('scroll', togglescrollTop);
	  scrollTop.addEventListener('click', window.scrollTo({
		top: 0,
		behavior: 'smooth'
	  }));
	}
  
	/**
	 * Initiate glightbox
	 */
	const glightbox = GLightbox({
	  selector: '.glightbox'
	});
  
	/**
	 * Porfolio isotope and filter
	 */
	let portfolionIsotope = document.querySelector('.portfolio-isotope');
  
	if (portfolionIsotope) {
  
	  let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
	  let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
	  let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';
  
	  window.addEventListener('load', () => {
		let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
		  itemSelector: '.portfolio-item',
		  layoutMode: portfolioLayout,
		  filter: portfolioFilter,
		  sortBy: portfolioSort
		});
  
		let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
		menuFilters.forEach(function(el) {
		  el.addEventListener('click', function() {
			document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
			this.classList.add('filter-active');
			portfolioIsotope.arrange({
			  filter: this.getAttribute('data-filter')
			});
			if (typeof aos_init === 'function') {
			  aos_init();
			}
		  }, false);
		});
  
	  });
  
	}
  
	/**
	 * Clients Slider
	 */
	new Swiper('.clients-slider', {
	  speed: 400,
	  loop: true,
	  autoplay: {
		delay: 5000,
		disableOnInteraction: false
	  },
	  slidesPerView: 'auto',
	  breakpoints: {
		320: {
		  slidesPerView: 2,
		  spaceBetween: 40
		},
		480: {
		  slidesPerView: 3,
		  spaceBetween: 60
		},
		640: {
		  slidesPerView: 4,
		  spaceBetween: 80
		},
		992: {
		  slidesPerView: 6,
		  spaceBetween: 120
		}
	  }
	});
  
	/**
	 * Testimonials Slider
	 */
	new Swiper('.testimonials-slider', {
	  speed: 600,
	  loop: true,
	  autoplay: {
		delay: 5000,
		disableOnInteraction: false
	  },
	  slidesPerView: 'auto',
	  pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	  }
	});
  
	/**
	 * Testimonials Slider
	 */
	new Swiper('.portfolio-details-slider', {
	  speed: 600,
	  loop: true,
	  autoplay: {
		delay: 5000,
		disableOnInteraction: false
	  },
	  slidesPerView: 'auto',
	  pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	  }
	});
  
	/**
	 * Animation on scroll function and init
	 */
	function aos_init() {
	  AOS.init({
		duration: 1000,
		easing: 'ease-in-out',
		once: true,
		mirror: false
	  });
	}
	window.addEventListener('load', () => {
	  aos_init();
	});
  
  });



    // for tab function
	
	
  function openPage(pageName, elmnt, color) {
	// Hide all elements with class="tabcontent" by default */
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Remove the background color of all tablinks/buttons
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].style.backgroundColor = "";
	}
  
	// Show the specific tab content
	document.getElementById(pageName).style.display = "block";
  
	// Add the specific color to the button used to open the tab content
	elmnt.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
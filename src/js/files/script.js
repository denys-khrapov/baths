document.addEventListener('DOMContentLoaded', documentOnReady);

function documentOnReady() {
	initSwiper();
	initHoverNewsCard();

	function initSwiper() {

		let swiperVisit = new Swiper('.slider-visit', {
			enabled: false,
			mousewheel: true,
			breakpoints: {
				1280: {
					enabled: true,
					slidesPerView: 'auto',
					spaceBetween: 48,
					loop: false,
					scrollbar: {
						el: '.swiper-scrollbar',
						draggable: true,
					},
					navigation: {
						nextEl: '.slider-visit__nav .swiper-button-next',
						prevEl: '.slider-visit__nav .swiper-button-prev',
					},
				},

			}
		})
		let swiperSelArticles = new Swiper('.slider-sel-articles', {
			mousewheel: true,
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.slider-sel-articles__nav .swiper-button-next',
				prevEl: '.slider-sel-articles__nav .swiper-button-prev',
			},
			breakpoints: {
				1280: {
					spaceBetween: 24,
				},
			}
		})

		function checkScreenWidth() {
			if (window.innerWidth <= 1279) {
				swiperVisit.destroy(true, true);
			}
		}

		checkScreenWidth();

		window.addEventListener('resize', checkScreenWidth);

	}

	let acc = document.getElementsByClassName('accordion__title')
	let accClose = document.getElementsByClassName('accordion__close')
	let accCount = document.getElementsByClassName('accordion__count')
	let i

	function closeAllExcept(activeAcc) {
		for (let j = 0; j < acc.length; j++) {
			if (acc[j] !== activeAcc) {
				acc[j].classList.remove('active')
				acc[j].nextElementSibling.style.maxHeight = null
				acc[j].closest('.accordion__wrapper').classList.remove('accordion-active')
			}
		}
	}

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', toggleAccordion)
	}

	for (i = 0; i < accClose.length; i++) {
		accClose[i].addEventListener('click', toggleAccordion)
	}

	for (i = 0; i < accCount.length; i++) {
		accCount[i].addEventListener('click', function () {
			toggleAccordion.call(this.parentNode.querySelector('.accordion__title'))
		})
	}

	function toggleAccordion() {
		let accordionContent = this.classList.contains('accordion__close') ?
				this.previousElementSibling.querySelector('.accordion__content') :
				this.nextElementSibling
		let isOpen = accordionContent.style.maxHeight
		let accordionWrapper = this.closest('.accordion__wrapper')

		closeAllExcept(accordionWrapper.querySelector('.accordion__title'))
		// let imageHolder = document.querySelector('.faq__image-holder');
		if (isOpen) {
			accordionWrapper.querySelector('.accordion__title').classList.remove('active')
			accordionContent.style.maxHeight = null
			accordionWrapper.classList.remove('accordion-active')
			// if (imageHolder) imageHolder.classList.remove('active');
		} else {
			accordionWrapper.querySelector('.accordion__title').classList.add('active')
			accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
			accordionWrapper.classList.add('accordion-active')
			// if (imageHolder) imageHolder.classList.add('active');
		}
	}

	function initHoverNewsCard() {
		let windowWidth = window.innerWidth;
		if (windowWidth >= 1280) {
			document.querySelectorAll('.slide-sel-articles').forEach(item => {
				item.addEventListener('mouseover', function () {
					this.querySelector('.slide-sel-articles__text-holder-js').style.maxHeight = '126px';
				});

				item.addEventListener('mouseout', function () {
					this.querySelector('.slide-sel-articles__text-holder-js').style.maxHeight = '63px';
				});
			});
		}
	}

}



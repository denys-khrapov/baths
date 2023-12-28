document.addEventListener('DOMContentLoaded', documentOnReady);

function documentOnReady() {
	initSwiper();

	function initSwiper() {

		let swiperVisit = new Swiper('.slider-visit', {
			enabled: false,
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
	}


}



document.addEventListener('DOMContentLoaded', documentOnReady);

function documentOnReady() {
	initSwiper();
	initHoverNewsCard();
	initPauseButton();

	function initSwiper() {

		let swiperAwards = new Swiper('.slider-awards', {
			mousewheel: true,
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.slider-awards__nav .swiper-button-next',
				prevEl: '.slider-awards__nav .swiper-button-prev',
			},
		})

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


	function toggleAccordion() {
		let accordionContent = this.classList.contains('accordion__close') ?
				this.previousElementSibling.querySelector('.accordion__content') :
				this.nextElementSibling
		let isOpen = accordionContent.style.maxHeight
		let accordionWrapper = this.closest('.accordion__wrapper')

		closeAllExcept(accordionWrapper.querySelector('.accordion__title'))
		if (isOpen) {
			accordionWrapper.querySelector('.accordion__title').classList.remove('active')
			accordionContent.style.maxHeight = null
			accordionWrapper.classList.remove('accordion-active')
		} else {
			accordionWrapper.querySelector('.accordion__title').classList.add('active')
			accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
			accordionWrapper.classList.add('accordion-active')
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

	function initPauseButton() {
		const pauseButtons = document.querySelectorAll('.pause-btn');

		pauseButtons.forEach(button => {
			button.addEventListener('click', function () {
				const video = this.closest('.experience__bg-holder').querySelector('video');
				if (video.paused) {
					video.play();
					this.classList.remove('_icon-Play');
					this.classList.add('_icon-Pause');
				} else {
					video.pause();
					this.classList.remove('_icon-Pause');
					this.classList.add('_icon-Play');
				}
			});
		});
	}

	if (window.matchMedia('(min-width: 1280px)').matches) {
		function toggleActiveClass(target) {
			const parent = target.closest('.accordion-scroll');
			if (window.getComputedStyle(target).display === 'block') {
				parent.classList.add('active');
			} else {
				parent.classList.remove('active');
			}
		}

		gsap.timeline({
			scrollTrigger: {
				trigger: '.experience',
				scrub: 0.3,
				start: 'center center',
				// markers: true,
				pin: true,
				// onStart: () => disableScroll(),
				// onComplete: () => enableScroll()
			}
		})
				.to('.accordion-scroll__content', {
					onStart: function () {
						toggleActiveClass(this.targets()[0]); // Добавляем класс, когда начинается анимация
					},
					onUpdate: function () {
						// Проверяем и обновляем классы при каждом обновлении анимации
						this.targets().forEach(target => {
							toggleActiveClass(target);
						});
					},
					onRepeat: function () {
						// Убедимся, что классы обновлены, если есть повторение
						this.targets().forEach(target => {
							toggleActiveClass(target);
						});
					},
					onReverseComplete: function () {
						// Удаляем класс, когда анимация полностью завершена в обратном направлении
						toggleActiveClass(this.targets()[0]);
					},
					display: 'block',
					duration: 1,
					ease: 'none',
					stagger: {
						each: 2,
						yoyo: true,
						repeat: 1 // Удалить, если вы не хотите, чтобы анимация повторялась
					}
				});
	} else {
		document.querySelectorAll('.accordion-scroll__title').forEach(title => {
			title.addEventListener('click', function () {
				var accordion = this.parentElement;

				if (accordion.classList.contains('active')) {
					accordion.classList.remove('active');
				} else {
					document.querySelectorAll('.accordion-scroll.active').forEach(activeAccordion => {
						activeAccordion.classList.remove('active');
					});
					accordion.classList.add('active');
				}
			});
		});

	}
}



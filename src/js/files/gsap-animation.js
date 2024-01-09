gsap.registerPlugin(ScrollTrigger)

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
		}
	})
			.to('.accordion-scroll__content', {
				onStart: function () {
					toggleActiveClass(this.targets()[0]);
				},
				onUpdate: function () {
					this.targets().forEach(target => {
						toggleActiveClass(target);
					});
				},
				onRepeat: function () {
					this.targets().forEach(target => {
						toggleActiveClass(target);
					});
				},
				onReverseComplete: function () {
					toggleActiveClass(this.targets()[0]);
				},
				display: 'block',
				duration: 1,
				ease: 'none',
				stagger: {
					each: 2,
					yoyo: true,
					repeat: 1
				}
			});
} else {
	document.querySelectorAll('.accordion-scroll__title').forEach(title => {
		title.addEventListener('click', function () {
			let accordion = this.parentElement;

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

if (document.querySelector('.skip-button')) {
	gsap.from('.skip-button', {
		scrollTrigger: {
			trigger: '.celebrities__container ',
			// markers: true,
		},
		x: 100,
		opacity: 0,
		duration: 1,
		delay: 1
	});
}
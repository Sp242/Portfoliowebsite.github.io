const header = document.querySelector("header");
window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

navlist.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menu.classList.remove('bx-x');
		navlist.classList.remove('open');
	});
});

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');
};

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.portfolio-content .row');

filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const filter = button.dataset.filter.trim().toLowerCase();

		filterButtons.forEach((item) => item.classList.remove('active'));
		button.classList.add('active');

		projectCards.forEach((card) => {
			const categories = (card.getAttribute('data-category') || '')
				.toLowerCase()
				.trim()
				.split(/[\s,]+/)
				.filter(Boolean);
			const shouldShow = filter === 'all' || categories.includes(filter);
			card.classList.toggle('hide', !shouldShow);
		});
	});
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlist a');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

window.addEventListener('scroll', () => {
	let current = '';

	sections.forEach((section) => {
		const sectionTop = section.offsetTop - 180;
		if (window.scrollY >= sectionTop) {
			current = section.getAttribute('id');
		}
	});

	navLinks.forEach((link) => {
		link.classList.remove('active');
		if (link.getAttribute('href') === `#${current}`) {
			link.classList.add('active');
		}
	});
});

if (contactForm) {
	contactForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const submitButton = contactForm.querySelector('.submit');
		const formData = new FormData(contactForm);
		const endpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

		formStatus.textContent = 'Sending message...';
		formStatus.classList.remove('error', 'success');
		submitButton.disabled = true;
		submitButton.value = 'Sending...';

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Form submission failed');
			}

			formStatus.textContent = 'Message sent successfully. I will get back to you soon.';
			formStatus.classList.add('success');
			contactForm.reset();
		} catch (error) {
			formStatus.textContent = 'Unable to send right now. Please email me directly.';
			formStatus.classList.add('error');
		} finally {
			submitButton.disabled = false;
			submitButton.value = 'Send Message';
		}
	});
}

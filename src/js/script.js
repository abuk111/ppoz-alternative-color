const burgerBtn = document.querySelector('.burger-btn')
const burgerBars = document.querySelector('.burger-bar')
const navbar = document.querySelector('.navbar')
const navbarListItem = document.querySelectorAll('.navbar__list__elements')

const nav = document.querySelector('.nav')
const allSection = document.querySelectorAll('.section')
let navHeight
let headerDarkHeight
let headerGreyHeight

const date = document.querySelector('.date')

const wrapper = document.querySelector('#wrapper')

const showNav = () => {
	navbar.classList.add('navbar-active')
	navbar.classList.remove('navbar-hide')
	burgerBars.classList.add('burger-active')
	burgerBars.classList.remove('burger-back')
}
const hideNav = () => {
	navbar.classList.remove('navbar-active')
	navbar.classList.add('navbar-hide')
	burgerBars.classList.remove('burger-active')
	burgerBars.classList.add('burger-back')
}

const navbarItemEntry = () => {
	let delayTime = 0

	navbarListItem.forEach(item => {
		item.classList.toggle('nav-entry')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const navHandling = () => {
	if (!navbar.classList.contains('navbar-active')) {
		showNav()
	} else {
		hideNav()
	}
	navbarItemEntry()
	navbarListItem.forEach(item => {
		item.addEventListener('click', hideNav)
	})
}

const handleDate = params => {
	const currentYear = new Date().getFullYear()
	date.textContent = currentYear
}

const setNavHeight = () => {
	if (window.innerWidth < 768) {
		navHeight = 85
		headerDarkHeight = 245
		headerGreyHeight = 395
	} else if (window.innerWidth >= 768) {
		navHeight = 100
		headerDarkHeight = 310
		headerGreyHeight = 450
	}
}

const headerBgAdd = () => {
	if (window.scrollY > headerDarkHeight) {
		nav.classList.add('nav-black-bgc')
		nav.classList.remove('nav-dark-bgc')
		nav.classList.remove('nav-medium-bgc')
	} else if (window.scrollY <= headerDarkHeight) {
		nav.classList.remove('nav-black-bgc')
		nav.classList.remove('nav-dark-bgc')
		nav.classList.remove('nav-medium-bgc')
	}
	if (window.scrollY > headerGreyHeight) {
		nav.classList.remove('nav-black-bgc')
		nav.classList.remove('nav-dark-bgc')
		nav.classList.add('nav-medium-bgc')
	}
}

const navBackgroundAddMobile = () => {
	const currentSection = window.scrollY
	setNavHeight()

	allSection.forEach(section => {
		if (section.classList.contains('header-bgc')) {
			headerBgAdd()
		} else if (section.classList.contains('dark-bgc') && section.offsetTop <= currentSection + navHeight) {
			nav.classList.remove('nav-black-bgc')
			nav.classList.add('nav-dark-bgc')
			nav.classList.remove('nav-medium-bgc')
		} else if (section.classList.contains('medium-bgc') && section.offsetTop <= currentSection + navHeight) {
			nav.classList.remove('nav-black-bgc')
			nav.classList.remove('nav-dark-bgc')
			nav.classList.add('nav-medium-bgc')
		}
	})
}

const navBackgroundAddDesktop = () => {
	const currentSection = window.scrollY
	setNavHeight()

	allSection.forEach(section => {
		if (section.classList.contains('medium-bgc') && section.offsetTop <= currentSection + navHeight) {
			navbar.classList.add('nav-dark-bgc')
			navbar.classList.remove('nav-medium-bgc')
		} else if ((section.classList.contains('dark-bgc') && section.offsetTop <= currentSection + navHeight) || section.classList.contains('header-bgc')) {
			navbar.classList.remove('nav-dark-bgc')
			navbar.classList.add('nav-medium-bgc')
		}
	})
}

burgerBtn.addEventListener('click', navHandling)
window.addEventListener('scroll', () => {
	if (window.innerWidth < 992) {
		navBackgroundAddMobile()
	} else {
		navBackgroundAddDesktop()
	}
})
handleDate()

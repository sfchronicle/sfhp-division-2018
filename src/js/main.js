require("./lib/social"); //Do not delete


/*var clientHeight = $(window).height();
  $('.element').css('height', clientHeight);*/

console.log("getting in main!!!")

window.addEventListener('resize', resize)
const margin = 1
const images = $(".photo-nav-item > img")
const individuals = $(".individuals")
function resize() {
	console.log("getting called")
	//console.log(images.length - 1)

	images.width((window.innerWidth - (margin*(images.length-1)))/images.length)
	$(".wrap").width(window.innerWidth)

	console.log(images[0].clientHeight)
	individuals.css("margin-top", images[0].clientHeight + 21)

}

resize()
window.addEventListener('load', function () { 
	//const photoNav = $
	const photoNavContainer = document.getElementsByClassName("photo-nav-container")[0]
	const photoNav = document.getElementsByClassName("photo-nav")[0]
	const individualsContainer = document.getElementsByClassName("individuals-container")[0]
	const fixedOffset = 37 
  window.addEventListener('scroll', (event) => {
  	console.log("scrolling")
		const photoNavContainerRect = photoNavContainer.getBoundingClientRect()
		const individualsRect = individualsContainer.getBoundingClientRect()
		//const timelineRect = timeline.getBoundingClientRect()
		const topoffset = photoNavContainerRect.top + window.pageYOffset
		const bottomoffset = individualsRect.bottom + window.pageYOffset

		if (window.pageYOffset + fixedOffset >= topoffset && window.pageYOffset <= bottomoffset - window.innerHeight/2) {
	    photoNav.classList.add("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	  } else if (window.pageYOffset > bottomoffset) {
	    photoNav.classList.remove("is_fixed")
	    photoNav.classList.remove("is_unfixed")
	    photoNav.classList.add("is_bottom")
	  } else {
	    photoNav.classList.remove("is_fixed")
	   	photoNav.classList.add("is_unfixed")
	    photoNav.classList.remove("is_bottom")
	  }
	})
})

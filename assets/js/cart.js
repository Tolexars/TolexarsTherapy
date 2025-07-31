var config = {
    apiKey: "AIzaSyAuT-RlMl5g4m96V3DtUWGFV6ym7YnMXt8",
    authDomain: "tolexars-ac868.firebaseapp.com",
    databaseURL: "https://tolexars-ac868-default-rtdb.firebaseio.com",
    projectId: "tolexars-ac868",
    storageBucket: "tolexars-ac868.appspot.com",
    messagingSenderId: "148559800786"
  };
  firebase.initializeApp(config);
		
		//initialize your firebase
		var database = firebase.database();


/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            if (sectionsClass) { // Check if sectionsClass exists (is not null)
                sectionsClass.classList.add('active-link')
            }
        }else{
            if (sectionsClass) { // Check if sectionsClass exists (is not null)
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data', {});
sr.reveal('.home__data .button', { delay: 300, origin: 'bottom' });
sr.reveal('.contact__container', { origin: 'right' });
sr.reveal('.work__container', { origin: 'left' });


//create a variable to hold our orders list from firebase
var firebaseOrdersCollection = database.ref().child('trends');

//this function is called when the submit button is clicked (not directly related to animation)
function submitOrder() {
    //Grab order data from the form
    var trends = {
        title: $('#titleField').val(),
        push: $('#pushField').val(),
        img: $('#imgField').val() // Assuming you have an image URL field
    };

    //'push' (aka add) your order to the existing list
    firebaseOrdersCollection.push(trends);
};

// Function to initialize ScrollReveal for Firebase images (gallery.html - trends)
function animateTrendsImages() {
    const trendsImages = document.querySelectorAll('.work2__container .work__container2');
    trendsImages.forEach((item, index) => {
        sr.reveal(item, { delay: 200 * (index + 1), origin: 'bottom' }); // Animate each container
    });
}

// Function to initialize ScrollReveal for team members (team.html - pros)
function animateTeamMembers() {
    const teamMembers = document.querySelectorAll('.work4__container .work__container4');
    teamMembers.forEach((member, index) => {
        sr.reveal(member, { delay: 200 * (index + 1), origin: 'bottom' });
    });
}

// Function to initialize ScrollReveal for products (gallery.html - products)
function animateProducts() {
    const products = document.querySelectorAll('.work3__container .work__container');
    products.forEach((product, index) => {
        sr.reveal(product, { delay: 200 * (index + 1), origin: 'bottom' });
    });
}

//create a 'listener' which waits for changes to the values inside the firebaseOrdersCollection (gallery.html - trends)
firebaseOrdersCollection.on('value',function(trends){

    //create an empty string that will hold our new HTML
    var allOrdersHtml = "";

    //this is saying foreach order do the following function...
    trends.forEach(function(firebaseOrderReference){

        //this gets the actual data (JSON) for the order.
        var trends = firebaseOrderReference.val();
        console.log(trends); //check your console to see it!

        //create html for the individual order
        var individialOrderHtml =   `<div class='work__container2'>
                        <img src="`+trends.img+`" alt="`+trends.title+`">
                        <h2>`+trends.title+`</h2>
                    </div>`;

        //add the individual order html to the end of the allOrdersHtml list
        allOrdersHtml = allOrdersHtml + individialOrderHtml;
    });

    //actually put the html on the page inside the element with the id PreviousOrders
    $('.work2__container').html(allOrdersHtml);

    // Initialize ScrollReveal for the dynamically loaded images AFTER they are in the DOM
    animateTrendsImages();
    sr.reveal('.work2__container', { origin: 'left' }); // Initial reveal of the container
});




/* for displaying professionals (team.html) */
var firebaseProsCollection = database.ref().child('pros');

firebaseProsCollection.on('value',function(pros){
    var allProsHtml = "";
    pros.forEach(function(firebaseProReference){
        var pros = firebaseProReference.val();
        var individialProHtml = `<div class='work__container4'>
                                    <img src="`+pros.img+`">
                                    <h2> `+pros.title+`</h2>
                                    <p> `+pros.desc+`</p>
                                </div>`;
        allProsHtml = allProsHtml + individialProHtml;
    });
    $('.work4__container').html(allProsHtml);
    animateTeamMembers(); // Animate team members after loading
    sr.reveal('.work4__container', { origin: 'left' }); // Initial reveal of the container
});






/* for displaying testimonials (testimonials.html) */
var firebaseTestsCollection = database.ref().child('tests');
const testimonialsContainer = document.getElementById('testimonials-data');
const testimonialTemplate = document.getElementById('testimonial-template');

// Function to initialize ScrollReveal for testimonials
function animateTestimonials() {
    const testimonialCards = testimonialsContainer.querySelectorAll('.testimonial__card');
    testimonialCards.forEach((card, index) => {
        sr.reveal(card, { delay: 200 * (index + 1), origin: 'bottom' });
    });
}

// Listen for changes in the 'tests' data in Firebase
firebaseTestsCollection.on('value', function(snapshot) {
    testimonialsContainer.innerHTML = ''; // Clear any existing content (including loading spinner)
    const testsData = snapshot.val();

    if (testsData) {
        Object.values(testsData).forEach(test => {
            // Clone the template
            const testimonialCard = testimonialTemplate.content.cloneNode(true);

            // Populate the cloned template with data
            const testimonialTextElement = testimonialCard.querySelector('[data-testimonial-text]');
            const testimonialNameElement = testimonialCard.querySelector('[name]');

            if (testimonialTextElement) {
                testimonialTextElement.textContent = test.text || ''; // Assuming 'text' field in Firebase
            }
            if (testimonialNameElement) {
                testimonialNameElement.textContent = test.name || ''; // Assuming 'name' field in Firebase
            }

            // Append the populated card to the container
            testimonialsContainer.appendChild(testimonialCard);
        });

        // Initialize ScrollReveal for the loaded testimonials
        animateTestimonials();
        sr.reveal('.testimonials__container', { origin: 'bottom' }); // Initial reveal of the main container
    } else {
        testimonialsContainer.textContent = 'No testimonials available.';
    }
});




// sticky threshold
const stickyContactThreshold = 10;
const stickyButton = document.getElementById('sticky-contact');
const stickyButtonCloneId = 'sticky-contact-clone';
let stickyButtonIsCloned = false;

// get current position
function getCurrentStickyButtonPosition() {
	//let rect = stickyButton.getBoundingClientRect();
	return stickyButton.getBoundingClientRect();
}

// get screen width and height
function getCurrentScreenDimensions() {
	let viewportWidth = window.innerWidth;
	let viewportHeight = window.innerHeight;
	var viewportDimensions = {
		'width': {viewportWidth},
		'height': {viewportHeight}
	};
	return viewportDimensions;
}


// Function to display the contact options dialog
function showContactOptions(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Create the dialog element
    const dialog = document.createElement('div');
    dialog.id = 'contact-options-dialog';
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = '#fff';
    dialog.style.padding = '20px';
    dialog.style.borderRadius = '5px';
    dialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    dialog.style.zIndex = '1001'; // Higher than other fixed elements
    dialog.style.display = 'flex';
    dialog.style.flexDirection = 'column';
    dialog.style.gap = '10px';
    dialog.style.alignItems = 'center';

    const title = document.createElement('h3');
    title.textContent = 'Contact Us Via:';
    dialog.appendChild(title);

    // Options
    const callOption = document.createElement('a');
    callOption.href = 'tel:+2349065038786';
    callOption.innerHTML = '<i class="bx bx-phone-call" style="font-size: 1.5rem; margin-right: 5px;"></i> Call';
    callOption.style.display = 'flex';
    callOption.style.alignItems = 'center';
    callOption.style.padding = '10px 15px';
    callOption.style.backgroundColor = '#007bff';
    callOption.style.color = '#fff';
    callOption.style.borderRadius = '5px';
    callOption.style.textDecoration = 'none';
    dialog.appendChild(callOption);

    const whatsappOption = document.createElement('a');
    whatsappOption.href = 'https://wa.me/2349065038786';
    whatsappOption.innerHTML = '<i class="bx bxl-whatsapp" style="font-size: 1.5rem; margin-right: 5px;"></i> WhatsApp';
    whatsappOption.style.display = 'flex';
    whatsappOption.style.alignItems = 'center';
    whatsappOption.style.padding = '10px 15px';
    whatsappOption.style.backgroundColor = '#25D366';
    whatsappOption.style.color = '#fff';
    whatsappOption.style.borderRadius = '5px';
    whatsappOption.style.textDecoration = 'none';
    dialog.appendChild(whatsappOption);

    const gmailOption = document.createElement('a');
    gmailOption.href = 'mailto:tolexars@gmail.com';
    gmailOption.innerHTML = '<i class="bx bxl-gmail" style="font-size: 1.5rem; margin-right: 5px;"></i> Gmail';
    gmailOption.style.display = 'flex';
    gmailOption.style.alignItems = 'center';
    gmailOption.style.padding = '10px 15px';
    gmailOption.style.backgroundColor = '#db4437';
    gmailOption.style.color = '#fff';
    gmailOption.style.borderRadius = '5px';
    gmailOption.style.textDecoration = 'none';
    dialog.appendChild(gmailOption);

    const smsOption = document.createElement('a');
    smsOption.href = 'sms:+2349065038786';
    smsOption.innerHTML = '<i class="bx bx-message-square-dots" style="font-size: 1.5rem; margin-right: 5px;"></i> SMS';
    smsOption.style.display = 'flex';
    smsOption.style.alignItems = 'center';
    smsOption.style.padding = '10px 15px';
    smsOption.style.backgroundColor = '#6c757d';
    smsOption.style.color = '#fff';
    smsOption.style.borderRadius = '5px';
    smsOption.style.textDecoration = 'none';
    dialog.appendChild(smsOption);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '8px 12px';
    closeButton.style.borderRadius = '5px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#f0f0f0';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
    dialog.appendChild(closeButton);

    // Append the dialog to the body
    document.body.appendChild(dialog);
}

// Add event listener to the sticky contact button
stickyButton.addEventListener('click', showContactOptions);

// scroll
document.addEventListener("scroll", function() {
	//console.log(rect.top, stickyContactThreshold, stickyButtonActive);
  //console.log("position", rect);
	let rect = stickyButton.getBoundingClientRect();
  if(rect.top <= stickyContactThreshold){
		if(!stickyButtonIsCloned){
			// clone
			const clonedStickyButton = stickyButton.cloneNode(true);
			clonedStickyButton.id = stickyButtonCloneId;
			// Remove the original click listener to prevent duplicate dialogs
			clonedStickyButton.removeEventListener('click', showContactOptions);
			// Add the new click listener to the clone
			clonedStickyButton.addEventListener('click', showContactOptions);
			// add stuff
			stickyButtonIsCloned = true;
			stickyButton.classList.add('issticky');
			let currentStickyButtonPosition = getCurrentStickyButtonPosition();
			clonedStickyButton.style.top = stickyContactThreshold +'px';
			clonedStickyButton.style.left = currentStickyButtonPosition.left+'px';
			clonedStickyButton.style.width = currentStickyButtonPosition.width+'px';
			clonedStickyButton.style.height = currentStickyButtonPosition.height+'px';
			let activeClone = document.body.appendChild(clonedStickyButton);
			let screenDimensions = getCurrentScreenDimensions();
			let timer = setTimeout(() => activeClone.style.cssText += 'transform: translateX('+(screenDimensions.width.viewportWidth-currentStickyButtonPosition.left-currentStickyButtonPosition.width-30)+'px) translateY('+(screenDimensions.height.viewportHeight-stickyContactThreshold-currentStickyButtonPosition.height-15)+'px);', 0);
		}
  }else{
		if(stickyButtonIsCloned){
			// remove clone
			let clonedStickyButton = document.getElementById(stickyButtonCloneId);
      // Make sure the cloned button exists before trying to remove it
      if (clonedStickyButton) {
          document.body.removeChild(clonedStickyButton);
      }
			// remove stuff
			stickyButtonIsCloned = false;
			stickyButton.classList.remove('issticky');
			}
  }
});

// resize
window.addEventListener('resize', function() {
	if(stickyButtonIsCloned){
		let currentStickyButtonPosition = getCurrentStickyButtonPosition();
		let clonedStickyButton = document.getElementById(stickyButtonCloneId);
		let screenDimensions = getCurrentScreenDimensions();
		clonedStickyButton.style.top = stickyContactThreshold +'px';
		clonedStickyButton.style.left = currentStickyButtonPosition.left+'px';
		clonedStickyButton.style.transform = 'translate('+(screenDimensions.width.viewportWidth-currentStickyButtonPosition.left-currentStickyButtonPosition.width-50)+'px,'+(screenDimensions.height.viewportHeight-stickyContactThreshold-currentStickyButtonPosition.height-35)+'px)';
	}
});

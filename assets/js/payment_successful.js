// assets/js/payment_successful.js

const urlParams = new URLSearchParams(window.location.search);
const productTitle = urlParams.get('title');
const productImg = urlParams.get('img');
const productPrice = urlParams.get('price');
const transactionReference = urlParams.get('ref');
const whatsappNumber = '2349065038786'; // Replace with your actual WhatsApp number
const recipientEmail = 'tolexars@gmail.com'; // Replace with your actual email address

const whatsappButton = document.getElementById('whatsapp-confirm-button');
const emailButton = document.getElementById('email-confirm-button'); // Get the email button

if (whatsappButton) {
    const message = `Hello, I have just completed a payment for the following item:%0A%0ATitle: ${encodeURIComponent(productTitle)}%0APrice: ${encodeURIComponent(productPrice)}%0AImage URL: ${encodeURIComponent(productImg)}%0ATransaction Reference: ${transactionReference}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    whatsappButton.href = whatsappURL;
} else {
    console.error("WhatsApp confirm button not found!");
}

if (emailButton) {
    const subject = `Order Confirmation - Transaction Ref: ${transactionReference}`;
    const body = `Dear Tolexars Team, I have just completed a payment for the following item:
    
    Title: ${productTitle} 
    
    Price: ${productPrice} 
    
    Image URL: ${productImg} 
    
    Transaction Reference: ${transactionReference}.`;
    const mailtoURL = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    emailButton.href = mailtoURL;
} else {
    console.error("Email confirm button not found!");
}

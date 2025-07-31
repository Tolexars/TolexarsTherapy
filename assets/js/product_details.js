const urlParams = new URLSearchParams(window.location.search);
const productPush = urlParams.get('push');
const productTitle = urlParams.get('title');
const productImg = urlParams.get('img');
const productPrice = urlParams.get('price');
const productDescription = urlParams.get('description');
const productDelivery = urlParams.get('delivery');
document.getElementById('product-delivery').textContent = productDelivery || 'Delivery information not available.';

const publicKey = 'pk_live_4c70eb590578eaedff80c3ea23da34d711af4fec'; // Replace with your actual Paystack public key

document.getElementById('product-title').textContent = productTitle;
document.getElementById('product-image').src = productImg;
document.getElementById('product-image').alt = productTitle;
document.getElementById('product-price').textContent = productPrice;
document.getElementById('product-description').textContent = productDescription || 'No description available.';
document.getElementById('product-delivery').textContent = productDelivery || 'Free';

const buyNowButton = document.getElementById('buy-now-button');
if (buyNowButton) {
    buyNowButton.addEventListener('click', function() {
        // For "Buy Now", we'll directly initiate the Paystack payment for a single item
        payWithPaystack();
    });
}

function payWithPaystack() {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    const unitPrice = parseFloat(productPrice.replace(/[^\d.]/g, ''));
    const amount = unitPrice * quantity * 100; // Total amount in kobo

    if (isNaN(amount) || amount <= 0) {
        alert('Invalid price or quantity.');
        return;
    }

    const handler = PaystackPop.setup({
        key: publicKey,
        email: 'dukeandvince@gmail.com', // Replace with the actual customer email or fetch it dynamically
        amount: amount,
        currency: 'NGN', // Change if your currency is different
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference
        metadata: {
            title: productTitle,
            price: productPrice, // Keeping the unit price for reference
            quantity: quantity,
            push:productPush,
            totalAmount: amount / 100, // Adding the total amount to metadata
            image: productImg,
            description: productDescription
        },
        callback: function(response){
            // This function is called after a successful payment
            alert(`Payment of ${amount / 100} successful! Transaction reference: ` + response.reference);
            // Redirect to payment_successful.html with product details and transaction reference
            window.location.href = `payment_successful.html?title=${encodeURIComponent(productTitle)}&img=${encodeURIComponent(productImg)}&price=${encodeURIComponent(productPrice)}&push=${encodeURIComponent(productPush)}&quantity=${quantity}&total=${amount / 100}&ref=${response.reference}`;
        },
        onClose: function(){
            alert('Transaction was not completed.');
        },
    });
    handler.openIframe();
}

const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
let orderButtonClickOrNot = false;
let clickedButton = null;
let price = 0;  
const orderButtons = document.querySelectorAll('.order-now');

orderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert("You ordered the food and need to fill the order form....");
        orderButtons.forEach(btn1 => btn1.classList.remove('clicked'));

        btn.classList.add("clicked");

        orderButtonClickOrNot = true;
        clickedButton = btn;

        const firstBox = btn.closest('.first-box');
        const moneyButton = firstBox.querySelector('.money');

        if (moneyButton) {
            const priceValue = moneyButton.getAttribute('data-price');
            if (priceValue) {
                price = parseInt(priceValue, 10);
            } else {
                price = 0;
            }
        } else {
            price = 0;
        }

        console.log('Price:', price); 
    });
});

const orderForm = document.querySelector('#order-form');
orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!orderButtonClickOrNot) {
        alert('Please click an "Order Now" button before submitting the form.');
        return;
    }

    const email = document.querySelector('input[type="email"]').value;
    const phoneNumber = document.querySelector('input[type="tel"]').value;
    const foodName = document.querySelector('input[placeholder="Food Name"]').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!phonePattern.test(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return; 
    }

    alert(`You ordered ${foodName}. The price is ₹${price} with free delivery.`);
    orderForm.reset();

    if (clickedButton) {
        clickedButton.classList.remove('clicked');
        clickedButton.classList.add('submitted');
        setTimeout(() => {
            clickedButton.classList.remove('submitted');
            clickedButton.classList.add('reset');
        }, 9000);
    }

    orderButtonClickOrNot = false;
});



document.addEventListener('DOMContentLoaded', function() {
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission behavior

            // In a real application, you would collect form data here
            // const name = document.querySelector('.form-input[placeholder="Your Name *"]').value;
            // const email = document.querySelector('.form-input[placeholder="Your Email *"]').value;
            // const phone = document.querySelector('.form-input[placeholder="Your Phone *"]').value;
            // const message = document.querySelector('.form-textarea').value;

            // For this example, we'll just log a message
            console.log('Send Message button clicked!');
            alert('Your message has been "sent" (check console for confirmation)! In a real app, this would go to a server.');

            // You might want to add form validation here before "sending"
            // And then, typically, use fetch() or XMLHttpRequest to send data to a backend.
        });
    }
});

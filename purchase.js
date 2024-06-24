
document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('your-publishable-key-here');

    document.getElementById('checkout-button').addEventListener('click', async () => {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
        });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    });
});

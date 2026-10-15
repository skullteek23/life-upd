class SignupCard {
    static get() {
        const template = document.getElementById('auth-template');
        const signupCard = template.content.cloneNode(true);

        signupCard.querySelector('.card-title').innerText = 'Signup';
        signupCard.querySelector('#username').placeholder = 'Choose Username';
        signupCard.querySelector('#password').placeholder = 'Choose a Password';
        signupCard.querySelector('.footer-subtitle').innerHTML = `Existing user? <a href="javascript:void(0)" id="auth-action">Login</a>`

        signupCard.querySelector('#auth-form').dataset.authType = 'signup';

        return signupCard;
    }
}

export default SignupCard;
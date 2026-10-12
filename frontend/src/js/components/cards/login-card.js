class LoginCard {
    static get() {
        const template = document.getElementById('auth-template');
        const loginCard = template.content.cloneNode(true);

        loginCard.querySelector('.card-title').innerText = 'Login with username';
        loginCard.querySelector('#username').placeholder = 'Username';
        loginCard.querySelector('#password').placeholder = 'Password';
        loginCard.querySelector('.footer-subtitle').innerHTML = `New here? <a href="javascript:void(0)" id="auth-action">Create an Account</a>`
        loginCard.querySelector('#auth-form').dataset.authType = 'login';

        return loginCard;
    }
}

export default LoginCard;
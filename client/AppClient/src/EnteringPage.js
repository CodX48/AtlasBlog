import { login, register } from '../APIs/ApisServies.js';
import { addtoken, userinfo } from '../User.js';

// Helper to create an input element
function createInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    return input;
}

// Helper to create a button
function createButton(text, type = 'button') {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    return button;
}

// Handles form submission
async function handleRegister(usernameInput, emailInput, passwordInput) {
    try {
        const res = await register({
            UserName: usernameInput.value,
            Email: emailInput.value,
            Password: passwordInput.value
        });

        if (!res) return;

        console.log(res.tokin);
        addtoken(res.tokin);
    } catch (error) {
        console.error("Error:", error);
    }
};


// Handles form submission
async function handleLogIn(emailInput, passwordInput) {
    try {
        const res = await login({
            Email: emailInput.value,
            Password: passwordInput.value
        });

        if (!res) return;

        console.log(res.tokin);
        addtoken(res.tokin);
    } catch (error) {
        console.error("Error:", error);
    }
};

export const RegisterSide = () => {
    const container = document.createElement('div');
    container.className = 'register-container';
    container.id = 'register_container';

    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Register';

    const usernameInput = createInput('text', 'username', 'Username');
    const emailInput = createInput('email', 'email', 'Email');
    const passwordInput = createInput('password', 'password', 'Password');

    const submitButton = createButton('Register', 'submit');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleRegister(usernameInput, emailInput, passwordInput);
    });

    form.append(label,usernameInput, emailInput, passwordInput, submitButton);
    container.appendChild(form);

    // Already have an account section
    const haveAccountSec = document.createElement('div');
    const haveAccountLine = document.createElement('p');
    haveAccountLine.textContent = 'I already have an account.';

    const loginButton = createButton('Log In');
    loginButton.addEventListener('click', () => {
        document.getElementById('register_container').remove();
        document.body.append(LoginSide());
        console.log('Redirect to login page'); // Replace with navigation logic
    });

    haveAccountSec.append(haveAccountLine, loginButton);
    container.appendChild(haveAccountSec);

    return container;
};

export const LoginSide = () => {

    const container = document.createElement('div');
    container.className = 'register-container';
    container.id = 'register_container';

    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'LogIn';

    const emailInput = createInput('email', 'email', 'Email');
    const passwordInput = createInput('password', 'password', 'Password');

    const submitButton = createButton('LogIn', 'submit');

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogIn( emailInput, passwordInput);
    });

    form.append(label,emailInput, passwordInput, submitButton);
    container.appendChild(form);

    // Already have an account section
    const RegisterSec = document.createElement('div');
    const RegisterLine = document.createElement('p');
    RegisterLine.textContent = 'Create New Account';

    const loginButton = createButton('Register');
    loginButton.addEventListener('click', () => {
        document.getElementById('register_container').remove();
        document.body.append(RegisterSide());
        console.log('Redirect to Register page'); // Replace with navigation logic
    });

    RegisterSec.append(RegisterLine, loginButton);
    container.appendChild(RegisterSec);

    return container;
}



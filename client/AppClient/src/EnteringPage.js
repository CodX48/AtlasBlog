import { register } from '../APIs/ApisServies.js';
import { addtoken, userinfo } from '../User.js';

export const RegisterSide = () => {
    const container = document.createElement('div');
    container.className = 'register-container';

    const form = document.createElement('form');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Username';
    usernameInput.name = 'username';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.name = 'email';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.name = 'password';

    const submitButton = document.createElement('button');
    
    submitButton.type = 'submit';
    submitButton.textContent = 'Register';
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        async function SendData() {
                    try {
                        const res = await register({ UserName: usernameInput.value, Email: emailInput.value, Password: passwordInput.value });
                        console.log(res.tokin);
                        if (!res) {
                            return;
                        }
                        addtoken(res.tokin);
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }
                SendData();
    })
    form.appendChild(usernameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);

    container.appendChild(form);
    return container;
};

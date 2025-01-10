// const toggleModal = () => {
//     const modal = document.querySelector('.modal');    
//     if(modal.classList.contains('isOpen')){
//         modal.classList.remove('isOpen');
//     }else{
//         modal.classList.add('isOpen');
//     }
// }

const toggleModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);    
    modal.classList.toggle('isOpen');
}

const button = document.querySelector('.themeMode');

const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13" />
    </svg>
`;

const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2A9.91 9.91 0 0 0 9 2.46A10 10 0 0 1 9 21.54A10 10 0 1 0 12 2Z" />
    </svg>
`;

// let themeCache = null;
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') ?? 'day';
    toggleTheme(currentTheme)
    handleAlertMessage();
    document.querySelectorAll('.inputValidate').forEach(span => span.textContent = '');
})

const toggleTheme = (themeName = null) => {
    const theme = document.querySelector('body');
    let newThemeName = '';

    if(!themeName)
    {
        newThemeName = localStorage.getItem('theme') == 'day' ? 'dark' : 'day';
    } else{
        newThemeName = themeName
    }
    
    if (newThemeName == 'day') {
        theme.classList.add('dayMode');
        button.innerHTML = sunIcon;
    } else {
        theme.classList.remove('dayMode');
        button.innerHTML = moonIcon;
    }

    localStorage.setItem('theme', newThemeName)
}

window.onclick = function (event) {
    const modal = document.querySelector('.modal');
    if(event.target === modal){
        modal.classList.remove('isOpen');
    }
}

handleAlertMessage = () => {    
    const alertMessage = localStorage.getItem('alertMessage');
    if(alertMessage){
        customAlertMessage(alertMessage);
        localStorage.removeItem('alertMessage');
    }
}

const customAlertMessage = (message) => {
    const alert = document.querySelector('.alert');
    if (alert) {
    }
}

const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');

    toast.classList.add('toast', 'show', type);

    const title = document.createElement('h4');
    title.classList.add('titleToast');
    title.textContent = message

    const closeButton = document.createElement('button');
    closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />
        </svg>
    `;

    toast.appendChild(title);
    toast.appendChild(closeButton);

    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    closeButton.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300)
    })

    setTimeout(() => {
        if(toast.classList.contains('show')){
            toast.classList.remove('show');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300)
        }
    }, 3000)
}

window.validateInput = (input) => {
    const value = input.value.trim();
    const errorSpan = input.nextElementSibling;
    let isValid = true;

    if (input.name === 'name') {
        isValid = value !== '';
        errorSpan.textContent = isValid ? '' : 'O nome é obrigatório!';
    } else if (input.name === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailPattern.test(value);
        errorSpan.textContent = isValid ? '' : 'Digite um email válido!';
    } else if (input.name === 'password') {
        isValid = value.length >= 6;
        errorSpan.textContent = isValid ? '' : 'A senha deve ter no minímo 6 digítos!';
    } else if (input.name === 'password_confirmation') {
        const password = document.getElementById('password').value;
        isValid = value === password;
        errorSpan.textContent = isValid ? '' : 'As senhas não coincidem!';
    }

    input.classList.toggle('validated', !isValid);
    errorSpan.style.display = isValid ? 'none' : 'block';
    return isValid;
};

window.validateUpdateInput = (input) => {
    const value = input.value.trim();
    const errorSpan = input.nextElementSibling;
    let isValid = true;

    if (input.name === 'name') {
        isValid = value !== '';
        errorSpan.textContent = isValid ? '' : 'O nome é obrigatório!';
    } else if (input.name === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailPattern.test(value);
        errorSpan.textContent = isValid ? '' : 'Digite um email válido!';
    } else if (input.name === 'password') {
        isValid = value === '' || value.length >= 6;
        errorSpan.textContent = isValid ? '' : 'A senha deve ter no minímo 6 digítos!';
    } else if (input.name === 'password_confirmation') {
        const password = document.getElementById('password').value;
        isValid = password === '' || value === password;
        errorSpan.textContent = isValid ? '' : 'As senhas não coincidem!';
    }

    input.classList.toggle('validated', !isValid);
    errorSpan.style.display = isValid ? 'none' : 'block';
    return isValid;
};
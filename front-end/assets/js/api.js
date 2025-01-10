import CONFIG from './config.js';

const baseUrl = CONFIG.api_url;

const endpoint = {
    index: '/users',
    withId: '/users/Id'
}

const fetchUsers = async () => {
    try {
        const response = await fetch(`${baseUrl}${endpoint.index}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const createUser = async (userData) => {
    try {
        let response = await fetch(`${baseUrl}${endpoint.index}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        console.log('response', response.status);

        if (response.status === 422) {
            throw { status: 'error', message: 'Erro ao criar usuário' };
        }

        console.log('response', response);
        localStorage.setItem('alertMessage', JSON.stringify({ status: 'success', message: 'Usuário criado com sucesso' }));
        return { status: 'success', message: 'Usuário criado com sucesso' };

    } catch (error) {
        console.error('Error:', error);
        localStorage.setItem('alertMessage', JSON.stringify({ status: 'error', message: 'Erro ao criar usuário' }));
        throw { status: 'error', message: 'Erro ao criar usuário' };
    }
}

const updateUser = async (id, userData) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint.withId.replace('Id', id)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint.withId.replace('Id', id)}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { fetchUsers, createUser, updateUser, deleteUser };
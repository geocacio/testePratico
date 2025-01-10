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
        const response = await fetch(`${baseUrl}${endpoint.index}`, {
            method: 'POST',
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

const updateUser = async (id, userData) => {
    try {
        console.log('userData', userData, id);
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
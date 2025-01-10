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

        if (response.status === 422) {
            throw { status: 'error', message: 'Erro ao criar usuário' };
        }
        
        localStorage.setItem('alertMessage', JSON.stringify({ status: 'success', message: 'Usuário criado com sucesso' }));
        return { status: 'success', message: 'Usuário criado com sucesso' };

    } catch (error) {
        localStorage.setItem('alertMessage', JSON.stringify({ status: 'error', message: 'Erro ao criar usuário' }));
        throw { status: 'error', message: 'Erro ao criar usuário' };
    }
}

    const updateUser = async (id, userData) => {
        try {
            let response = await fetch(`${baseUrl}${endpoint.withId.replace('Id', id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.status === 422) {
                throw { status: 'error', message: 'Erro ao atualizar usuário' };
            }

            localStorage.setItem('alertMessage', JSON.stringify({ status: 'success', message: 'Usuário atualizado com sucesso' }));
            return { status: 'success', message: 'Usuário atualizado com sucesso' };

        } catch (error) {
            console.error('Error:', error);
            localStorage.setItem('alertMessage', JSON.stringify({ status: 'error', message: 'Erro ao atualizar usuário' }));
            throw { status: 'error', message: 'Erro ao atualizar usuário' };
        }
    }

    const deleteUser = async (id) => {
        try {
            let response = await fetch(`${baseUrl}${endpoint.withId.replace('Id', id)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            localStorage.setItem('alertMessage', JSON.stringify({ status: 'success', message: 'Usuário deletado com sucesso' }));
            return { status: 'success', message: 'Usuário deletado com sucesso' };

        } catch (error) {
            console.error('Error:', error);
            localStorage.setItem('alertMessage', JSON.stringify({ status: 'error', message: 'Erro ao deletar usuário' }));
            throw { status: 'error', message: 'Erro ao deletar usuário' };
        }
    }

export { fetchUsers, createUser, updateUser, deleteUser };
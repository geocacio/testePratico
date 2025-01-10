import { fetchUsers, createUser, updateUser, deleteUser } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

let typeRequest = 'create';

const loadUsers = async () => {
    try {
        const users = await fetchUsers();
        const usersList = document.querySelector('#users-list');
        if (!usersList) {
            console.error('Element #users-list not found');
            return;
        }
        usersList.innerHTML = '';
        users.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button type="button" class="btnAction" onclick='updateUserModal(${JSON.stringify(user)})'>
                        <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button type="button" class="btnAction" onclick="handleDeleteUser(${user.id})">
                        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/></svg>
                    </button>
                </td>
            `;
            usersList.appendChild(userRow);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const handleCreateUser = async (data) => {
    try {
        const newUser = await createUser(data);
        loadUsers();
        return newUser;
    } catch (error) {
        console.error('Error:', error);
        return { status: 'error', message: 'Failed to create user' };
    }
}

const handleUpdateUser = async (id, data) => {
    try {
        console.log('handleUpdateUser', data, id);
        const updatedUser = await updateUser(id, data);
        loadUsers();
    } catch (error) {
        console.error('Error:', error);
    }
}

let currentDeleteId = null;
const handleDeleteUser = async (id) => {
    currentDeleteId = id;
    toggleModal('.deleteModal');
    // try {
    //     const deletedUser = await deleteUser(id);
    //     console.log('User deleted:', deletedUser);
    //     loadUsers();
    // } catch (error) {
    //     console.error('Error:', error);
    // }
}

const confirmationDeleteUser = async () => {
    try {
        const deletedUser = await deleteUser(currentDeleteId);
        // showNotification('Usuário deletado com sucesso');
        loadUsers();
        toggleModal('.deleteModal');
    } catch (error) {
        console.error('Error:', error);
    }
}

const cancelDeleteuser = () => {
    currentDeleteId = null;
    toggleModal('.deleteModal');
}


const updateUserModal = (user) => {
    toggleModal('.editModal');
    // const modal = document.querySelector('.modal');
    // modal.classList.add('isOpen');
    const form = document.querySelector('#form-user');
    form.name.value = user.name;
    form.email.value = user.email;
    form.password.value = user.password || '';
    form.id.value = user.id;

    typeRequest = 'update';
}

export { handleCreateUser, handleUpdateUser, handleDeleteUser, updateUserModal, confirmationDeleteUser, cancelDeleteuser };

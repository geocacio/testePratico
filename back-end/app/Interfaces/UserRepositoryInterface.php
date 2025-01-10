<?php

namespace App\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function all();
    public function create(array $data);
    public function update(User $user, array $data);
    public function delete(User $user);
}
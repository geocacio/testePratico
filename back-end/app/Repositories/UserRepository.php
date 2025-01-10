<?php

    namespace App\Repositories;

    use App\Models\User;
    use App\Interfaces\UserRepositoryInterface;

    class UserRepository implements UserRepositoryInterface
    {
        /**
         * Get all users.
         *
         * @return \Illuminate\Database\Eloquent\Collection<User>
         */
        public function all()
        {
            return User::all();
        }

        /**
         * Create a new user.
         *
         * @param array<string, mixed> $data
         * @return User
         */
        public function create(array $data)
        {
            return User::create($data);
        }

        /**
         * Update a user.
         *
         * @param User $user
         * @param array<string, mixed> $data
         * @return bool
         */
        public function update(User $user, array $data)
        {
            $update = $user->update($data);
            return $update;
        }

        /**
         * Delete a user.
         *
         * @param User $user
         * @return bool
         */
        public function delete(User $user)
        {
            return $user->delete();
        }
    }
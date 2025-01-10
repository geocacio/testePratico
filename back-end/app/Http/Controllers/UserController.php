<?php

namespace App\Http\Controllers;

use App\Exceptions\CustomException;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use App\Utils\DefaultResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    protected $userRepository;
    protected $defaultResponse;

    public function __construct(UserRepositoryInterface $userRepository, DefaultResponse $defaultResponse)
    {
        $this->userRepository = $userRepository;
        $this->defaultResponse = $defaultResponse;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = $this->userRepository->all();
            return $this->defaultResponse->successWithContent('Users retrieved successfully', 200, $users);
        } catch (\Exception $e) {
           throw new CustomException($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            DB::beginTransaction();
            $payload = $request->validated();

            $user = $this->userRepository->create($payload);

            DB::commit();
            return $this->defaultResponse->successWithContent('User created successfully', 201, $user);
            
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            throw new CustomException($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            DB::beginTransaction();
            $payload = $request->validated();
            if(isset($payload['password'])) {
                $payload['password'] = bcrypt($payload['password']);
            } else {
                unset($payload['password']);
            }

            $user = $this->userRepository->update($user, $payload);

            DB::commit();
            return $this->defaultResponse->successWithContent('User updated successfully', 200, $user);

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            throw new CustomException($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            DB::beginTransaction();
            $this->userRepository->delete($user);

            DB::commit();
            return $this->defaultResponse->isSuccess('User deleted successfully', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            throw new CustomException($e->getMessage(), $e->getCode());
        }
    }
}

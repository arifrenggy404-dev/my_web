<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Profil;

class ProfilPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Profil $profil): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, Profil $profil): bool
    {
        return true;
    }

    public function delete(User $user, Profil $profil): bool
    {
        return false;
    }

    public function restore(User $user, Profil $profil): bool
    {
        return false;
    }

    public function forceDelete(User $user, Profil $profil): bool
    {
        return false;
    }
}

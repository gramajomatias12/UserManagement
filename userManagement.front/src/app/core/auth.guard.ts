import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../features/users/user.store';
import { first, map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const store = inject(UserStore);
  const router = inject(Router);

  return store.isAdmin$.pipe(
    first(),
    map(isAdmin => {
      if (isAdmin) return true;
      // Si no es admin, lo mandamos a una página de "No Autorizado" o al Home
      console.warn('Acceso denegado - Se requiere rol de Admin');
      router.navigate(['/home']); 
      return false;
    })
  );
};

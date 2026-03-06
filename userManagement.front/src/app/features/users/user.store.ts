import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Data } from '../../core/data';

@Injectable({
  providedIn: 'root',
})

export class UserStore {
  // El "Subject" es privado para que nadie de afuera lo manipule directamente
  private readonly _users = new BehaviorSubject<any[]>([]);
  // El "Observable" es público para que los componentes se suscriban
  readonly users$ = this._users.asObservable();

  private readonly _roles = new BehaviorSubject<any[]>([]);
  readonly roles$ = this._roles.asObservable();

  constructor(private data: Data) { }

  // Getter para obtener el valor actual sin suscribirse
  get usersValue() { return this._users.getValue(); }

  loadUsers() {
    this.data.getEntidad('Usuarios').subscribe(data => {
      const list = typeof data === 'string' ? JSON.parse(data) : data;
      this._users.next(list); // Notificamos a todos los interesados
    });
  }

  // Ejemplo de filtro reactivo: Usuarios activos
  readonly activeUsers$ = this.users$.pipe(
    map(users => users.filter(u => u.icActivo))
  );


  saveUser(userData: any) {
    this.data.postEntidad('Usuarios', userData).subscribe({
      next: () => {
        this.loadUsers();
        console.log('Usuario guardado con éxito');
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      }
    });
  }

  deleteUser(cdUsuario: number) {
    // Creamos el objeto que espera el SP
    const dataABorrar = { cdUsuario: cdUsuario };

    this.data.postEntidad('Usuarios_D', dataABorrar).subscribe({
      next: () => {
        this.loadUsers(); // Actualiza la tabla automáticamente
        console.log('Usuario eliminado');
      },
      error: (err) => console.error('Error al borrar:', err)
    });
  }


  loadRoles() {
    this.data.getEntidad('Roles').subscribe(data => {
      const list = typeof data === 'string' ? JSON.parse(data) : data;
      this._roles.next(list);
    });
  }

  // simulacion de autenticación y permisos (para mostrar/ocultar botones) //
  private readonly _currentUser = new BehaviorSubject<any>({
    dsNombre: 'Admin',
    cdRol: 2, // 1 = Administrador, 2 = Operador
    dsRol: 'Administrador'
  });

  readonly currentUser$ = this._currentUser.asObservable();

  // Un helper rápido para saber si es Admin
  public isAdmin$ = this.currentUser$.pipe(
    map(user => user?.cdRol === 1)
  );
}

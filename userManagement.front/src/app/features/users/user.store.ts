import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Data } from '../../core/data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class UserStore {
  // 1. PRIMERO declaramos las variables de estado
  private readonly _currentUser = new BehaviorSubject<any>(null);
  public readonly currentUser$ = this._currentUser.asObservable();

  private http = inject(HttpClient);

  public readonly isAdmin$ = this.currentUser$.pipe(
    map(user => {
      if (!user) return false;
      // Usamos == (doble igual) para que '1' sea igual a 1
      // O forzamos el casteo a Number
      return Number(user.cdRol) === 1;
    })
  );

  private readonly _users = new BehaviorSubject<any[]>([]);
  public readonly users$ = this._users.asObservable();

  private readonly _roles = new BehaviorSubject<any[]>([]);
  public readonly roles$ = this._roles.asObservable();

  // 2. SEGUNDO el constructor
  constructor(private data: Data, private router: Router) {
    this.autoLogin();
  }

  get usersValue() { return this._users.getValue(); }

  // 3. TERCERO los métodos
  private autoLogin() {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user_data');

    if (token && savedUser) {
      this._currentUser.next(JSON.parse(savedUser));
    }
  }

  login(credenciales: any) {
    const authUrl = 'http://localhost:5035/api/Auth/login';

    return this.http.post(authUrl, credenciales).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          // res.usuario ahora debería ser el objeto que viste en SQL
          localStorage.setItem('user_data', JSON.stringify(res.usuario));
          this._currentUser.next(res.usuario);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data'); // <-- Limpiamos todo
    this._currentUser.next(null);
    this.router.navigate(['/login']);
  }

  loadUsers() {
    this.data.getEntidad('Usuarios').subscribe(data => {
      const list = typeof data === 'string' ? JSON.parse(data) : data;
      this._users.next(list);
    });
  }

  readonly activeUsers$ = this.users$.pipe(
    map(users => users.filter(u => u.icActivo))
  );

  saveUser(userData: any) {
    this.data.postEntidad('Usuarios', userData).subscribe({
      next: () => {
        this.loadUsers();
        console.log('Usuario guardado con éxito');
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }

  deleteUser(cdUsuario: number) {
    const dataABorrar = { cdUsuario: cdUsuario };
    this.data.postEntidad('Usuarios_D', dataABorrar).subscribe({
      next: () => {
        this.loadUsers();
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
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'; // Para etiquetas de Rol/Estado
import { UserStore } from '../user.store';
import { MatDialog } from '@angular/material/dialog';
import { UserForm } from '../user-form/user-form';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  // Definimos las columnas que queremos mostrar en la tabla
  displayedColumns: string[] = ['nombre', 'login', 'email', 'rol', 'estado', 'acciones'];
  
  // Exponemos el observable directamente a la vista
  private readonly usersStore = inject(UserStore);
  users$ = this.usersStore.users$;
  private dialog = inject(MatDialog);
  public isAdmin$ = this.usersStore.isAdmin$;

  constructor() {}

  ngOnInit() {
    this.usersStore.loadUsers(); // Disparamos la carga inicial
  }

  editar(usuario: any) {
    //console.log('Editar:', usuario);
    this.abrirForm(usuario);
  }


  borrar(usuario: any) {
  const mensaje = `¿Estás seguro de que quieres eliminar a ${usuario.dsNombre}?`;
  
  if (confirm(mensaje)) {
    this.usersStore.deleteUser(usuario.cdUsuario);
  }
}


abrirForm(usuario?: any) {
  const dialogRef = this.dialog.open(UserForm, {
    width: '450px',
    data: usuario // Si es undefined, el form sabe que es "Nuevo"
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aquí llamaremos al store para guardar el usuario (ya sea nuevo o editado)
      this.usersStore.saveUser(result);
      console.log('Data para guardar:', result);
    }
  });
}

setRole(id: number) {
  // Accedemos al store para cambiar el usuario actual (solo para prueba)
  (this.usersStore as any)._currentUser.next({
    dsNombre: id === 1 ? 'Admin' : 'Operador',
    cdRol: id
  });
}
}

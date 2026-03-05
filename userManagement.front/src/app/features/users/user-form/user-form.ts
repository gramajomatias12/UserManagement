import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  private fb = inject(FormBuilder);
  private store = inject(UserStore);
  private dialogRef = inject(MatDialogRef<UserForm>);
  
  // Recibimos los datos si es edición
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  userForm: FormGroup = this.fb.group({
    cdUsuario: [0],
    dsLogin: ['', [Validators.required, Validators.minLength(4)]],
    dsContraseña: ['', [Validators.required]],
    dsNombre: ['', Validators.required],
    dsApellido: ['', Validators.required],
    dsEmail: ['', [Validators.required, Validators.email]],
    cdRol: [null, Validators.required],
    icActivo: [true]
  });

  roles$ = this.store.roles$; // Para el combo de roles

  ngOnInit() {
    this.store.loadRoles(); // Cargamos los roles al abrir
    if (this.data) {
      this.userForm.patchValue(this.data); // Si hay data, llenamos el form (EDICIÓN)
    }
  }

  guardar() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

import { TrabajadorService } from './trabajadores/trabajador.service';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './trabajadores/form.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{path: '', redirectTo: '/trabajadores', pathMatch: 'full'},
	{path: 'trabajadores',component: TrabajadoresComponent},
  {path: 'trabajadores/form',component: FormComponent},
  {path: 'trabajadores/form/:id',component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TrabajadoresComponent,
    HeaderComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TrabajadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

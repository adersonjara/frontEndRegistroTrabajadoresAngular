import { Component, OnInit } from '@angular/core';
import { Trabajador } from './trabajador';
import { TrabajadorService } from './trabajador.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html'
})
export class TrabajadoresComponent implements OnInit{

	trabajadores: Trabajador[] = [];

	constructor(private trabajadorService: TrabajadorService){

	}

	ngOnInit(){
		this.trabajadorService.getTrabajadores().subscribe(
			trabajadores => this.trabajadores = trabajadores
		);
	}

	delete(trabajador: Trabajador): void {
		swal.fire({
		  title: '¿Estás seguro de eliminar?',
		  text: "Se eliminará el registro!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, estoy seguro'
		}).then((result) => {
		  if (result.isConfirmed) {

		  	this.trabajadorService.delete(trabajador.id).subscribe(
		  		response => {
		  			this.trabajadores = this.trabajadores.filter(trabaj => trabaj !== trabajador)
		  			swal.fire(
				      'Eliminado!',
				      `${response.mensaje}`,
				      'success'
				    )
		  		}
		  	)
		    
		  }
		})
	}

}

import { Component, OnInit } from '@angular/core';
import { Trabajador } from './trabajador'
import { TrabajadorService } from './trabajador.service'
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

	public trabajador: Trabajador = new Trabajador();
	public titulo: string = "Registrar Trabajador";
	public titulo2: string = "Actualizar Trabajador";

	constructor(private trabajadorService: TrabajadorService, 
				private router: Router,
				private activatedRoute: ActivatedRoute){}

	ngOnInit(){
		this.cargarTrabajador()
	}

	cargarTrabajador(): void{
		this.activatedRoute.params.subscribe(params => {
			let id = params['id']
			if (id) {
				this.trabajadorService.getTrabajador(id).subscribe( (trabajador) => this.trabajador = trabajador)
			}
		})
	}

	public create(): void{
		this.trabajadorService.create(this.trabajador)
			.subscribe(trabajador => {
				this.router.navigate(['/trabajadores'])
				swal.fire('Trabajador ',`Registrado con éxito!`,'success')
			}
		)
	}

	update(): void{
		this.trabajadorService.update(this.trabajador)
		.subscribe( trabajador => {
			this.router.navigate(['/trabajadores'])
			swal.fire('Trabajador ',`Actualizado con éxito!`,'success')
		})
	}

}

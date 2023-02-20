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

	public errores: any;

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
			.subscribe(json => {
				this.router.navigate(['/trabajadores'])
				swal.fire('Trabajador ',`${json.mensaje}`,'success')
			},
			err => {
				this.errores = err.error.error;
				// console.log(err.error.statuscode);
				// console.log('Errores: ',err.error);
			}
		)
	}

	update(): void{
		this.trabajadorService.update(this.trabajador)
			.subscribe( json => {
				this.router.navigate(['/trabajadores'])
				swal.fire('Trabajador ',`${json.mensaje}`,'success')
			},
			err => {
				this.errores = err.error.error;
				// console.log(err.statuscode);
				// console.log(err.error);
			}
		)
	}

}

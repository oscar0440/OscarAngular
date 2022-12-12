import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../../../services/clientes/cliente.service";
import { Cliente } from "../../../clases/cliente";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  
  cliente = new Cliente(0,'', '', '', '', '');
  constructor(private router: Router, 
              private clienteService: ClienteService, 
              private params: ActivatedRoute
              ) { }
    ngOnInit(): void {
      let id_cliente = Number(this.params.snapshot.paramMap.get('id'));
      this.clienteService.obtenerDonde(id_cliente).subscribe(cliente => this.cliente = cliente[0]);
    }

    editar() {
      console.log(this.cliente);
      this.clienteService.editar(this.cliente).subscribe(resultado => {
        if(resultado['update']){
          this.router.navigate(['/']);
        }//end if
        else {
          alert('Ocurrio un error o la informacion no ha sufrido algun cambio a la original');
        }//end else
      });
    }
}

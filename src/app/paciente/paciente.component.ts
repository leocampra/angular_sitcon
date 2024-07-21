import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { Router } from '@angular/router';

interface Ifiltro {
  nomepaciente:string
}
@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  page = 1;
	pageSize = 4;
	collectionSize = 10;
  pacientes:any
  filtro:Ifiltro = {
    nomepaciente:''
  }
  constructor(
    public pacienteService:PacienteService,
    public router:Router
  ){

  }
  ngOnInit(): void {
    this.lista()
  }

  lista(){
    this.pacienteService.lista().subscribe(
      (certo:any)=>{
        this.pacientes = certo._embedded.pacientes
      }
    )
  }

  busca(event:string){
    if(event.length>=4){
      this.pacienteService.lista(this.filtro.nomepaciente).subscribe(
        (certo:any)=>{
          this.pacientes = certo._embedded.pacientes
        }
      )
    }
  }
  solicitacao(id:number){
    this.router.navigateByUrl(`/solicitacao/${id}`)
  }

  listagem(id:number){
    this.router.navigateByUrl(`/listagem/${id}`)
  }
}

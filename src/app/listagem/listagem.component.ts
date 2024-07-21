import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Ilistagem {
  inicio: string;
  fim: string;
}

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit{
  param:string
  listagem:any
  page = 1;
	pageSize = 4;
	collectionSize = 10;
  validar!: FormGroup;

  campo: Ilistagem = {
    inicio: '',
    fim: ''
  };

  constructor(
    public formBuilder: FormBuilder,
    public pacienteService:PacienteService,
    public route:ActivatedRoute
  ){
    this.param = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.busca()
    this.campos()
  }

  async campos() {
    this.validar = this.formBuilder.group({
      inicio: new FormControl('', [Validators.required]),
      fim: new FormControl('', [Validators.required])
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validar.controls;
  }

  busca(){
    if(this.campo.inicio!==''){
      if (this.validar.invalid) {
        Object.keys(this.validar.controls).forEach((campo) => {
          const controle = this.validar.get(campo);
          controle?.markAsTouched();
        });
      } else {
        this.pacienteService.solicitacao(this.param,this.campo.inicio,this.campo.fim).subscribe(
          (certo:any)=>{
            this.listagem = certo._embedded.solicitacao
          })
      }
    } else {
      this.pacienteService.solicitacao(this.param).subscribe(
        (certo:any)=>{
          this.listagem = certo._embedded.solicitacao
        })
    }

  }
}

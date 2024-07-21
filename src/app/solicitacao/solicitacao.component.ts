import { Component, OnInit, NgModule } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SolicitacaoService } from '../services/solicitacao.service';

export interface Isolicitacao {
  profissional: string;
  tipoSolicitacao: string;
  procedimentos: string;
  data: string;
  hora: string;
}

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css'],
})
export class SolicitacaoComponent implements OnInit {
  campo: Isolicitacao = {
    profissional: '',
    tipoSolicitacao: '',
    procedimentos: '',
    data: '',
    hora: '',
  };

  param: number;
  listatipo?: any;
  listaprocedimentos: any;
  listaprofissional: any;
  nome?: string;
  nascimento?: string;
  cpf?: string;
  validar!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public pacienteService: PacienteService,
    public route: ActivatedRoute,
    public solicitacaoService: SolicitacaoService,
    public router: Router
  ) {
    this.param = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.unico();
    this.campos();
    this.tiposolicitacao();
  }

  tiposolicitacao() {
    this.solicitacaoService.tiposolicitacao().subscribe((certo: any) => {
      this.listatipo = certo._embedded.tiposolicitacao;
    });
  }

  procedimentos(tipo: any) {
    this.solicitacaoService.procedimentos(tipo).subscribe((certo: any) => {
      this.listaprocedimentos = certo._embedded.procedimentos;
    });
  }

  profissionais(tipo: any) {

    this.solicitacaoService.profissionais(tipo).subscribe((certo: any) => {
      this.listaprofissional = certo._embedded.profissional;
    });

  }

  unico() {
    this.pacienteService.unico(this.param).subscribe((certo: any) => {
      this.nome = certo.nome;
      this.nascimento = certo.datanasc;
      this.cpf = certo.cpf;
    });
  }

  async campos() {
    this.validar = this.formBuilder.group({
      profissional: new FormControl('', [Validators.required]),
      tipoSolicitacao: new FormControl('', [Validators.required]),
      procedimentos: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validar.controls;
  }

  salvar() {
    if (this.validar.invalid) {
      Object.keys(this.validar.controls).forEach((campo) => {
        const controle = this.validar.get(campo);
        controle?.markAsTouched();
      });
    } else {
      const data = {
        data: this.campo.data+" "+this.campo.hora,
        paciente: this.param,
        profissional: this.campo.profissional,
        procedimentos: this.campo.procedimentos
      };

      this.solicitacaoService.save(data).subscribe(
        (certos: any) => {
          this.router.navigateByUrl('/');
        },
        (erros: any) => {

        }
      );

    }
  }
}

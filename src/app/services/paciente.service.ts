import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  API: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  valor: string = '';
  lista(nome?: string) {
    if (nome) {
      this.valor = '?nome=' + nome;
    }
    return this.http.get(`${this.API}/pacientes${this.valor}`);
  }

  unico(id: number) {
    return this.http.get(`${this.API}/pacientes/${id}`);
  }
  datas: string = '';
  solicitacao(id: string, inicio?: string, fim?: string) {
    if (inicio) {
      this.datas = `&inicio=${inicio}&fim=${fim}`;
    }
    return this.http.get(`${this.API}/solicitacao?paciente=${id}${this.datas}`);
  }
}

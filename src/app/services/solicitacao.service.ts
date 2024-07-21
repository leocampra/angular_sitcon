import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  API: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  tiposolicitacao() {
    return this.http.get(`${this.API}/tiposolicitacao`);
  }

  procedimentos(tipo:number) {
    return this.http.get(`${this.API}/procedimentos?tipo=${tipo}`);
  }

  profissionais(tipo:any){
    return this.http.get(`${this.API}/profissional?procedimentos=${tipo}`);
  }

  save(dados:any){
    return this.http.post(`${this.API}/solicitacao`, dados);
  }
}

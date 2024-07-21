import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { ListagemComponent } from './listagem/listagem.component';

const routes: Routes = [

  {
    path: '',
    component: PacienteComponent,
    data: {
      title: 'Home'
    },
    pathMatch: 'full'
  },
  {
    path: 'solicitacao/:id',
    component: SolicitacaoComponent,
    data: {
      title: 'Solicitacao'
    }
  },
  {
    path: 'listagem/:id',
    component: ListagemComponent,
    data: {
      title: 'Listagem'
    }
  },
  {path: '**', redirectTo: 'login'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

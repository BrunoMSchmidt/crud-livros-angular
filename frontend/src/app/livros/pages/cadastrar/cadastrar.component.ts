import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/appState';
import { FormLivroComponent } from '../../components/form-livro/form-livro.component';
import { chamarCadastrarNovoLivroAPI } from '../../store/livro.action';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent {
  @ViewChild(FormLivroComponent, { static: true })
  formComponent!: FormLivroComponent;

  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  cadastrar() {
    if (!this.formComponent.form.valid) {
      this.formComponent.atualizarMensagensDeErro();

      return;
    }

    this.formComponent.limparMensagensDeErro();

    this.store.dispatch(
      chamarCadastrarNovoLivroAPI({
        novoLivro: this.formComponent.form.value,
      })
    );

    let apiStatus$ = this.appStore.pipe(select(selectAppState));

    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus === 'sucesso') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        this.voltar();
      }
    });
  }

  voltar() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}

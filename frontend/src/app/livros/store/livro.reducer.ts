import { createReducer, on } from '@ngrx/store';
import { Livro } from './livro';
import {
  atualizarLivroAPISucesso,
  buscaLivrosAPISucesso,
  cadastrarNovoLivroAPISucesso,
  deletarLivroAPISucesso,
} from './livro.action';

export const initialState: ReadonlyArray<Livro> = [];

export const livroReducer = createReducer(
  initialState,
  on(buscaLivrosAPISucesso, (state, { todosOsLivros }) => todosOsLivros),
  on(cadastrarNovoLivroAPISucesso, (state, { novoLivro }) => [
    novoLivro,
    ...state,
  ]),
  on(atualizarLivroAPISucesso, (state, { livro }) => [
    livro,
    ...state.filter((livroState) => livroState.id !== livro.id),
  ]),
  on(deletarLivroAPISucesso, (state, { id }) => [
    ...state.filter((livro) => livro.id !== id),
  ])
);

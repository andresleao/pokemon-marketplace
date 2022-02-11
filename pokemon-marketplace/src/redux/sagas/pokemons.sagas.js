import { addPokemons } from '../actions/pokeApiActions';
import { pokemonApiTypes } from '../actions/pokeApiTypes';

import { put, takeLatest, call, all } from 'redux-saga/effects';

const fetchPokemons = async (url) => {
  return await fetch(url).then((res) => res.json());
};

function* getAllPokemons() {
  try {
    const pokemons = yield call(
      fetchPokemons,
      'https://pokeapi.co/api/v2/pokemon/'
    );

    let listDetails = [];

    for (const el of pokemons.results) {
      const details = yield call(fetchPokemons, el.url);
      listDetails.push(details);
    }
    yield put(addPokemons(listDetails));
  } catch (error) {
    console.log(error);
  }
}

function* getNextPagePokemons() {
  try {
    const pokemons = yield call(
      fetchPokemons,
      'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'
    );

    let listDetails = [];

    for (const el of pokemons.results) {
      const details = yield call(fetchPokemons, el.url);
      listDetails.push(details);
    }
    yield put(addPokemons(listDetails));
  } catch (error) {
    console.log(error);
  }
}

function* getThirdPagePokemons() {
  try {
    const pokemons = yield call(
      fetchPokemons,
      'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20'
    );

    let listDetails = [];

    for (const el of pokemons.results) {
      const details = yield call(fetchPokemons, el.url);
      listDetails.push(details);
    }
    yield put(addPokemons(listDetails));
  } catch (error) {
    console.log(error);
  }
}

export default all([
  takeLatest(pokemonApiTypes.GET_POKEMONS, getAllPokemons),
  takeLatest(pokemonApiTypes.GET_NEXT_POKEMONS, getNextPagePokemons),
  takeLatest(pokemonApiTypes.GET_THIRD_PAGE_POKEMONS, getThirdPagePokemons),
]);

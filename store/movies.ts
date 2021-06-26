/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { MovieModel, ResponseList } from '~/types'
import { $axios } from '~/utils/api'

const API_KEY = '70e74297fa3faa8f28a4f8b10dbdad89'

interface MoviesState {
  moviesList: ResponseList<MovieModel>
  movie: MovieModel
}

@Module({
  name: 'movies',
  stateFactory: true,
  namespaced: true,
})
export default class MoviesModule extends VuexModule implements MoviesState {
  moviesList: ResponseList<MovieModel> = new ResponseList()
  movie: MovieModel = {}

  @Mutation
  setMoviesList(movies: ResponseList<MovieModel>) {
    this.moviesList = movies
  }

  @Mutation
  setMovie(movie: MovieModel) {
    this.movie = movie
  }

  get getMoviesList() {
    return this.moviesList
  }

  get getMovie() {
    return this.movie
  }

  @Action
  async fetchMovies({ page }: any) {
    const params = { api_key: API_KEY, language: 'pt-BR', page }
    const data = await $axios.$get('/movie/popular', { params })
    this.setMoviesList(data)
  }
}

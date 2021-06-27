/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { MovieModel, ResponseList } from '~/types'
import { $axios } from '~/utils/api'

const API_KEY = '70e74297fa3faa8f28a4f8b10dbdad89'

interface MoviesState {
  moviesList: ResponseList<MovieModel>
  searchMoviesList: ResponseList<MovieModel>
  movie: MovieModel
  hasSearchMovie: boolean
  searchQuery: string
}

@Module({
  name: 'movies',
  stateFactory: true,
  namespaced: true,
})
export default class MoviesModule extends VuexModule implements MoviesState {
  moviesList: ResponseList<MovieModel> = new ResponseList()
  searchMoviesList: ResponseList<MovieModel> = new ResponseList()
  movie: MovieModel = {}
  hasSearchMovie = false
  searchQuery = ''

  @Mutation
  setMoviesList(movies: ResponseList<MovieModel>) {
    if (movies.page > 1) {
      movies.results = [...this.moviesList.results, ...movies.results]
    }
    this.moviesList = movies
  }

  @Mutation
  setSearchMoviesList(movies: ResponseList<MovieModel>) {
    this.searchMoviesList = movies
  }

  @Mutation
  setMovie(movie: MovieModel) {
    this.movie = movie
  }

  @Mutation
  toggleSearchMovie() {
    this.hasSearchMovie = !this.hasSearchMovie
  }

  @Mutation
  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery
  }

  get getSearchMoviesList() {
    return this.searchMoviesList
  }

  get getMoviesList() {
    return this.moviesList
  }

  get getMovie() {
    return this.movie
  }

  get getHasSearchMovie() {
    return this.hasSearchMovie
  }

  get getSearchQuery() {
    return this.searchQuery
  }

  @Action
  async fetchMovies(page: number) {
    const params = { api_key: API_KEY, language: 'pt-BR', page }
    const data = await $axios.$get('/movie/popular', { params })
    this.setMoviesList(data)
  }

  @Action
  async getMovieDetails(id: number) {
    const params = { api_key: API_KEY, language: 'pt-BR' }
    const data = await $axios.$get(`/movie/${id}`, { params })
    this.setMovie(data)
  }

  @Action
  async searchMovies(query: string) {
    const params = { api_key: API_KEY, language: 'pt-BR', query }
    const data = await $axios.$get('/search/movie', { params })
    this.setSearchMoviesList(data)
  }

  @Action
  async getTrailers(id: number) {
    const params = { api_key: API_KEY, language: 'pt-BR' }
    const data = await $axios.$get(`/movie/${id}/videos`, { params })
    return data
  }
}

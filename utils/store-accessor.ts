/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import movies from '../store/movies'

let moviesStore: movies

function initialiseStores(store: Store<any>): void {
  moviesStore = getModule(movies, store)
}

export { initialiseStores, moviesStore }

/* eslint-disable camelcase */
export interface MovieModel {
  id?: number
  title?: string
  original_language?: string
  original_title?: string
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  overview?: string
  popularity?: number
  poster_path?: string
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export interface IResponseList<T> {
  [x: string]: any
  page: number
  results: T[]
  total_results?: number
  total_pages?: number
}

export class ResponseList<T> implements IResponseList<T> {
  page: number = 1
  results: T[] = []
  total_results?: number
  total_pages?: number
}

export interface MovieGenre {
  id: number
  name?: string
}

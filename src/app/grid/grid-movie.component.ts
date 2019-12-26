import {Component} from "@angular/core";
import {Movie, movies} from "../models/movie";
import {List} from "@everest/collections";

@Component({
  templateUrl: "grid-movie.component.html",
  selector: "app-grid-movie"
})
export class GridMovieComponent {
  movies = List.fromArray<Movie>(movies);

  constructor() {

  }

  floor(int: number){
    return Math.floor(int);
  }

  remove(item) {
    this.movies.remove(item);
  }

  addRandom() {
    let item = this.movies.get(Math.floor(Math.random() * this.movies.size));
    let p = Math.floor(Math.random() * 5);

    this.movies.insert(p, Object.assign({}, item));
  }
}

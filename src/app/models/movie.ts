export interface Movie {
  name: string;
  date: Date;
  imgUrl: string;
  duration: number;
  rating: number;
  categories: string[];
}

export const movies: Movie[] = [
  {
    name: "The Dark Knight",
    date: new Date(2008, 7, 18),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 152,
    rating:9.0,
    categories: [ "Action", "Crime", "Drama"]
  },

  {
    name: "The Godfather",
    date: new Date(1972, 3, 24),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
    duration: 175,
    rating:9.2,
    categories: ["Crime", "Drama"]
  },

  {
    name: "Star Wars: Episode IV - A New Hope",
    date: new Date(1977, 5, 25),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 121,
    rating: 8.6,
    categories: ["Action", "Adventure", "Fantasy" ]
  },

  {
    name: "The Matrix",
    date: new Date(1999, 3, 31),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 136,
    rating: 8.7,
    categories: ["Action", "Sci-Fi"]
  },

  {
    name: "The Lion King",
    date: new Date(1994, 6, 24),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 88,
    rating: 8.5,
    categories: [ "Animation", "Adventure" , "Drama" ]
  },

  {
    name: "The Lord of the Rings: The Return of the King",
    date: new Date(2003, 12, 17),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 201,
    rating: 8.9,
    categories: ["Adventure", "Drama", "Fantasy"]
  },

  {
    name: "Star Wars: Episode V - The Empire Strikes Back",
    date: new Date(1980, 6, 20),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 124,
    rating: 8.7,
    categories: [ "Action", "Adventure", "Fantasy" ]
  },

  {
    name: "City of God",
    date: new Date(2004, 2, 13),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BNDJiNTEwMjMtOGQ1ZC00OTczLWFjZjctZWQ0MGJjZmFkMjcwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 130,
    rating: 8.6,
    categories: [ "Crime", "Drama" ]
  },

  {
    name: "Terminator 2: Judgment Day",
    date: new Date(1991, 7, 3),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 137,
    rating: 8.5,
    categories: ["Action", "Sci-Fi"]
  },

  {
    name: "Joker",
    date: new Date(2019, 10, 4),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 122,
    rating: 8.7,
    categories: ["Crime", "Drama", "Thriller"]
  },

  {
    name: "Gladiator",
    date: new Date(2000, 6, 5),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 155,
    rating: 8.5,
    categories: [ "Action", "Adventure", "Drama" ]
  },

  {
    name: "Avengers: Endgame",
    date: new Date(2019, 4, 26),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 181,
    rating: 8.5,
    categories: [ "Action", "Adventure", "Drama" ]
  },

  {
    name: "Braveheart",
    date: new Date(1995, 6, 24),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 178,
    rating: 8.3,
    categories: ["Biography", "Drama", "History"]
  },

  {
    name: "2001: A Space Odyssey",
    date: new Date(1968, 6, 13),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 139,
    rating: 8.3,
    categories: ["Adventure", "Sci-Fi"]
  },

  {
    name: "Scarface",
    date: new Date(1983, 12, 9),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BNjdjNGQ4NDEtNTEwYS00MTgxLTliYzQtYzE2ZDRiZjFhZmNlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 170,
    rating: 8.3,
    categories: ["Crime", "Drama"]
  },

  {
    name: "Indiana Jones and the Last Crusade",
    date: new Date(1989, 6, 24),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 127,
    rating: 8.2,
    categories: ["Action", "Adventure"]
  },

  {
    name: "The Wolf of Wall Street",
    date: new Date(2013, 12, 25),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 180,
    rating: 8.2,
    categories: ["Biography", "Crime", "Drama" ]
  },

  {
    name: "Blade Runner",
    date: new Date(1982, 6, 25),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 117,
    rating: 8.1,
    categories: [ "Action", "Sci-Fi", "Thriller" ]
  },

  {
    name: "Mad Max: Fury Road",
    date: new Date(2015, 5,15),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 120,
    rating: 8.1,
    categories: [ "Action", "Adventure", "Sci-Fi"  ]
  },

  {
    name: "Hotel Rwanda",
    date: new Date(2005, 2, 4),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BZGJjYmIzZmQtNWE4Yy00ZGVmLWJkZGEtMzUzNmQ4ZWFlMjRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 121,
    rating: 8.1,
    categories: ["Biography", "Drama", "History"]
  },

  {
    name: "Harry Potter and the Deathly Hallows: Part 2",
    date: new Date(2011, 7, 15),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 130,
    rating:8.1,
    categories: ["Adventure", "Drama", "Fantasy"]
  },

  {
    name: "The Terminator",
    date: new Date(1984, 10, 26),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 107,
    rating: 8.0,
    categories: ["Action", "Sci-Fi"]
  },

  {
    name: "The Legend of 1900",
    date: new Date(1998, 10, 28),
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMzIwOTdmNjQtOWQ1ZS00ZWQ4LWIxYTMtOWFkM2NjODJiMGY4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_UX182_CR0,0,182,268_AL_.jpg",
    duration: 169,
    rating:8.1,
    categories: ["Drama", "Music", "Romance" ]
  },
];

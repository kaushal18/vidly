import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
	}; 

	// called after component is rendered
	componentDidMount() {
		const genres = [{name: 'All Genres'}, ...getGenres()];
		this.setState({ movies: getMovies(), genres: genres });
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies: movies });
	}

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies: movies });
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	}

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	}

	renderTable = (movies) => {
		if(this.state.movies.length === 0)	return;
		
		return (
			<table className="table">
			  <thead>
			    <tr>
			      <th scope="col">Title</th>
			      <th scope="col">Genere</th>
			      <th scope="col">Stock</th>
			      <th scope="col">Rate</th>
			      <th></th>
			      <th></th>
			    </tr>
			  </thead>
			  <tbody>
			  	{movies.map(movie => {
							const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
							return(
								<tr key={ _id }>
									<td>{ title }</td>
									<td>{ genre.name }</td>
									<td>{ numberInStock }</td>
									<td>{ dailyRentalRate }</td>
									<td>
										<Like 
											liked={movie.liked}
											onClick={() => this.handleLike(movie)} 
										/>
									</td>
									<td>
										<button
											onClick={() => this.handleDelete(movie)} 
											className="btn btn-danger"
										>
											Delete
										</button>
									</td>
								</tr>
							)
						}) 
			 		}
			  </tbody>
			</table>
		); 
	}

	headerMessage = (movies) =>	(movies.length === 0) ? 'There are no movies' : `Showing ${movies.length} movies from database`;

	render() {
		const { 
			movies: allMovies, 
			pageSize, currentPage, 
			genres, 
			selectedGenre 
		} = this.state;

		// filter based on genres if selectedGenre is true and it contains an _id
		const filtered = selectedGenre && selectedGenre._id
			? allMovies.filter(m => m.genre._id === selectedGenre._id)
			: allMovies;

		const movies = paginate(filtered, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-2">
					<ListGroup 
						items={genres} 
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>

				<div className="col">
					<span>{ this.headerMessage(movies) }</span>
					{ this.renderTable(movies) }

					<Pagination 
						itemsCount={filtered.length} 
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}	
}

export default Movies;


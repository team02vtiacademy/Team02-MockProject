package com.vti.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.vti.entity.Film;
import com.vti.entity.User;
import com.vti.filter.FilmFilterForm;
import com.vti.form.film.CreatingFilmForm;
import com.vti.form.film.UpdatingFilmForm;
import com.vti.repository.IFilmRepository;
import com.vti.specification.film.FilmSpecification;

@Service
public class FilmService implements IFilmService {
	
	@Autowired 
	private IFilmRepository repository;

	@Override
	public Page<Film> getAllFilms(Pageable pageable, String search, FilmFilterForm filter) {
		
		Specification<Film> where = FilmSpecification.buildWhere(search, filter);
		
		return repository.findAll(where, pageable);
	}

	@Override
	public boolean isFilmExistsByName(String name) {
		return repository.existsByName(name);
	}
	
	public boolean isFilmExistsByID(Integer id) {
		return repository.existsById(id);
	}

	@Override
	public Film getFilmByID(Integer id) {
		return repository.findById(id).get();
	}

	@Override
	public void deleteFilm(Integer id) {
		repository.deleteById(id);
	}
	
	@Override
	@Transactional
	public int createFilm(User user, CreatingFilmForm form) {
		Film film = form.toEntity();
		
		film.setUser(user);
		
		Film saved = repository.save(film);
		return saved.getFilmId();
		
	}

	public void updateFilm(Integer id, UpdatingFilmForm form) {
		Film entity = repository.getById(id);

		if(form.getName() == null || form.getName().isEmpty()) {
			form.setName(entity.getName());
		}
		if(form.getDirectors() == null || form.getDirectors().isEmpty()) {
			form.setDirectors(entity.getDirectors());
		}
		if(form.getActors() == null || form.getActors().isEmpty()) {
			form.setActors(entity.getActors());
		}
		if(form.getGenre() == null || form.getGenre().isEmpty()) {
			form.setGenre(entity.getGenre());
		}
		if(form.getDuration() == null || form.getDuration().isEmpty()) {
			form.setDuration(entity.getDuration());
		}
		if(form.getDescription() == null || form.getDescription().isEmpty()) {
			form.setDescription(entity.getDescription());
		}
		if(form.getTicketPrice() == null || form.getTicketPrice().equals(entity.getTicketPrice())) {
			form.setTicketPrice(entity.getTicketPrice());
		}
		if(form.getPoster() == null || form.getPoster().isEmpty()) {
			form.setPoster(entity.getPoster());
		}
		
		entity.setName(form.getName());
		entity.setDirectors(form.getDirectors());
		entity.setActors(form.getActors());
		entity.setGenre(form.getGenre());
		entity.setDuration(form.getDuration());
		entity.setDescription(form.getDescription());
		entity.setTicketPrice(form.getTicketPrice());
		entity.setPoster(form.getPoster());
		
		repository.save(entity);
	}	
}


package br.com.srhub.srhub_api.repository;

import br.com.srhub.srhub_api.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Integer> {
}
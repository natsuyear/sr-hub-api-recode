package br.com.srhub.srhub_api.repository;

import br.com.srhub.srhub_api.model.Curso;   // MUDOU: era Vaga
import org.springframework.data.jpa.repository.JpaRepository;

// O ajudante de cozinha dos cursos.
// <Curso, Integer> = ele cuida de fichas de Curso, e o id é um número inteiro.
public interface CursoRepository extends JpaRepository<Curso, Integer> {   // MUDOU: era Vaga
}
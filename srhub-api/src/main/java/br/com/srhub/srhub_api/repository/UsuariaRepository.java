package br.com.srhub.srhub_api.repository;

import br.com.srhub.srhub_api.model.Usuaria;   // MUDOU: era Curso
import org.springframework.data.jpa.repository.JpaRepository;

// O ajudante de cozinha das usuárias.
public interface UsuariaRepository extends JpaRepository<Usuaria, Integer> {   // MUDOU: era Curso
}
package br.com.srhub.srhub_api.repository;

import br.com.srhub.srhub_api.model.Usuaria;   // MUDOU: era Curso
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariaRepository extends JpaRepository<Usuaria, Integer> {   // MUDOU: era Curso
}
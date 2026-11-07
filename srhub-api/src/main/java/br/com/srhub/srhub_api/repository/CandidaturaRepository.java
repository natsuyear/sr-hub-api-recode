package br.com.srhub.srhub_api.repository;

import br.com.srhub.srhub_api.model.Candidatura;   // MUDOU: era Usuaria
import org.springframework.data.jpa.repository.JpaRepository;

// O ajudante de cozinha das candidaturas.
public interface CandidaturaRepository extends JpaRepository<Candidatura, Integer> {   // MUDOU
}
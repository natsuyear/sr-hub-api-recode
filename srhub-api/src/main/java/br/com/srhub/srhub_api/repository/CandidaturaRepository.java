package br.com.srhub.srhub_api.repository;

import br.com.srhub.srhub_api.model.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidaturaRepository extends JpaRepository<Candidatura, Integer> {
}
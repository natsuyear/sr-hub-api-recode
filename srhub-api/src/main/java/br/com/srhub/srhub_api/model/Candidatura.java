package br.com.srhub.srhub_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "candidaturas")
public class Candidatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer usuariaId;          // usuaria_id: QUEM se candidatou
    private Integer vagaId;             // vaga_id: PRA QUAL vaga
    private LocalDate dataCandidatura;  // data_candidatura
    private String status;              // enviada, em análise, aprovada, recusada

    // GETTERS E SETTERS (as gavetas)

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getUsuariaId() { return usuariaId; }
    public void setUsuariaId(Integer usuariaId) { this.usuariaId = usuariaId; }

    public Integer getVagaId() { return vagaId; }
    public void setVagaId(Integer vagaId) { this.vagaId = vagaId; }

    public LocalDate getDataCandidatura() { return dataCandidatura; }
    public void setDataCandidatura(LocalDate dataCandidatura) { this.dataCandidatura = dataCandidatura; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

}   // <- aqui FECHA a classe
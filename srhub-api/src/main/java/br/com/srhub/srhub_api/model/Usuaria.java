package br.com.srhub.srhub_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarias")
public class Usuaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String email;
    private String telefone;
    private String periodoDisponivel;   // periodo_disponivel no banco
    private Integer horasLivresDia;     // horas_livres_dia no banco
    private Integer quantidadeFilhos;   // quantidade_filhos no banco
    private String areaInteresse;       // area_interesse no banco
    private Boolean temComputador;      // tem_computador no banco

    // GETTERS E SETTERS (as gavetas)

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getPeriodoDisponivel() { return periodoDisponivel; }
    public void setPeriodoDisponivel(String periodoDisponivel) { this.periodoDisponivel = periodoDisponivel; }

    public Integer getHorasLivresDia() { return horasLivresDia; }
    public void setHorasLivresDia(Integer horasLivresDia) { this.horasLivresDia = horasLivresDia; }

    public Integer getQuantidadeFilhos() { return quantidadeFilhos; }
    public void setQuantidadeFilhos(Integer quantidadeFilhos) { this.quantidadeFilhos = quantidadeFilhos; }

    public String getAreaInteresse() { return areaInteresse; }
    public void setAreaInteresse(String areaInteresse) { this.areaInteresse = areaInteresse; }

    public Boolean getTemComputador() { return temComputador; }
    public void setTemComputador(Boolean temComputador) { this.temComputador = temComputador; }

}   // <- aqui FECHA a classe
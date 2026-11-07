package br.com.srhub.srhub_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cursos")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String titulo;
    private String descricao;
    private String area;
    private Integer cargaHoraria;      // carga_horaria no banco
    private Boolean noProprioRitmo;    // no_proprio_ritmo no banco
    private Boolean gratuito;
    private String link;
    private Integer prazoAcessoDias;   // vazio = acesso livre

    // GETTERS E SETTERS (as gavetas)

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public Integer getCargaHoraria() { return cargaHoraria; }
    public void setCargaHoraria(Integer cargaHoraria) { this.cargaHoraria = cargaHoraria; }

    public Boolean getNoProprioRitmo() { return noProprioRitmo; }
    public void setNoProprioRitmo(Boolean noProprioRitmo) { this.noProprioRitmo = noProprioRitmo; }

    public Boolean getGratuito() { return gratuito; }
    public void setGratuito(Boolean gratuito) { this.gratuito = gratuito; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public Integer getPrazoAcessoDias() { return prazoAcessoDias; }
    public void setPrazoAcessoDias(Integer prazoAcessoDias) { this.prazoAcessoDias = prazoAcessoDias; }

}   // <- aqui FECHA a classe
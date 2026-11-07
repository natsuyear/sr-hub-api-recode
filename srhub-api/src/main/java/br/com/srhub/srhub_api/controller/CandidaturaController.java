package br.com.srhub.srhub_api.controller;

import br.com.srhub.srhub_api.model.Candidatura;                  // MUDOU
import br.com.srhub.srhub_api.repository.CandidaturaRepository;   // MUDOU
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidaturas")                                  // MUDOU
public class CandidaturaController {                              // MUDOU

    private final CandidaturaRepository repository;               // MUDOU

    public CandidaturaController(CandidaturaRepository repository) {   // MUDOU
        this.repository = repository;
    }

    // VER todas as candidaturas
    @GetMapping
    public List<Candidatura> listar() {
        return repository.findAll();
    }

    // CRIAR uma candidatura
    @PostMapping
    public Candidatura criar(@RequestBody Candidatura candidatura) {
        return repository.save(candidatura);
    }

    // EDITAR (ex.: mudar o status)
    @PutMapping("/{id}")
    public Candidatura atualizar(@PathVariable Integer id, @RequestBody Candidatura candidatura) {
        candidatura.setId(id);
        return repository.save(candidatura);
    }

    // APAGAR (cancelar a candidatura)
    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Integer id) {
        repository.deleteById(id);
    }

}   // <- aqui FECHA a classe
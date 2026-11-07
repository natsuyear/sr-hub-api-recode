package br.com.srhub.srhub_api.controller;

import br.com.srhub.srhub_api.model.Vaga;
import br.com.srhub.srhub_api.repository.VagaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vagas")
public class VagaController {

    private final VagaRepository repository;

    public VagaController(VagaRepository repository) {
        this.repository = repository;
    }

    // VER todas as vagas
    @GetMapping
    public List<Vaga> listar() {
        return repository.findAll();
    }

    // CRIAR uma vaga
    @PostMapping
    public Vaga criar(@RequestBody Vaga vaga) {
        return repository.save(vaga);
    }

    // EDITAR uma vaga (NOVO)
    @PutMapping("/{id}")
    public Vaga atualizar(@PathVariable Integer id, @RequestBody Vaga vaga) {
        vaga.setId(id);                 // diz qual vaga é (a da URL)
        return repository.save(vaga);   // salva por cima da antiga
    }

    // APAGAR uma vaga
    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Integer id) {
        repository.deleteById(id);
    }

}
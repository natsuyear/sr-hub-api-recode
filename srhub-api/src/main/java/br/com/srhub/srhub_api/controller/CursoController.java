package br.com.srhub.srhub_api.controller;

import br.com.srhub.srhub_api.model.Curso;                  // MUDOU: era Vaga
import br.com.srhub.srhub_api.repository.CursoRepository;   // MUDOU: era VagaRepository
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")                                 // MUDOU: era /vagas
public class CursoController {                             // MUDOU: era VagaController

    private final CursoRepository repository;              // MUDOU

    public CursoController(CursoRepository repository) {   // MUDOU
        this.repository = repository;
    }

    // VER todos os cursos
    @GetMapping
    public List<Curso> listar() {                          // MUDOU: List<Curso>
        return repository.findAll();
    }

    // CRIAR um curso
    @PostMapping
    public Curso criar(@RequestBody Curso curso) {         // MUDOU
        return repository.save(curso);
    }

    // EDITAR um curso
    @PutMapping("/{id}")
    public Curso atualizar(@PathVariable Integer id, @RequestBody Curso curso) {   // MUDOU
        curso.setId(id);
        return repository.save(curso);
    }

    // APAGAR um curso
    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Integer id) {
        repository.deleteById(id);
    }

}   // <- aqui FECHA a classe
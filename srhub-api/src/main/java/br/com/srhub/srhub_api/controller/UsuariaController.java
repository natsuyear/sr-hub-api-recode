package br.com.srhub.srhub_api.controller;

import br.com.srhub.srhub_api.model.Usuaria;                  // MUDOU: era Curso
import br.com.srhub.srhub_api.repository.UsuariaRepository;   // MUDOU: era CursoRepository
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarias")                                  // MUDOU: era /cursos
public class UsuariaController {                              // MUDOU

    private final UsuariaRepository repository;               // MUDOU

    public UsuariaController(UsuariaRepository repository) {  // MUDOU
        this.repository = repository;
    }

    // VER todas as usuárias
    @GetMapping
    public List<Usuaria> listar() {
        return repository.findAll();
    }

    // CRIAR uma usuária
    @PostMapping
    public Usuaria criar(@RequestBody Usuaria usuaria) {
        return repository.save(usuaria);
    }

    // EDITAR uma usuária
    @PutMapping("/{id}")
    public Usuaria atualizar(@PathVariable Integer id, @RequestBody Usuaria usuaria) {
        usuaria.setId(id);
        return repository.save(usuaria);
    }

    // APAGAR uma usuária
    @DeleteMapping("/{id}")
    public void apagar(@PathVariable Integer id) {
        repository.deleteById(id);
    }

}   // <- aqui FECHA a classe
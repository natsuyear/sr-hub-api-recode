import { useState, useEffect } from "react";
import api from "../services/api";

function Cursos() {
  const [cursos, setCursos] = useState([]);

  const [perfil, setPerfil] = useState("candidata");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [area, setArea] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState(10);
  const [noProprioRitmo, setNoProprioRitmo] = useState(true);
  const [gratuito, setGratuito] = useState(true);
  const [link, setLink] = useState("");
  const [prazoAcessoDias, setPrazoAcessoDias] = useState(0);
  const [editandoId, setEditandoId] = useState(null);

  function carregarCursos() {
    api.get("/cursos").then((response) => {
      setCursos(response.data);
    });
  }

  useEffect(() => {
    carregarCursos();
  }, []);

  function salvarCurso(e) {
    e.preventDefault();

    const novoCurso = {
      titulo,
      descricao,
      area,
      cargaHoraria: Number(cargaHoraria),
      noProprioRitmo,
      gratuito,
      link,
      prazoAcessoDias: Number(prazoAcessoDias),
    };

    const pedido = editandoId
      ? api.put(`/cursos/${editandoId}`, novoCurso)
      : api.post("/cursos", novoCurso);

    pedido.then(() => {
      carregarCursos();
      limparFormulario();
    });
  }

  function limparFormulario() {
    setEditandoId(null);
    setTitulo("");
    setDescricao("");
    setArea("");
    setCargaHoraria(10);
    setNoProprioRitmo(true);
    setGratuito(true);
    setLink("");
    setPrazoAcessoDias(0);
  }

  function iniciarEdicao(curso) {
    setEditandoId(curso.id);
    setTitulo(curso.titulo);
    setDescricao(curso.descricao || "");
    setArea(curso.area || "");
    setCargaHoraria(curso.cargaHoraria || 0);
    setNoProprioRitmo(curso.noProprioRitmo);
    setGratuito(curso.gratuito);
    setLink(curso.link || "");
    setPrazoAcessoDias(curso.prazoAcessoDias || 0);
  }

  async function excluirCurso(id) {
    const senha = window.prompt("Digite a senha para excluir:");
    if (senha !== "srhub123") {
      alert("Senha incorreta. Nada foi apagado.");
      return;
    }
    await api.delete(`/cursos/${id}`);
    carregarCursos();
  }

  return (
    <div>
      <h2>Cursos</h2>

      <label>
        Ver como:
        <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
          <option value="candidata">Candidata</option>
          <option value="empresa">Empresa</option>
        </select>
      </label>

      {perfil === "empresa" && (
        <form onSubmit={salvarCurso}>
          <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          <input placeholder="Área (ex: Tecnologia)" value={area} onChange={(e) => setArea(e.target.value)} />
          <input type="number" placeholder="Carga horária" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} />

          <label>
            <input type="checkbox" checked={noProprioRitmo} onChange={(e) => setNoProprioRitmo(e.target.checked)} />
            No próprio ritmo
          </label>

          <label>
            <input type="checkbox" checked={gratuito} onChange={(e) => setGratuito(e.target.checked)} />
            Gratuito
          </label>

          <input placeholder="Link do curso" value={link} onChange={(e) => setLink(e.target.value)} />
          <input type="number" placeholder="Dias de acesso (0 = livre)" value={prazoAcessoDias} onChange={(e) => setPrazoAcessoDias(e.target.value)} />

          <button type="submit">{editandoId ? "Salvar alterações" : "Cadastrar curso"}</button>

          {editandoId && (
            <button type="button" onClick={limparFormulario}>Cancelar</button>
          )}
        </form>
      )}

      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            <h3>{curso.titulo}</h3>
            <p>{curso.descricao}</p>
            <p>Área: {curso.area}</p>
            <p>Carga horária: {curso.cargaHoraria}h</p>
            <p>{curso.noProprioRitmo ? "No seu ritmo" : "Com horário marcado"}</p>
            <p>{curso.gratuito ? "Gratuito" : "Pago"}</p>
            <p>{curso.prazoAcessoDias ? `Acesso por ${curso.prazoAcessoDias} dias` : "Acesso livre"}</p>

            {curso.link && (
              <a href={curso.link} target="_blank" rel="noreferrer">Acessar curso</a>
            )}

            {perfil === "empresa" && (
              <>
                <button onClick={() => iniciarEdicao(curso)} title="Editar curso">
                  ✏️
                </button>
                <button onClick={() => excluirCurso(curso.id)} title="Excluir curso">
                  🗑️
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cursos;
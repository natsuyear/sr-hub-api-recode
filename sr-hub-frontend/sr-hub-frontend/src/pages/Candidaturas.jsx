import { useState, useEffect } from "react";
import api from "../services/api";

const frases = {
  "enviada": "Parabéns, aqui começa a sua jornada.",
  "em análise": "Tudo começa no início. O primeiro passo você já deu.",
  "aprovada": "Está preparada? Aqui você vai além.",
};

function Candidaturas() {
  const [candidaturas, setCandidaturas] = useState([]);
  const [usuarias, setUsuarias] = useState([]);
  const [vagas, setVagas] = useState([]);

  const [perfil, setPerfil] = useState("candidata");

  const [usuariaId, setUsuariaId] = useState("");
  const [vagaId, setVagaId] = useState("");

  function carregarTudo() {
    api.get("/candidaturas").then((response) => setCandidaturas(response.data));
    api.get("/usuarias").then((response) => setUsuarias(response.data));
    api.get("/vagas").then((response) => setVagas(response.data));
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  function nomeDaUsuaria(id) {
    const usuaria = usuarias.find((u) => u.id === id);
    return usuaria ? usuaria.nome : `Usuária ${id}`;
  }

  function tituloDaVaga(id) {
    const vaga = vagas.find((v) => v.id === id);
    return vaga ? vaga.titulo : `Vaga ${id}`;
  }

  function candidatar(e) {
    e.preventDefault();

    const novaCandidatura = {
      usuariaId: Number(usuariaId),
      vagaId: Number(vagaId),
      dataCandidatura: new Date().toISOString().slice(0, 10),
      status: "Enviada",
    };

    api.post("/candidaturas", novaCandidatura).then(() => {
      carregarTudo();
      setVagaId("");
      alert(frases["enviada"]);
    });
  }

  function mudarStatus(candidatura, novoStatus) {
    api
      .put(`/candidaturas/${candidatura.id}`, { ...candidatura, status: novoStatus })
      .then(() => carregarTudo());
  }

  async function excluirCandidatura(id) {
    const senha = window.prompt("Digite a senha para excluir:");
    if (senha !== "srhub123") {
      alert("Senha incorreta. Nada foi apagado.");
      return;
    }
    await api.delete(`/candidaturas/${id}`);
    carregarTudo();
  }

  return (
    <div>
      <h2>Minhas candidaturas</h2>

      <label>
        Ver como:
        <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
          <option value="candidata">Candidata</option>
          <option value="empresa">Empresa</option>
        </select>
      </label>

      {perfil === "candidata" && (
        <form onSubmit={candidatar}>
          <select value={usuariaId} onChange={(e) => setUsuariaId(e.target.value)} required>
            <option value="">Quem é você?</option>
            {usuarias.map((usuaria) => (
              <option key={usuaria.id} value={usuaria.id}>{usuaria.nome}</option>
            ))}
          </select>

          <select value={vagaId} onChange={(e) => setVagaId(e.target.value)} required>
            <option value="">Escolha a vaga</option>
            {vagas.map((vaga) => (
              <option key={vaga.id} value={vaga.id}>{vaga.titulo}</option>
            ))}
          </select>

          <button type="submit">Candidatar-me</button>
        </form>
      )}

      <ul>
        {candidaturas.map((candidatura) => (
          <li key={candidatura.id}>
            <h3>{tituloDaVaga(candidatura.vagaId)}</h3>
            <p>{nomeDaUsuaria(candidatura.usuariaId)}</p>
            <p>Enviada em: {candidatura.dataCandidatura}</p>
            <p>Status: {candidatura.status}</p>
            <p>{frases[(candidatura.status || "").toLowerCase()]}</p>

            {perfil === "empresa" && (
              <>
                <select value={candidatura.status} onChange={(e) => mudarStatus(candidatura, e.target.value)}>
                  <option>Enviada</option>
                  <option>Em análise</option>
                  <option>Aprovada</option>
                  <option>Recusada</option>
                </select>
                <button onClick={() => excluirCandidatura(candidatura.id)} title="Excluir candidatura">
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

export default Candidaturas;
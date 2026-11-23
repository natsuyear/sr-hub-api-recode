import { useState, useEffect } from "react";
import api from "../services/api";

function Usuarias() {
  const [usuarias, setUsuarias] = useState([]);

  const [perfil, setPerfil] = useState("candidata");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [periodoDisponivel, setPeriodoDisponivel] = useState("Manhã");
  const [horasLivresDia, setHorasLivresDia] = useState(2);
  const [quantidadeFilhos, setQuantidadeFilhos] = useState(1);
  const [areaInteresse, setAreaInteresse] = useState("");
  const [temComputador, setTemComputador] = useState(true);
  const [editandoId, setEditandoId] = useState(null);

  function carregarUsuarias() {
    api.get("/usuarias").then((response) => {
      setUsuarias(response.data);
    });
  }

  useEffect(() => {
    carregarUsuarias();
  }, []);

  function salvarUsuaria(e) {
    e.preventDefault();

    const novaUsuaria = {
      nome,
      email,
      telefone,
      periodoDisponivel,
      horasLivresDia: Number(horasLivresDia),
      quantidadeFilhos: Number(quantidadeFilhos),
      areaInteresse,
      temComputador,
    };

    const pedido = editandoId
      ? api.put(`/usuarias/${editandoId}`, novaUsuaria)
      : api.post("/usuarias", novaUsuaria);

    pedido
      .then(() => {
        carregarUsuarias();
        limparFormulario();
        alert("Cadastro salvo! Parabéns, aqui começa a sua jornada.");
      })
      .catch(() => {
        alert("Não deu para salvar. Esse e-mail já pode estar cadastrado.");
      });
  }

  function limparFormulario() {
    setEditandoId(null);
    setNome("");
    setEmail("");
    setTelefone("");
    setPeriodoDisponivel("Manhã");
    setHorasLivresDia(2);
    setQuantidadeFilhos(1);
    setAreaInteresse("");
    setTemComputador(true);
  }

  function iniciarEdicao(usuaria) {
    setEditandoId(usuaria.id);
    setNome(usuaria.nome);
    setEmail(usuaria.email);
    setTelefone(usuaria.telefone || "");
    setPeriodoDisponivel(usuaria.periodoDisponivel || "Manhã");
    setHorasLivresDia(usuaria.horasLivresDia || 0);
    setQuantidadeFilhos(usuaria.quantidadeFilhos || 0);
    setAreaInteresse(usuaria.areaInteresse || "");
    setTemComputador(usuaria.temComputador);
  }

  async function excluirUsuaria(id) {
    const senha = window.prompt("Digite a senha para excluir:");
    if (senha !== "srhub123") {
      alert("Senha incorreta. Nada foi apagado.");
      return;
    }
    await api.delete(`/usuarias/${id}`);
    carregarUsuarias();
  }

  return (
    <div>
      <h2>Usuárias</h2>

      <label>
        Ver como:
        <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
          <option value="candidata">Candidata</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <h3>{editandoId ? "Editar cadastro" : "Crie seu cadastro"}</h3>

      <form onSubmit={salvarUsuaria}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />

        <label>
          Período livre:
          <select value={periodoDisponivel} onChange={(e) => setPeriodoDisponivel(e.target.value)}>
            <option>Manhã</option>
            <option>Tarde</option>
            <option>Noite</option>
            <option>Flexível</option>
          </select>
        </label>

        <input type="number" placeholder="Horas livres por dia" value={horasLivresDia} onChange={(e) => setHorasLivresDia(e.target.value)} />
        <input type="number" placeholder="Quantidade de filhos" value={quantidadeFilhos} onChange={(e) => setQuantidadeFilhos(e.target.value)} />
        <input placeholder="Área de interesse (ex: Design)" value={areaInteresse} onChange={(e) => setAreaInteresse(e.target.value)} />

        <label>
          <input type="checkbox" checked={temComputador} onChange={(e) => setTemComputador(e.target.checked)} />
          Tenho computador
        </label>

        <button type="submit">{editandoId ? "Salvar alterações" : "Cadastrar"}</button>

        {editandoId && (
          <button type="button" onClick={limparFormulario}>Cancelar</button>
        )}
      </form>

      {perfil === "admin" && (
        <ul>
          {usuarias.map((usuaria) => (
            <li key={usuaria.id}>
              <h3>{usuaria.nome}</h3>
              <p>{usuaria.email}</p>
              <p>{usuaria.telefone}</p>
              <p>Período livre: {usuaria.periodoDisponivel}</p>
              <p>{usuaria.horasLivresDia}h livres por dia</p>
              <p>Filhos: {usuaria.quantidadeFilhos}</p>
              <p>Interesse: {usuaria.areaInteresse}</p>
              <p>{usuaria.temComputador ? "Tem computador" : "Sem computador"}</p>

              <button onClick={() => iniciarEdicao(usuaria)} title="Editar cadastro">
                ✏️
              </button>
              <button onClick={() => excluirUsuaria(usuaria.id)} title="Excluir cadastro">
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Usuarias;

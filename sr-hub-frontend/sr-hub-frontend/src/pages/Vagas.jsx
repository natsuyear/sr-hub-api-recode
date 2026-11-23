import { useState, useEffect } from "react";
import api from "../services/api";

function Vagas() {
  const [vagas, setVagas] = useState([]);

  const [perfil, setPerfil] = useState("candidata");

  const [titulo, setTitulo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modalidade, setModalidade] = useState("Remoto");
  const [horarioFlexivel, setHorarioFlexivel] = useState(true);
  const [cargaHorariaSemanal, setCargaHorariaSemanal] = useState(20);
  const [salario, setSalario] = useState(0);
  const [editandoId, setEditandoId] = useState(null);
  const [dataPublicacao, setDataPublicacao] = useState("");

  function carregarVagas() {
    api.get("/vagas").then((response) => {
      setVagas(response.data);
    });
  }

  useEffect(() => {
    carregarVagas();
  }, []);

  function criarVaga(e) {
    e.preventDefault();

    const novaVaga = {
      titulo,
      empresa,
      descricao,
      modalidade,
      horarioFlexivel,
      cargaHorariaSemanal: Number(cargaHorariaSemanal),
      salario: Number(salario),
      dataPublicacao: editandoId ? dataPublicacao : new Date().toISOString().slice(0, 10),
    };

    const pedido = editandoId
      ? api.put(`/vagas/${editandoId}`, novaVaga)
      : api.post("/vagas", novaVaga);

    pedido.then(() => {
      carregarVagas();
      limparFormulario();
    });
  }

  function limparFormulario() {
    setEditandoId(null);
    setTitulo("");
    setEmpresa("");
    setDescricao("");
    setModalidade("Remoto");
    setHorarioFlexivel(true);
    setCargaHorariaSemanal(20);
    setSalario(0);
  }

  function iniciarEdicao(vaga) {
    setEditandoId(vaga.id);
    setTitulo(vaga.titulo);
    setEmpresa(vaga.empresa || "");
    setDescricao(vaga.descricao || "");
    setModalidade(vaga.modalidade || "Remoto");
    setHorarioFlexivel(vaga.horarioFlexivel);
    setCargaHorariaSemanal(vaga.cargaHorariaSemanal || 0);
    setSalario(vaga.salario || 0);
    setDataPublicacao(vaga.dataPublicacao);
  }

  async function excluirVaga(id) {
    const senha = window.prompt("Digite a senha para excluir:");
    if (senha !== "srhub123") {
      alert("Senha incorreta. Nada foi apagado.");
      return;
    }
    await api.delete(`/vagas/${id}`);
    carregarVagas();
  }

  return (
    <div>
      <h2>Vagas</h2>

      <label>
        Ver como:
        <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
          <option value="candidata">Candidata</option>
          <option value="empresa">Empresa</option>
        </select>
      </label>

      {perfil === "empresa" && (
        <form onSubmit={criarVaga}>
          <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          <input placeholder="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

          <select value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
            <option>Remoto</option>
            <option>Híbrido</option>
            <option>Presencial</option>
          </select>

          <label>
            <input type="checkbox" checked={horarioFlexivel} onChange={(e) => setHorarioFlexivel(e.target.checked)} />
            Horário flexível
          </label>

          <input type="number" placeholder="Horas por semana" value={cargaHorariaSemanal} onChange={(e) => setCargaHorariaSemanal(e.target.value)} />
          <input type="number" placeholder="Salário" value={salario} onChange={(e) => setSalario(e.target.value)} />

          <button type="submit">{editandoId ? "Salvar alterações" : "Cadastrar vaga"}</button>

          {editandoId && (
            <button type="button" onClick={limparFormulario}>Cancelar</button>
          )}
        </form>
      )}

      <ul>
        {vagas.map((vaga) => (
          <li key={vaga.id}>
            <h3>{vaga.titulo}</h3>
            <p>{vaga.empresa}</p>
            <p>{vaga.descricao}</p>
            <p>Modalidade: {vaga.modalidade}</p>
            <p>{vaga.horarioFlexivel ? "Horário flexível" : "Horário fixo"}</p>
            <p>Carga Horária Semanal: {vaga.cargaHorariaSemanal}h</p>
            <p>Salário: {Number(vaga.salario || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>

            {perfil === "empresa" && (
              <>
                <button onClick={() => iniciarEdicao(vaga)} title="Editar vaga">
                  ✏️
                </button>
                <button onClick={() => excluirVaga(vaga.id)} title="Excluir vaga">
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

export default Vagas;
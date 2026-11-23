# 💎 S R Hub

> **Seu talento é uma joia.** Trabalho e estudo no seu ritmo.

O **S R Hub** é uma plataforma que reúne **vagas remotas e flexíveis** e **cursos no próprio ritmo** para mães, pais e responsáveis (18+) que precisam de renda enquanto cuidam das crianças.

O nome vem das minhas filhas, **Safira e Ruby**, e as duas joias inspiram toda a identidade visual.

Projeto final do curso **Full-Stack da Recode** (Transforma Futuros), desenvolvido por mim com o auxílio do Hark.

---

## 🌍 Problema e ODS

Jornadas fixas não cabem na rotina de escola, refeições e cuidados. Como o cuidado ainda recai mais sobre as mulheres, muitas perdem trabalho e renda:

- Mulheres dedicam **21,3 h por semana** a cuidados e afazeres domésticos, contra **11,7 h** dos homens (IBGE, PNAD Contínua 2022).
- **48%** das mães estão fora do mercado de trabalho 12 meses após a licença-maternidade (FGV, 2017).

**ODS 10 – Redução das Desigualdades** (também toca os ODS 5 e 8).

---

## 🏗️ Arquitetura

```
React (telas)  →  API Java Spring Boot (regras e rotas)  →  MySQL (dados)
```

## 🛠️ Tecnologias

- **Back-end:** Java 21, Spring Boot 4, Spring Web, Spring Data JPA, Maven
- **Banco de dados:** MySQL
- **Front-end:** React + Vite *(em desenvolvimento)*
- **Ferramentas:** IntelliJ IDEA, Postman, Git e GitHub

---

## 🗄️ Banco de dados

O script está em [`sr_hub.sql`](sr_hub.sql) e cria o banco `sr_hub` com 4 tabelas:

| Tabela | O que guarda |
|---|---|
| `usuarias` | Nome, e-mail, telefone, período disponível, horas livres por dia, quantidade de filhos, área de interesse e se tem computador |
| `vagas` | Título, empresa, descrição, modalidade, horário flexível, carga horária semanal, salário e data de publicação |
| `cursos` | Título, descrição, área, carga horária, se é no próprio ritmo, se é gratuito, link e prazo de acesso (vazio = acesso livre) |
| `candidaturas` | Qual usuária se candidatou a qual vaga, data e status (enviada, em análise, aprovada, recusada) |

---

## 🔗 Endpoints da API

A API roda em `http://localhost:8080` e tem **4 CRUDs completos**:

| Método | Rota | O que faz |
|---|---|---|
| GET | `/vagas` | Lista todas as vagas |
| POST | `/vagas` | Cria uma vaga |
| PUT | `/vagas/{id}` | Edita uma vaga |
| DELETE | `/vagas/{id}` | Apaga uma vaga |

As mesmas 4 operações funcionam em `/cursos`, `/usuarias` e `/candidaturas`.

**Exemplo de POST em `/vagas`:**

```json
{
  "titulo": "Atendente de Suporte Remoto",
  "empresa": "Connect Plus S.A.",
  "descricao": "Atendimento por chat, 4 horas por dia.",
  "modalidade": "Remoto",
  "horarioFlexivel": true,
  "cargaHorariaSemanal": 20,
  "salario": 1800.00,
  "dataPublicacao": "2026-11-19"
}
```

**Exemplo de POST em `/candidaturas`:**

```json
{
  "usuariaId": 1,
  "vagaId": 1,
  "dataCandidatura": "2026-11-19",
  "status": "em análise"
}
```

> A usuária e a vaga precisam existir antes de criar a candidatura.

---

## ▶️ Como rodar o projeto

1. **Banco:** abra o MySQL Workbench e execute o arquivo `sr_hub.sql`.
2. **Senha do banco:** a senha não fica no código. No IntelliJ, vá em *Run > Edit Configurations* e crie a variável de ambiente:
   ```
   DB_PASSWORD=sua_senha_do_mysql
   ```
3. **API:** abra a pasta `srhub-api` no IntelliJ e rode a classe `SrhubApiApplication`.
4. **Teste:** acesse `http://localhost:8080/vagas` no navegador ou no Postman.

> O CORS já está liberado para o React em `localhost:5173` e `localhost:3000`.

---

## 📁 Estrutura

```
sr-hub-api-recode/
├── sr_hub.sql                 # script do banco
└── srhub-api/
    └── src/main/java/br/com/srhub/srhub_api/
        ├── config/            # CorsConfig
        ├── controller/        # rotas da API
        ├── model/             # Vaga, Curso, Usuaria, Candidatura
        └── repository/        # acesso ao banco
```

---

## 🚀 Próximos passos

- [ ] Front-end em React conectado à API
- [ ] Pesquisa com mães para validar as necessidades
- [ ] Portal de parceiros e curadoria com selo de verificação
- [ ] Favoritos, alertas de novas vagas e adequação à LGPD

---

## 👩‍💻 Autora

**Nathália Nishimuta**
Product Designer e Desenvolvedora FullStack (em formação)
📧 nishimutanathalia@gmail.com

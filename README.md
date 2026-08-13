# SMD Cronogramas

## Autenticação

O backend (`cronograma-core`) usa **JWT** (JSON Web Token) pra autenticação. O fluxo é:

1. O usuário se cadastra (`POST /api/user`) — a senha é salva com **hash bcrypt**, nunca em texto puro.
2. O usuário faz login (`POST /api/login`) — se email + senha baterem, a API devolve um **token JWT** válido por **12 horas**.
3. Esse token é enviado no header `Authorization` das próximas requisições, nas rotas que exigem autenticação.
4. O middleware `autenticar` valida o token antes de deixar a requisição passar pro controller.

Arquivos principais:
- [`auth.controller.ts`](cronograma-core/src/controllers/auth.controller.ts) — gera o token no login
- [`auth.middleware.ts`](cronograma-core/src/middlewares/auth.middleware.ts) — valida o token nas rotas protegidas
- [`user.controller.ts`](cronograma-core/src/controllers/user.controller.ts) — cadastro/edição/remoção de usuário
- [`auth.routes.ts`](cronograma-core/src/routes/auth.routes.ts) / [`user.routes.ts`](cronograma-core/src/routes/user.routes.ts) — definição das rotas

### Rotas disponíveis

| Método | Rota | Precisa de token? | Descrição |
|---|---|---|---|
| `POST` | `/api/user` | Não | Cadastra um novo usuário |
| `POST` | `/api/login` | Não | Faz login e retorna o token |
| `PUT` | `/api/user/:id` | **Sim** | Atualiza um usuário |
| `DELETE` | `/api/user/:id` | **Sim** | Remove um usuário |

---

### `POST /api/user` — Cadastrar usuário

**Body:**
```json
{
  "name": "André Borges",
  "email": "andre@exemplo.com",
  "password": "minhaSenha123"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário criado com sucesso!"
}
```

---

### `POST /api/login` — Fazer login

**Body:**
```json
{
  "email": "andre@exemplo.com",
  "password": "minhaSenha123"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Login efetuado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Esse `token` é o que você precisa guardar (localStorage, cookie, onde fizer sentido no client) e mandar nas próximas requisições protegidas.

**Erros possíveis:**
- `401` — usuário não encontrado ou senha incorreta
- `500` — erro inesperado no servidor

---

### `PUT /api/user/:id` — Atualizar usuário 🔒

Precisa do header:
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "André G. Borges",
  "email": "andre@exemplo.com",
  "password": "novaSenha456"
}
```
> `password` é opcional aqui — se não enviar, a senha atual é mantida.

**Resposta (200):**
```json
{
  "message": "Usuário com ID <id> atualizado com sucesso!"
}
```

---

### `DELETE /api/user/:id` — Remover usuário 🔒

Precisa do header:
```
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "message": "Usuário com ID <id> deletado com sucesso!"
}
```

---

### Rotas protegidas: o que acontece sem token ou com token inválido

Se faltar o header `Authorization`:
```json
{
  "message": "Token não fornecido"
}
```
→ status `401`

Se o token for inválido ou tiver expirado:
```json
{
  "message": "Token inválido"
}
```
→ status `401`

### O que tem dentro do token

O JWT carrega o `id` e o `email` do usuário logado:
```json
{
  "id": "uuid-do-usuario",
  "email": "andre@exemplo.com",
  "iat": 1234567890,
  "exp": 1234610890
}
```
Você pode decodificar qualquer token (sem precisar da secret) colando ele em [jwt.io](https://jwt.io) pra debugar.

### Variáveis de ambiente necessárias

```
JWT_SECRET=alguma-string-secreta
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=...
DB_DATABASE=...
```
Veja [`.env.example`](cronograma-core/.env.example).

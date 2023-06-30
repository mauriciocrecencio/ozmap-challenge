# CRUD de usuários

Simples API desenvolvida em Node com o auxílio do framework KOA. Conta com testes utilizando as ferramentas Chai e Mocha

## Instalação e rodando a API

A aplicação tem o Docker configurado, então rodando o comando abaixo, já irá subir um container Docker com a porta 3000 exposta para as requisições:

```bash
  docker-compose up
```

Caso tenha algum problema com o Docker, pode instalar as dependências e iniciar o servidor manualmente com:

```bash
npm install
npm run dev
```

## API Reference

#### Listar todos os usuários

```http
  GET /users
```

#### Criar usuário

```http
  POST /users
```

- Request Body Schema:

```
{
  nome: deve ser uma string,
  idade: deve ser um número maior que 18,
  email: deve ser e-mail válido
}
```

#### Listar usuário

```http
  GET /user/${nome}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `nome`    | `string` | **Required**. Nome do usuário |

#### Editar usuário

```http
  PATCH /user/${nome}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `nome`    | `string` | **Required**. Nome do usuário |

- Request Body Schema:

```
{
  nome: Novo nome,
  idade: nova idade (deve ser um número maior que 18)
}
```

#### Excluir usuário

```http
  DELETE /user/${nome}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `nome`    | `string` | **Required**. Nome do usuário |

## Testes da aplicação

Para rodar os testes, deve rodar o comando abaixo:

```bash
  npm run test
```

Infelizmente o comando acima exclui e cria um novo banco de dados SQLite. O correto seria ter um banco de dados exclusivo para testes.

O código `    beforeEach(done => {
        setTimeout(done, 500)
    });`
Foi implementado pois estava tendo problemas com funções asyncronas do TypeORM para encontrar os Metadados da entidade User.

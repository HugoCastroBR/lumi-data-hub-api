# Lumi Data Hub (API)

## Visão Geral

Esta API permite o gerenciamento de Unidades Consumidoras (UCs), faturas e outras operações relacionadas à energia elétrica. Abaixo estão as principais rotas, seus métodos e a descrição de como utilizá-las.

## Estrutura

A estrutura da API é organizada em várias pastas que seguem os princípios da Programação Orientada a Objetos. Essa abordagem melhora a modularidade, a reutilização de código e a manutenção do sistema.

### 1. **utils**

- **Função**: Contém funções utilitárias que podem ser reutilizadas em diferentes partes da aplicação.
- **Responsabilidade**: Implementar funções auxiliares, como formatação de resposta, manipulação de strings, etc.

### 2. **middlewares**

- **Função**: Contém funções intermediárias que processam as requisições antes que elas cheguem aos controladores.
- **Responsabilidade**: Realizar tarefas como autenticação, validação de dados e manipulação de erros.

### 3. **services**

- **Função**: Contém a lógica de negócios e interações com a base de dados ou outras APIs externas.
- **Responsabilidade**: Encapsular a lógica que não deve estar nos controladores, facilitando testes e reutilização.

### 4. **controllers**

- **Função**: Contém a lógica de controle para as rotas da API.
- **Responsabilidade**: Receber requisições do cliente, processar os dados e retornar respostas, interagindo com os serviços para executar a lógica de negócios.

### 5. **routes**

- **Função**: Define as rotas da API e mapeia cada rota para um controlador específico.
- **Responsabilidade**: Organizar os endpoints, definindo os métodos HTTP (GET, POST, etc.) e vinculando-os às funções correspondentes no controlador.

### 6. **modules**

- **Função**: Agrupa funcionalidades relacionadas, encapsulando modelos, controladores e serviços de um determinado recurso.
- **Responsabilidade**: Facilitar a modularização da aplicação, especialmente em projetos grandes.

## Instalação

Para realizar a instalação utilize:

`npm install`

O banco de dados utilizados foi o postgres, configuração para o mesmo pode ser necessaria, importante alterar se for necessario o arquivo .env, os arquivos serão salvos em data/uploads e a rota porta em 8080 por padrão.

## Testes

Os testes foram desenvolvidos para garantir a funcionalidade das rotas da api, testando todas aquelas que são necessarias.

Também foram escritos testes para:

* Garantir o funcionamento dos services necessarios.
* Garantir a correta configuração da api
* Garantir o Parse correto dos PDFs
* Garantir a integridade dos PDFs salvos
* Garantir a inserção correta de dados no banco de dados
* Garantir o retorno correto das informações pela API

### Base URL

- `http://localhost:8080`

## Utilização e Endpoints

### Acessando o Swagger

A API disponibiliza uma documentação interativa através do Swagger, onde você pode testar todas as rotas diretamente da interface. Para acessar, use a seguinte URL:

* `http://localhost:8080/api`

### 1. **Saúde da API**

- **URL**: `/health`
- **Método**: `GET`
- **Descrição**: Verifica o status de saúde da aplicação.

### **2. UCS**

#### **Obter Unidades Consumidoras (UCs)**

* **URL** : `/ucs`
* **Método** : `GET`
* **Descrição** : Retorna uma lista paginada de Unidades Consumidoras (UCs) cadastradas.

##### Parâmetros de Query (opcionais):

* `page`: Número da página (inteiro).
* `orderby`: Ordenar por campo (string).
* `order`: Direção da ordenação (`asc` ou `desc`).
* `search`: Termo de busca por nome da UC.
* `year`: Ano específico para filtrar UCs.

#### **Obter Unidade Consumidora por ID**

* **URL** : `/ucs/{id}`
* **Método** : `GET`
* **Descrição** : Retorna os detalhes de uma Unidade Consumidora (UC) específica com base no seu ID.

##### Parâmetros de Path:

* `id`: (obrigatório) ID da Unidade Consumidora (UC).

#### Criar UC

* **URL** : `/ucs`
* **Método** : `POST`
* **Descrição** : Cria uma nova Unidade Consumidora.

##### Parâmetros no corpo da requisição (JSON):

* `clientId`: ID do cliente associado.
* `registerN`: Número de registro da UC.

### 3. **Criar Fatura (Upload de Arquivo PDF)**

* **URL** : `/bills`
* **Método** : `POST`
* **Descrição** : Cria uma nova fatura para uma Unidade Consumidora (UC) através do upload de um arquivo PDF.

#### Parâmetros (Multipart/Form-Data):

* `file`: (obrigatório) Arquivo PDF da fatura.

#### Listar Faturas

* **URL** : `/bills`
* **Método** : `GET`
* **Descrição** : Retorna uma lista de faturas.

***OBSERVAÇÃO: Nem todas as rotas estão documentadas aqui, porém é possivel visualizar todas as rotas da api e suas propriedades pelo swager.***

## Tecnologias utilizadas:

- **express**: Framework web para construir aplicações e APIs.
- **@prisma/client**: Cliente gerado pelo Prisma para interação com o banco de dados de forma tipada.
- **cors**: Middleware para habilitar o compartilhamento de recursos entre origens diferentes.
- **multer**: Middleware para upload de arquivos, facilitando o tratamento de `multipart/form-data`.
- **pdf-parse**: Biblioteca para extração de texto e dados de arquivos PDF.
- **swagger-jsdoc**: Gera documentação Swagger a partir de comentários JSDoc no código.
- **swagger-ui-express**: Middleware que expõe a documentação da API em uma interface gráfica.
- **jest**: Framework de testes para criar testes unitários e de integração.
- **supertest**: Biblioteca para testar APIs HTTP de maneira simples, permitindo a realização de requisições e validações de respostas.
- **nodemon**: Ferramenta que reinicia a aplicação automaticamente ao detectar mudanças nos arquivos.
- **ts-node-dev**: Executa arquivos TypeScript e reinicia a aplicação automaticamente ao detectar alterações.

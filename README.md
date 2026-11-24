# AquaVida Natação

Site de uma escola de natação fictícia, feito para a disciplina de
Fundamentos ao Desenvolvimento Web (Sistemas de Informação — UNOESC Chapecó).

Front-end em HTML + Bootstrap 5, back-end em PHP + MySQL (XAMPP).
O JavaScript (`js/app.js`) usa `fetch()` para enviar e buscar dados no PHP
sem recarregar a página.

## Como rodar

1. Instale o [XAMPP](https://www.apachefriends.org/) e, no painel, inicie **Apache** e **MySQL**.
2. Coloque o projeto em `C:\xampp\htdocs\aquavida`:
   ```
   cd C:\xampp\htdocs
   git clone https://github.com/emerson-gustavoo/fundamento-da-web.git aquavida
   ```
3. Abra o phpMyAdmin (http://localhost/phpmyadmin), vá na aba **Importar**,
   escolha o arquivo `banco/aquavida.sql` e clique em **Importar**.
   Isso cria o banco `aquavida`, as 3 tabelas e os 5 depoimentos iniciais.
4. Acesse **http://localhost/aquavida**

> Abra sempre pelo `http://localhost/...`. Se abrir o `.html` com dois cliques
> (`file://`), o PHP não roda e os formulários não funcionam.

## Estrutura

```
index.html, servico1.html, servico2.html, servico3.html   páginas do site
js/app.js                      funções JavaScript (fetch) usadas pelas páginas
backend/conexao.php            conexão com o MySQL (localhost, root, sem senha)
backend/salvar_orcamento.php   grava pedidos de orçamento (tabela orcamentos)
backend/salvar_contato.php     grava mensagens do "Fale Conosco" (tabela contatos)
backend/salvar_depoimento.php  grava novos depoimentos (tabela depoimentos)
backend/listar_depoimentos.php devolve os depoimentos em JSON
backend/editar_depoimento.php  altera um depoimento (UPDATE)
backend/excluir_depoimento.php apaga um depoimento (DELETE)
banco/aquavida.sql             script de criação do banco e das tabelas
img/                           imagens do site
```

Autor: Emerson Gustavo Pobran Rodrigues

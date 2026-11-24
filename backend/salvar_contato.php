<?php
// salvar_contato.php
// Recebe os dados do "Fale Conosco" (index.html), enviados pelo
// JavaScript, e grava na tabela contatos.

// Avisa que a resposta deste arquivo e JSON
header("Content-Type: application/json; charset=utf-8");

// Conecta no banco (cria a variavel $conexao)
require "conexao.php";

$nome     = $_POST["nome"];
$email    = $_POST["email"];
$mensagem = $_POST["mensagem"];

$sql = "INSERT INTO contatos (nome, email, mensagem)
        VALUES ('$nome', '$email', '$mensagem')";

if (mysqli_query($conexao, $sql)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}

<?php
header("Content-Type: application/json; charset=utf-8");

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

<?php
// salvar_depoimento.php
// Recebe o nome e o texto do formulario "Deixe seu depoimento"
// (index.html), enviados pelo JavaScript, e grava na tabela
// depoimentos.

// Avisa que a resposta deste arquivo e JSON
header("Content-Type: application/json; charset=utf-8");

// Conecta no banco (cria a variavel $conexao)
require "conexao.php";

$nome  = $_POST["nome"];
$texto = $_POST["texto"];

$sql = "INSERT INTO depoimentos (nome, texto)
        VALUES ('$nome', '$texto')";

if (mysqli_query($conexao, $sql)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}

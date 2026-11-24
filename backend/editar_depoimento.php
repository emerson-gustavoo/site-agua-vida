<?php
// editar_depoimento.php
// Recebe o id, o nome e o texto de um depoimento ja existente
// e atualiza (UPDATE) esse depoimento na tabela depoimentos.

// Avisa que a resposta deste arquivo e JSON
header("Content-Type: application/json; charset=utf-8");

// Conecta no banco (cria a variavel $conexao)
require "conexao.php";

$id    = $_POST["id"];
$nome  = $_POST["nome"];
$texto = $_POST["texto"];

$sql = "UPDATE depoimentos
        SET nome = '$nome', texto = '$texto'
        WHERE id = $id";

if (mysqli_query($conexao, $sql)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}

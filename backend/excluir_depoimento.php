<?php
// excluir_depoimento.php
// Recebe o id de um depoimento e apaga (DELETE) esse depoimento
// da tabela depoimentos.

// Avisa que a resposta deste arquivo e JSON
header("Content-Type: application/json; charset=utf-8");

// Conecta no banco (cria a variavel $conexao)
require "conexao.php";

$id = $_POST["id"];

$sql = "DELETE FROM depoimentos WHERE id = $id";

if (mysqli_query($conexao, $sql)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}

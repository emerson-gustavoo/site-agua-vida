<?php
header("Content-Type: application/json; charset=utf-8");

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

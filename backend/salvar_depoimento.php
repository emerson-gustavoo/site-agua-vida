<?php
header("Content-Type: application/json; charset=utf-8");

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

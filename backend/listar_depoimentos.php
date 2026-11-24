<?php
header("Content-Type: application/json; charset=utf-8");

require "conexao.php";

$sql = "SELECT id, nome, texto, DATE_FORMAT(data_envio, '%d/%m/%Y') AS data
        FROM depoimentos
        ORDER BY id DESC";

$resultado = mysqli_query($conexao, $sql);

$depoimentos = [];

while ($linha = mysqli_fetch_assoc($resultado)) {
    $depoimentos[] = $linha;
}

echo json_encode($depoimentos);

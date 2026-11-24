<?php
// listar_depoimentos.php
// Busca todos os depoimentos no banco e devolve em JSON para o
// JavaScript montar os cards na pagina inicial.

// Avisa que a resposta deste arquivo e JSON
header("Content-Type: application/json; charset=utf-8");

// Conecta no banco (cria a variavel $conexao)
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

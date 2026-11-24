<?php
header("Content-Type: application/json; charset=utf-8");

require "conexao.php";

$servico      = $_POST["servico"];
$nome         = $_POST["nome"];
$email        = $_POST["email"];
$telefone     = $_POST["telefone"];
$endereco     = $_POST["endereco"];
$cidade       = $_POST["cidade"];
$uf           = $_POST["uf"];
$dataDesejada = $_POST["data_desejada"];
$observacoes  = $_POST["observacoes"];

$sql = "INSERT INTO orcamentos
          (servico, nome, email, telefone, endereco, cidade, uf, data_desejada, observacoes)
        VALUES
          ('$servico', '$nome', '$email', '$telefone', '$endereco', '$cidade', '$uf',
           NULLIF('$dataDesejada', ''), '$observacoes')";

if (mysqli_query($conexao, $sql)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}

<?php
header("Content-Type: application/json; charset=utf-8");

require "conexao.php";

$id = $_POST["id"];

$sql = "DELETE FROM depoimentos WHERE id = $id";

if (mysqli_query($conexao, $sql)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}

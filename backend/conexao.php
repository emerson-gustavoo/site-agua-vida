<?php
// conexao.php
// Conecta no banco MySQL do XAMPP. Os outros arquivos PHP usam
// require "conexao.php"; e depois disso usam a variavel $conexao.

// Faz o mysqli devolver false quando der erro (em vez de parar o PHP),
// assim os outros arquivos conseguem tratar o erro com if/else
mysqli_report(MYSQLI_REPORT_OFF);

// Conecta: servidor, usuario, senha (vazia no XAMPP) e nome do banco
$conexao = mysqli_connect("localhost", "root", "", "aquavida");

// Usa utf8mb4 para os acentos (ç, ã, õ...) funcionarem
mysqli_set_charset($conexao, "utf8mb4");

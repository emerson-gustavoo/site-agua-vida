<?php
mysqli_report(MYSQLI_REPORT_OFF);

$conexao = mysqli_connect("localhost", "root", "", "aquavida");

mysqli_set_charset($conexao, "utf8mb4");

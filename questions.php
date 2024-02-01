<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Honk&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./CSS/style.css">
    <style>
        #ppal__container {
            display: none;
        }
    </style>
</head>
<body>
<?php 
    session_start();
    $difficulty = $_SESSION["difficulty"];
    if($_SERVER["REQUEST_METHOD"] === "POST"){

        if($_POST["categoryID"] == ""){
            $apiURL = "https://opentdb.com/api.php?amount=20&difficulty=$difficulty";
        } else {
            $categoryID = $_POST["categoryID"];
            $apiURL = "https://opentdb.com/api.php?amount=20&category=$categoryID&difficulty=$difficulty";
        }
        
    }
    ?>
    <span id="apiURL" style="display:none"><?php if(isset($apiURL) ) echo $apiURL?></span>
    <div id="start__container">
        <button id="start_btn">Start</button>
    </div>
    <div id="ppal__container">
        <h1 id="titulo">Pregunta <span id="contador">1</span></h1>
        <div id="pregunta__container"></div>
        <button id="next_btn">Next >></button>
        <p id="correction"></p>
    </div>
    <script src="./JS/app.js"></script>
</body>
</html>
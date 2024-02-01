<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home || Trivial</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Honk&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./CSS/style.css">
</head>
<body>
    <?php
        session_start();
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $difficulty = $_POST["difficulty"];
        }
        $_SESSION["difficulty"] = $difficulty;
        $apiURL = "https://opentdb.com/api_category.php";

        $curl = curl_init();
        curl_setopt($curl,CURLOPT_URL,$apiURL);
        curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
        $respuesta = curl_exec($curl);
    
        curl_close($curl);

        $array = json_decode($respuesta, true);
        $categories = $array["trivia_categories"]
    ?>
    <h1 class="title">Select a category</h1>
    <div class="container">
    <form action="questions.php" method="post">
        <input type="hidden" name="categoryID" value="">
        <input type="submit" value="Any category" class="container__category">
    </form>
    <?php foreach ($categories as $category) { ?>
        <form action="questions.php" method="post">
            <input type="hidden" name="categoryID" value="<?php echo $category["id"] ?>">
            <input type="submit" value="<?php echo $category["name"]?>" class="container__category">
        </form>
    <?php 
    }?>
    </div>
</body>
</html>
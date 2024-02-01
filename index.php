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
    <h1 class="title">Select the difficulty</h1>
    <div class="index__container">
    <form action="categories.php" method="post">
        <select name="difficulty" id="difficulty" class="difficulty__select">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <br><br>
        <input type="submit" value="Next >>" class="index__btn">
    </form>
    </div>
</body>
</html>
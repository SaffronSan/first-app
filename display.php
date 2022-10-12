<html>
<head>
    <title>PHP_Display</title>
</head>
<body>
    <?php 
        $conn = new mysqli("localhost", "root", "password","umk");
        if ($conn->connect_error) {die("Connection failed: " . $conn->connect_error);}
        $sql = "select * from localtable";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)) {
                echo $row['id'] . $row['name']  . $row['number'] . "<br>";
            }
        }
        mysqli_close($conn);
    ?>
</body>
</html>

https://katzus2.github.io/Mi.Web.UwU/


<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Bichito Bailando</title>

<style>

body{
    margin:0;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#0f0f1a;
    font-family:sans-serif;
}

/* Bichito */

.bicho{
    position:relative;
    width:60px;
    height:30px;
    background:#7df9ff;
    border-radius:20px;
    animation:baile 0.6s infinite alternate;
}

/* ojos */

.ojo{
    position:absolute;
    width:8px;
    height:12px;
    background:white;
    border-radius:50%;
    top:8px;
}

.ojo1{ left:15px;}
.ojo2{ right:15px;}

.pupila{
    width:4px;
    height:6px;
    background:black;
    border-radius:50%;
    margin:auto;
    margin-top:3px;
}

/* patas */

.pata{
    position:absolute;
    width:6px;
    height:12px;
    background:#7df9ff;
    bottom:-10px;
    border-radius:3px;
}

.p1{ left:8px;}
.p2{ left:20px;}
.p3{ right:20px;}
.p4{ right:8px;}

/* animacion baile */

@keyframes baile{
    0%{
        transform:rotate(-10deg) translateY(0px);
    }
    100%{
        transform:rotate(10deg) translateY(-6px);
    }
}

</style>
</head>

<body>

<div class="bicho">

<div class="ojo ojo1"><div class="pupila"></div></div>
<div class="ojo ojo2"><div class="pupila"></div></div>

<div class="pata p1"></div>
<div class="pata p2"></div>
<div class="pata p3"></div>
<div class="pata p4"></div>

</div>

</body>
</html>

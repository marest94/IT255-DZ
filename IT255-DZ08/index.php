<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IT255-DZ08</title>
    <link rel="stylesheet" href="resources/css/font-awesome.min.css">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">  
    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/slick-theme.css"/>
    <link rel="stylesheet" href="resources/css/ionicons.min.css">
  </head>

<body>
    <!--navigation bar -->

    <nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top ">
        <div class="container">
            <a href="index.html" class="navbar-brand">Met Hotels</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a href="index.html" class="nav-link">Početna</a>
                    </li>
                    <li class="nav-item">
                        <a href="about.html" class="nav-link">O nama</a>
                    </li>
                    <li class="nav-item">
                        <a href="services.html" class="nav-link">Sobe</a>
                    </li>
                    <li class="nav-item">
                        <a href="blog.html" class="nav-link">Galerija</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link">Kontakt</a>
                    </li>
                    <?php
                    if (!isset($_SESSION['username'])) {
                        echo '<li class="nav-item" data-toggle="modal" data-target="#login_modal">
                        <a class="nav-link">Uloguj se</a>
                    </li>';
                    }else{
                        echo '<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'.
                        $_SESSION['username'] .'
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <a class="dropdown-item" href="#">Moj profil</a>
                          <a class="dropdown-item" href="php/logout.php">Odjavi se</a>
                        </div>';
                    }
                    ?>
                    


                </ul>

            </div>
        </div>
    </nav>


    <!-- slider -->

    <section id="showcase">
        <div id="myCarousel" class="carousel slide carousel-fit" data-ride="carousel">
            <ol class="carousel-indicators carousel-indicators--round">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item carousel-image-1 active">
                    <div class="container">
                        <div class="carousel-caption d-none d-sm-block text-right mb-5">
                            <h1 class="display-3">Met Hotels</h1>
                            <p class="lead">Predstavlja jedan od najvećih lanaca hotela na svetu. U okviru naših hotela uvek ćete dobiti
                                najbolju uslugu.</p>
                            <a href="#" class="btn btn-outline-light">Saznaj više</a>
                        </div>
                    </div>
                </div>

                <div class="carousel-item carousel-image-2">
                    <div class="container">
                        <div class="carousel-caption d-none d-sm-block mb-5">
                            <h1 class="display-3">Resort</h1>
                            <p class="lead">Svi naši hoteli spadaju u grupu resorta, tako da u okviru nasših objekata imate sadržaje poput
                                bazena, privatnih plaža, barova, jet sky-a i mnogih drugih.</p>
                            <a href="#" class="btn btn-outline-light">Pogledaj galeriju</a>
                        </div>
                    </div>
                </div>

                <div class="carousel-item carousel-image-3">
                    <div class="container">
                        <div class="carousel-caption d-none d-sm-block text-right mb-5">
                            <h1 class="display-3">Sobe</h1>
                            <p class="lead">Sve sobe u okviru naših hotela poseduju mini bar, djakuzi, kao u uslugu 24/7.
                            </p>
                            <a href="#" class="btn btn-outline-light">Pogledaj</a>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#myCarousel" data-slide="prev" class="carousel-control-prev">
                <span class="carousel-control-prev-icon"></span>
            </a>

            <a href="#myCarousel" data-slide="next" class="carousel-control-next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
    </section>

    <!-- icons -->
    <section id="home-icons" class="py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4 text-center">
                    <i class="fa ion-ios-time"></i>
                    <p></p>
                    <h3>24/7</h3>
                    <p>Naše osoblje Vam je uvek na raspolaganju u bilo koje doba dana ili noći, rado će ispuniti sve Vaše želje.
                    </p>
                </div>
                <div class="col-md-4 mb-4 text-center">
                    <i class="fa ion-medkit"></i>
                    <p></p>
                    <h3>Ambulanta</h3>
                    <p>U sklopu svakog našeg resort kompleksa, nalazi se ambulanta, jer su nam gosti na 1. mestu.</p>
                </div>
                <div class="col-md-4 mb-4 text-center">
                    <i class="fa ion-social-bitcoin"></i>
                    <p></p>
                    <h3>Plaćanje kriptovalutama</h3>
                    <p>Ponosno kažemo da smo prvi lanac hotela na svetu koji pružaju uslugu plaćanja kriptovalutama.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- reservation-->
    <section id="home-heading" class="p-5">
        <div class="dark-overlay">
            <div class="row">
                <div class="col">
                    <div class="container pt-5">
                        <h1>Spremni da priušite sebi užitak kakav zaslužujete?</h1>
                        <p class="d-none d-md-block">Ne čekajte ni minut više, rezervišite svoju sobu u nekom od naših resort smeštaja. </p>
                        <a href="#" class="btn btn-outline-light">Rezerviši sobu</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- jamaica resort -->
    <section id="info" class="py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6 align-self-center">
                    <h3>Jamaica Resort</h3>
                    <p>Ove godine, našem lancu dodali smo još jedno eksluzivno letovalište.</p>
                    <p>Zavirite i otkrijte da li je ovo Vaša naredna destinacija.</p>
                </div>
                <div>
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/MZtKBK-rRIE"></iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- utisci -->
    <section id="testimonial-section" class="p-4 bg-dark text-white">
        <div class="container">
            <h2 class="text-center">Iskustva gostiju</h2>
            <div class="row">
                <div class="col">
                    <div class="slider">
                        <div>
                            <blockquote class="blockquote">
                                <p class="mb-0">Fantastično osoblje uvek na raspolaganju, pregršt sadržaja, bukvalno nemate potrebe da napuštate
                                    resort!
                                </p>
                                <footer class="blockquote-footer">Milena Mićić
                                    <cite title="">, Cuba resort</cite>
                                </footer>
                            </blockquote>
                        </div>
                        <div>
                            <blockquote class="blockquote">
                                <p class="mb-0">Sobe odlično opremljene, hrana takodje, jednostavno perfektno!</p>
                                <footer class="blockquote-footer">Nemanja Stević
                                    <cite title="Company 2">, Mexico Resort</cite>
                                </footer>
                            </blockquote>
                        </div>


                        <div>
                            <blockquote class="blockquote">
                                <p class="mb-0">Fisrt resorort where I can pay with cryptocurrencies, one word AWESOME!</p>
                                <footer class="blockquote-footer">Mitch Pallow
                                    <cite title="Company 3">, Florida Resort</cite>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>

    
    </section>

    <!-- footer -->

    <footer id="main-footer" class="bg-dark text-white">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-4 ml-auto">
                    <p class="lead">Copyright &copy; Marko Stojanovic 1983</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Registration Form -->
    <div class="modal fade" role="dialog" id="registration_modal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- HTML Form -->
                <form action="php/register.php" method="post" name="register" id="register" autocomplete="off">

                    <!-- Modal Body -->
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">Ime i prezime</label>
                            <input type="text" name="name" id="name" class="form-control" required pattern=".{5,100}" title="min 5 karaktera." autofocus>
                        </div>
                        <div class="form-group">
                            <label for="email">Email adresa</label>
                            <input type="email" name="email" id="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="username">Korisničko ime</label>
                            <input type="text" name="username" id="username" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Lozinka</label>
                            <input type="password" name="password" id="password" class="form-control" required pattern=".{6,12}" title="6 do 12 karaktera.">
                        </div>
                        <div id="display_error" class="alert alert-danger fade in"></div>
                        <!-- Display Error Container -->
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <input type="submit" name="register" class="btn btn-lg btn-success" value="Registruj se">
                        <button type="button" class="btn  btn-lg  btn-default" data-dismiss="modal">Otkaži</button>
                    </div>
                </form>

            </div>
        </div>
    </div>

    <!-- Login Form -->
    <div class="modal fade" role="dialog" id="login_modal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- HTML Form -->
                <form action="php/login.php" method="post" name="login" id="login" autocomplete="off">

                    <!-- Modal Body -->
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="username">Korisničko ime</label>
                                <input type="text" name="username" id="username" class="form-control" placeholder="Unesite svoje korisničko ime"required autofocus>
                            </div>
                            <div class="form-group">
                                <label for="password">Lozinka</label>
                                <input type="password" name="password" id="password" class="form-control" placeholder="Unesite svoju lozinku" required pattern=".{6,12}"
                                    title="6 to 12 characters.">
                            </div>
                            <div id="display_error" class="alert alert-danger fade in"></div>
                            <!-- Display Error Container -->
                            <button type="button" class="btn btn-lg btn-info btn-block" data-toggle="modal" data-target="#registration_modal" data-dismiss="modal">Registruj se</button>

                        </div>

                        <!-- Modal Footer -->
                        <div class="modal-footer">
                            <input type="submit" name="login" class="btn btn-lg btn-success" value="Uloguj se">
                            <button type="button" class="btn  btn-lg  btn-default" data-dismiss="modal" >Otkaži</button>
                        </div>
                </form>

                </div>
            </div>
        </div>

</body>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script src="resources/js/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script src="resources/js/main.js"></script>


</body>

</html>
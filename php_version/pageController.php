<?php
    /**
     *
     */
    class PageController
    {
        public $userMode = 0;
        public $renderMode = 0;

        function __construct()
        {
            if (isset($_GET["level"])){
                $this->userMode =$_GET["level"];
            }
            if (isset($_GET["mode"])){
                $this->renderMode =$_GET["mode"];
            }
        }

        function renderNav(){
            include 'pages/nav.php';
            if($this->userMode==0){
                echo "<li class='btn' data-toggle='modal' data-target='#LoginModal'><a>Login/Cadastre-se  <i class='fa fa-user'></i></a></li>";
            }
            else{
                echo "<li class='btn'><a href='profile.php'><i class='fa fa-user'></i> Alisson</a></li>";
                echo "<li class='btn'><a><i class='fa fa-bell-o' aria-hidden='true'></i></a></li>";
                if($this->userMode==2){
                    echo "<li class='btn' data-toggle='modal' data-target='#banModal'><a><i class='fa fa-ban'></i></a></li>";
                }
            }
            include 'pages/nav2.php';
        }

        function renderPage(){
            echo "<!DOCTYPE html><html lang='pt-BR'><head>";
                include 'pages/init.php';
            echo "</head><body>";
                $this->renderNav();
                echo "<div class='container'>";
                    include 'threadController.php';
                    if($this->renderMode==0){
                        $control->printAllPages();
                    }
                    else{
                        $control->printCatalog();
                    }
                echo "</div>";
                include 'pages/pageCounter.php';
                include 'pages/footer.php';
                include 'pages/newThreadModal.php';
                if($this->userMode==2){
                    include 'pages/banModal.php';
                }
                include 'pages/loginModal.php';
                include 'pages/scripts.php';
            echo "</body></html>";
        }
    }
    $page = new PageController();
?>

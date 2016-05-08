<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nyarlathotep Channel</title>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <!-- Meu CSS -->
        <link href="css/estilo.css" rel="stylesheet" type="text/css">

    </head>
    <body>
        
        <div class="container">
            <div class="page-header">
                <h1>Anime</h1>
            </div>
            <ul class="row">
            <?php
                $iterator =0;
                $jsonurl = "http://a.4cdn.org/a/catalog.json";
                $json = file_get_contents($jsonurl);
                $json_output = json_decode($json);

                foreach ($json_output as $page) {
                    foreach($page->threads as $thread) {
                        if (isset($thread->sub)) {
                            $sub = $thread->sub;
                            $no  = $thread->no;
                            //$com  = $thread->com;
                            $com  = "Tem que ver um jeito de arrumar esse problema com os texto...";
                            $ext  = $thread->ext;
                            $name  = $thread->name;
                            $tim  = $thread->tim;
                            
                            if($iterator%3==0){
                                echo "<li class='clearfix visible-xs-block'></li>";
                            }
                            if($iterator%4==0){
                                echo "<li class='clearfix visible-sm-block'></li>";
                            }
                            if($iterator%6==0){
                                echo "<li class='clearfix visible-lg-block  visible-md-block'></li>";
                            }
                            
                            $iterator++;
                            
                            echo "<li class='col-lg-2 col-md-2 col-sm-3 col-xs-4 col-xxs-12'><img class='img-responsive' src='http://i.4cdn.org/a/".$tim.$ext."'><div class='text'><h4>".$sub."</h4>".$com."</div></li>";
                            
                            //echo "<div class='col-xs-6 col-md-3'><div class='thumbnail'><img src='http://i.4cdn.org/a/".$tim.$ext."' height='100px'><div class='caption'><h3>".$sub."</h3><p>".$com."</p></div></div></div>";
                            
                        }
                    }
                }
            ?>
            </ul>
        </div>        
        
        
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    </body>
</html>
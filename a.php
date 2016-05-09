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
            <?php
            for($i=1; $i<3;$i++){
                $jsonurl = "http://a.4cdn.org/a/".$i.".json";
                $json = file_get_contents($jsonurl);
                $json_output = json_decode($json);

                foreach ($json_output->threads as $thread) {
                    foreach($thread->posts as $post) {
                        if (isset($post->bumplimit)) {
                            
                            if (isset($post->sub)){
                                $sub  = $post->sub;    
                            }
                            else{
                                $sub  = "";    
                            }
                            $no  = $post->no;
                            if (isset($post->com)){
                                $com  = $post->com;
                                
                            }
                            else{
                                $com  = "";    
                            }
                            $ext  = $post->ext;
                            $name  = $post->name;
                            $tim  = $post->tim;
                            
                            
                            
                            echo "<div class='panel panel-default' id='".$no."'><div class='panel-heading'><h3 class='panel-title'>".$sub."<small>".$no." by ".$name."</small></h3></div><div class='panel-body'>";
                            
                            if('.webm' === $ext){
                                echo "<video controls width='320' height='240' autoplay><source src='http://i.4cdn.org/a/".$tim.$ext."'type='video/webm' codecs='vp8, vorbis'></video>";

                            }
                            else{
                                echo "<img src='http://i.4cdn.org/a/".$tim.$ext."' class='img-responsive' width='150px'>";
                            }
                            
                            echo $com."</div><div class='panel-footer'>";
                            echo "<ul class='list-group'>";
                            /*
                            if (strpos($sub, 'DOTA') !== false) {
                                echo 'Found DOTA!!! Thread Number is: ' . $thread->no;
                            } 
                            */
                        }
                        else{
                            $hasImage=true;
                            $no  = $post->no;
                            if (isset($post->com)){
                                $com  = $post->com;
                                
                            }
                            else{
                                $com  = "";    
                            }
                            if (isset($post->ext)){
                               $ext  = $post->ext;
                            }
                            else{
                                $ext  = "";
                                $hasImage=false;
                            }
                            if (isset($post->tim)){
                               $tim  = $post->tim;   
                            }
                            else{
                                $tim  = "";
                                $hasImage=false;
                            }
                            $name  = $post->name;
                            
                            echo "<li class='list-group-item'>";
                            if($hasImage){
                                if('.webm' === $ext){
                                    echo "<video controls width='320' height='240' autoplay><source src='http://i.4cdn.org/a/".$tim.$ext."'type='video/webm' codecs='vp8, vorbis'></video>";
                                    
                                }
                                else{
                                    echo "<img src='http://i.4cdn.org/a/".$tim.$ext."' class='img-responsive' width='150px'>";
                                }
                                
                            }                            
                            echo $com."</li>";
                        }
                    }
                    echo "</ul></div></div>";
                }
            }
                
            ?>
        </div>        
        
        
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    </body>
</html>
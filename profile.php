<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nyarlathotep Channel</title>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <!-- Meu CSS -->
        <link href="css/estilo.css" rel="stylesheet" type="text/css">

    </head>
    <body>
         <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Nya Chan</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="btn" data-toggle="modal" data-target="#myModal"><a>New Thread  <i class="fa fa-reply"></i></a></li>
                        <li class="btn"><a><i class="fa fa-user"></i> Alisson</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>
        
        <div id="back-to-top-button">
            <a href="javascript:void(0);" title="Voltar ao início da página">
                <span class="glyphicon glyphicon-chevron-up"></span>
            </a>
        </div>
        
        
        <div class="row" id="profile-area">
            <div class="col-md-offset-5 col-md-2" >
                <img src="img/user.jpg" class="img-responsive img-rounded" id="profile-pic"/>
                <h2>Alisson Steffens</h2>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default" title="Alterar CSS"><i class="fa fa-code"></i></button>
                    <button type="button" class="btn btn-default" title="Alterar Imagens Perfil"><i class="fa fa-image"></i></button>
                    <button type="button" class="btn btn-default" title="Alterar Configurações de Perfil"><i class="fa fa-cogs"></i></button>
                    <button type="button" class="btn btn-default">Right</button>
                </div>
            </div>
        </div>
        
        <div class="container">
            
            
            <?php
                $board ="g";
                $page = 1;
                $fim =1;
                if (isset($_GET["board"])){
                    $board =$_GET["board"];
                }
                if (isset($_GET["page"])){
                    if("all" === $_GET["page"]){
                        $fim = 10;
                    }
                    else{
                        $page = $_GET["page"];
                        $fim = $page;
                    }
                }
                
                for($i=$page; $i<=$fim;$i++){
                    $jsonurl = "http://a.4cdn.org/".$board."/".$i.".json";
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
                                if (isset($post->trip)){
                                    $trip  = $post->trip;    
                                }
                                else{
                                    $trip = "";    
                                }
                                $ext  = $post->ext;
                                $name  = $post->name;
                                $tim  = $post->tim;



                                echo "<div class='panel panel-default' id='".$no."'>";
                                
                                echo "<div class='zero-clipboard'><span class='btn-clipboard'><div class='btn-group' role='group' aria-label='...'>";
                                
                                echo "<button type='button' class='btn btn-default' title='Visualizar'><a href='thread.php?board=".$board."&number=".$no."'><i class='fa fa-eye'></i></a></button>";
                                echo "<button type='button' class='btn btn-default' title='Marcar'><i class='fa fa-bookmark-o'></i></button>";
                                echo "<button type='button' class='btn btn-default' title='Atualizar'><i class='fa fa-refresh'></i></button>";
                                echo "<button type='button' class='btn btn-default' title='Responder'><i class='fa fa-reply'></i></button>";

                                echo "</div></span></div>";
                                echo "<div class='panel-heading'>";
                                
                                
                                
                                echo "<h3 class='panel-title'>".$sub." ~ <span> No.<a href='#".$no."'>".$no."</a> by ".$name." ".$trip."</span></h3>";
                                
                                echo "</div>";
                                
                                echo "<div class='panel-body'>";
                                
                                
                                if('.webm' === $ext){
                                    echo "<video controls width='450' height='240'><source src='http://i.4cdn.org/".$board."/".$tim.$ext."'type='video/webm' codecs='vp8, vorbis'></video>";

                                }
                                else{
                                    echo "<img src='http://i.4cdn.org/".$board."/".$tim.$ext."' class='img-responsive main-image image-md'>";
                                }

                                echo "<p>".$com."</p></div><div class='panel-footer'>";
                                echo "<ul class='list-group'>";
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
                                $name = $post->name;
                                
                                if(isset($post->capcode)){
                                    echo "<div class='panel'><div class='panel-footer'>";
                                    echo "<ul class='list-group'>";
                                }
                                
                                echo "<li class='list-group-item'>";
                                echo "<div class='zero-clipboard'><span class='com-btn-clipboard'>";

                                echo "No.<a href='#".$no."'>".$no."</a> by ".$name;

                                echo "</span></div>";
                                
                                if($hasImage){
                                    if('.webm' === $ext){
                                        echo "<video controls width='450' height='240'><source src='http://i.4cdn.org/".$board."/".$tim.$ext."'type='video/webm' codecs='vp8, vorbis'></video>";

                                    }
                                    else{
                                        echo "<img src='http://i.4cdn.org/".$board."/".$tim.$ext."' class='img-responsive com-image image-sm'>";
                                    }

                                }                            
                                echo "<p>".$com."</p></li>";
                            }
                        }
                        echo "</ul></div></div>";
                    }
                }
            ?>
        </div>
        
        
        
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">New Thread</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-2 control-label">Subject</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="Subject">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Comment</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" rows="3" placeholder="Comment"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-2 control-label">File</label>
                                <div class="col-sm-10">
                                    <div class="fileinput fileinput-new" data-provides="fileinput">
                                        <span class="btn btn-default btn-file"><span>Choose file</span><input type="file" multiple /></span>
                                        <span class="fileinput-filename"></span><span class="fileinput-new">No file chosen</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-nya">Post</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js"></script>
        <script>
            $("#back-to-top-button").click(function() {
                $('html,body').animate({scrollTop: $("body").offset().top},'slow');
            });
            $(document).on('change', '.btn-file :file', function() {
                var input = $(this),
                    numFiles = input.get(0).files ? input.get(0).files.length : 1,
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [numFiles, label]);
            });
            $(".main-image").click(function(){
                $(this).toggleClass( "image-md" );
            });
            $(".com-image").click(function(){
                $(this).toggleClass( "image-sm" );
            });
        </script>
    </body>
</html>
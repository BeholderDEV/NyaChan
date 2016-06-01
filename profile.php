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
                    <a class="navbar-brand" href="a.php">Nya Chan</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="btn" data-toggle="modal" data-target="#newThreadModal"><a>New Thread  <i class="fa fa-reply"></i></a></li>
                        <li class="btn"><a href="profile.php"><i class="fa fa-user"></i> Alisson</a></li>
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
                    <button type="button" class="btn btn-default btn-profile" title="Alterar CSS" data-toggle="modal" data-target="#CSSModal"><i class="fa fa-code"></i></button>
                    <button type="button" class="btn btn-default btn-profile" title="Alterar Imagens Perfil" data-toggle="modal" data-target="#ImageModal"><i class="fa fa-image"></i></button>
                    <button type="button" class="btn btn-default btn-profile" title="Alterar Configurações de Perfil" data-toggle="modal" data-target="#ConfigModal"><i class="fa fa-cogs"></i></button>
                </div>
            </div>
        </div>

        <div class="container">


            <?php
                include 'threadController.php';
                $control->printEspecificPage(1, "a");
            ?>
        </div>

        <div class="modal fade" id="newThreadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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

        <div class="modal fade" id="ImageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">CSS</h4>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">File</label>
                        <div class="col-sm-12">
                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                <span class="btn btn-default btn-file"><span>Choose Profile Image</span><input type="file" multiple /></span>
                                <span class="fileinput-filename"></span><span class="fileinput-new">No file chosen</span>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                <span class="btn btn-default btn-file"><span>Choose Background Image</span><input type="file" multiple /></span>
                                <span class="fileinput-filename"></span><span class="fileinput-new">No file chosen</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-nya">Save</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <div class="modal fade" id="CSSModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Perfil/Background</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <textarea class="form-control" rows="10" placeholder="CSS"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-nya">Save</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="ConfigModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-lg">
                <div class="modal-content col-sm-12">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Configuration</h4>
                    </div>
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">Change Login</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="New Login">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Change Password</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="Old Password"></textarea>
                                <input type="text" class="form-control" placeholder="New Password"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Change E-Mail</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="New E-Mail"></textarea>
                            </div>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-nya">Save</button>
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
            function restore_image(){
                $(this).parent().children(".nya-image").show();
                $(this).remove();

            }
            $(".nya-image").click(function(){
                var img = $(this).data('image');
                var full = '<img src="'+img+'" class="img-responsive nya-image-full" />';
                var tag = $(full);
                tag.on("click", restore_image);
                $(this).hide();
                $(this).parent().append(tag);

            });
        </script>
    </body>
</html>

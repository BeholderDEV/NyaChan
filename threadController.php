<?php
    // The code below creates the class
    class Threader {
        public $board ="a";
        public $page = 1;
        public $fim =1;


        public function __construct() {
            if (isset($_GET["board"])){
                $this->board =$_GET["board"];
            }
            if (isset($_GET["page"])){
                if("all" === $_GET["page"]){
                    $this->fim = 10;
                }
                else{
                    $this->page = $_GET["page"];
                    $this->fim = $this->page;
                }
            }
        }

        function printTags(){
            $jsonurl = "https://a.4cdn.org/boards.json";
            $json = file_get_contents($jsonurl);
            $json_output = json_decode($json);
            foreach($json_output->boards as $boarddata){
                $boardname = $boarddata -> board;
                $isWS =$boarddata -> ws_board;
                echo "<button type='button' class='btn btn-default btn-board ";
                if(!$isWS){
                    echo "btn-nsfw";
                }
                echo "'><a href='a.php?board=".$boardname."'>#".$boardname."</a></button>";
            }
        }

        function renderThreadPage(){
            $this->thread =$_GET["number"];
            $this->board =$_GET["board"];
            $jsonurl = "http://a.4cdn.org/".$this->board."/thread/".$this->thread.".json";
            $json = file_get_contents($jsonurl);
            $json_output = json_decode($json);
            $this->printThread($json_output);
        }

        function printPageHeader(){
            echo "<div class='page-header'><h1>Board /".$board."</h1></div>";
        }

        function printAllPages(){
            for($i=$this->page; $i<=$this->fim;$i++){
                $this->printPage($i);
            }
        }
        function printEspecificPage($index, $brd){
            $i = $index;
            $this->board = $brd;
            $jsonurl = "http://a.4cdn.org/".$this->board."/".$i.".json";
            $json = file_get_contents($jsonurl);
            $json_output = json_decode($json);

            foreach ($json_output->threads as $thread) {
                $this->printThread($thread);
            }
        }

        function printPage($index){
            $i = $index;
            $jsonurl = "http://a.4cdn.org/".$this->board."/".$i.".json";
            $json = file_get_contents($jsonurl);
            $json_output = json_decode($json);

            foreach ($json_output->threads as $thread) {
                $this->printThread($thread);
            }
        }

        function printThread($thread){
            foreach($thread->posts as $post) {
                $this->printPost($post);
            }
            echo "</ul></div></div>";
        }

        function printPost($post){
            if (isset($post->bumplimit)) {
                $this->printOP($post);
            }
            else{
                $this->printComPost($post);
            }
        }

        function printOP($post){
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
            $filename = $post->filename;
            $width = $post->w;
            $height = $post->h;
            $tumb_width = $post->tn_w;
            $tumb_height = $post->tn_h;

            echo "<div class='panel panel-default' id='".$no."'>";
            echo "<div class='zero-clipboard'><span class='btn-clipboard'><div class='btn-group' role='group' aria-label='...'>";
            echo "<button type='button' class='btn btn-default' title='Visualizar'><a href='threads.php?board=".$this->board."&number=".$no."'><i class='fa fa-eye'></i></a></button>";
            echo "<button type='button' class='btn btn-default' title='Marcar'><i class='fa fa-bookmark-o'></i></button>";
            echo "<button type='button' class='btn btn-default' title='Atualizar'><i class='fa fa-refresh'></i></button>";
            echo "<button type='button' class='btn btn-default' title='Responder'><i class='fa fa-reply'></i></button>";
            echo "</div></span></div>";
            echo "<div class='panel-heading'>";
            echo "<h3 class='panel-title'>".$sub." ~ <span> No.<a href='#".$no."'>".$no."</a> by ".$name." ".$trip."</span> <span class='label label-nya'>#".$this->board."</span></h3>";
            echo "</div>";
            echo "<div class='panel-body'>";
            echo "<a href='http://i.4cdn.org/".$this->board."/".$tim.$ext."' target='_blank'>".$filename.$ext."</a>";
            if('.webm' === $ext){
                echo "<br><video controls width='450' height='240'><source src='http://i.4cdn.org/".$this->board."/".$tim.$ext."'type='video/webm' codecs='vp8, vorbis'></video>";
            }
            else{
                echo "<div id='img-div'><img src='http://i.4cdn.org/".$this->board."/".$tim."s.jpg' data-image='http://i.4cdn.org/".$this->board."/".$tim.$ext."' data-width='".$width."px'   data-height='".$height."px' width='".$tumb_width."px'   height='".$tumb_height."px' class='img-responsive nya-image image-thumb-OP OP'></div>";
            }
            echo "<p>".$com."</p></div><div class='panel-footer'>";
            echo "<ul class='list-group'>";
        }

        function printComPost($post){
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
                $filename = $post->filename;
                $width = $post->w;
                $height = $post->h;
                $tumb_width = $post->tn_w;
                $tumb_height = $post->tn_h;
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
                echo "<a href='http://i.4cdn.org/".$this->board."/".$tim.$ext."' target='_blank'>".$filename.$ext."</a>";
                if('.webm' === $ext){
                    echo "<br><video controls width='450' height='240'><source src='http://i.4cdn.org/".$this->board."/".$tim.$ext."'type='video/webm' codecs='vp8, vorbis'></video>";
                }
                else{
                    echo "<div id='img-div'><img src='http://i.4cdn.org/".$this->board."/".$tim."s.jpg' data-image='http://i.4cdn.org/".$this->board."/".$tim.$ext."' data-width='".$width."px'   data-height='".$height."px' width='".$tumb_width."px'   height='".$tumb_height."px' class='img-responsive nya-image image-thumb'></div>";
                }
            }
            echo "<p>".$com."</p></li>";
        }
    }



    // Creating a new person called "boring 12345", who is 12345 years old ;-)
    $control = new Threader();

?>

<div class="container">
    <div class="btn-group" role="group">
        <?php
            echo "<button type='button' class='btn btn-default btn-page'><a href='a.php?page=all&board=".$control->board."'>All</a></button>";
            if($control->page>1){
             echo "<button type='button' class='btn btn-default btn-page'><a href='a.php?page=".($control->page-1)."&board=".$control->board."'><i class='fa fa-angle-left'></i></a></button>";
            }
            for($i=1; $i<=10;$i++){
                echo "<button type='button' class='btn btn-default btn-page'><a href='a.php?page=".$i."&board=".$control->board."'>".$i."</a></button>";
            }
            if($control->page<10){
                echo "<button type='button' class='btn btn-default btn-page'><a href='a.php?page=".($control->page+1)."&board=".$control->board."'><i class='fa fa-angle-right'></i></a></button>";
            }
            ?>
    </div>
</div>

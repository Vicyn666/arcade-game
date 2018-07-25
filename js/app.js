/*define enemy class*/
var Enemy = function (x, y, speed) {
        this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'; };

/*rendering enemies*/
                Enemy.prototype.render = function () {
                        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); };

/*enemies location reset and speed amend*/
                Enemy.prototype.update = function (dt) {
                        if ((this.x += this.speed * dt) > 505) {
                                this.reset(-100, this.y, (Math.random() * 180 + 10));
                        }
                        this.x += (this.speed * dt);
                };

                Enemy.prototype.reset = function (x, y, speed) {
                        this.x = x;
                        this.y = y;
                        this.speed = speed;
                };


/*define player class*/
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.dx = 100;
    this.dy = 80;
    this.score = 0;
    this.sprite = 'images/char-boy.png'; };


                Player.prototype.render = function () {
                        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); };

/*check victory and defeat, update scores and reset player*/
                Player.prototype.update = function () {
                var i, ex, ey;
        var px = player.x;
        var py = player.y;
                        if(this.y <68){
                                this.score++;
                                document.querySelector("#totalScores").innerHTML = this.score;
                                this.reset();
                        } else if(this.y >=68) {
                                        for (i = 0; i < allEnemies.length; i++) {
                                                ex = allEnemies[i].x;
                                                ey = allEnemies[i].y;
                                                        if (((px <= (ex + 75)) && (px >= (ex - 75))) && ((py <= (ey + 40)) && (py >= (ey - 40)))) {
                                                                this.score--;
                                                                document.querySelector("#totalScores").innerHTML = this.score;
                                                                boomsFunction();
                                                                this.reset();
                                                        }
                                        }
                        }
    };

/*player movements*/
                Player.prototype.handleInput = function(key) {
                          if (key === 'up' && this.y >= 68) {
                                  this.y -= 83;
                          } else if (key === 'down' && this.y <= 337) {
                                  this.y += 83;
                          } else if (key === 'left' && this.x > 0) {
                                  this.x -= 100;
                          } else if (key === 'right' && this.x < 400) {
                                  this.x += 100;
                          }
                  }
/*player reset*/
                Player.prototype.reset = function () {
                this.x = 200;
                this.y = 400;
                };

/*main functions*/
var app = function (global) {
    var allEnemies = [];
    var player;
    var enemyCount = Math.floor((Math.random() * 6) + 3);

        var instantiateEnemies = function () {
        for (var i = 0; i < enemyCount; i++) {
            allEnemies[i] = new Enemy(-100, (i%3 + 1) * 75, (Math.random() * 200 + 50));
        }
    };

    var instantiatePlayer = function () {
        player = new Player(200, 400);
    };

        instantiateEnemies();
        instantiatePlayer();
        global.allEnemies = allEnemies;
        global.player = player;

        document.addEventListener('keyup', function (e) {
                var allowedKeys = {
                        37: 'left',
                        38: 'up',
                        39: 'right',
                        40: 'down'
        };
                player.handleInput(allowedKeys[e.keyCode]);
    });

}(this);

/*reset game*/
function restartGame() {
        window.location.href = window.location.href;
}

/*game timer*/
function startTimer () {
  let sec = 0;
   function clock (interval) {
     return interval > 9 ? interval : "0" + interval;
   }
     setInterval(function(){
     document.getElementById("sec").innerHTML=clock(++sec%60);
     document.getElementById("min").innerHTML=clock(parseInt(sec/60,10));
   }, 1000);
}
/*collision message*/
function boomsFunction () {
           const results = document.getElementById("booms");
       results.style.visibility = "visible";
                 setTimeout(function() {
                                 results.style.visibility = "hidden";
                 }, 1000)
}

startTimer ();

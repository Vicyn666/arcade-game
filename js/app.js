var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    if ((this.x += this.speed * dt) > 505) {
        this.reset(-100, this.y, (Math.random() * 180 + 10));
    }
    this.x += (this.speed * dt);
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.dx = 100;
    this.dy = 80;
    this.score = 0;
    this.playerWon = false;
    this.playerMove = false;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {
      if(this.y <0){
        this.score++;
        console.log(this.score);
        this.reset();
      }

    if (this.playerWon) {
        this.reset(200, 400);
    }
};


Player.prototype.handleInput = function(key) {
      console.log("X:",this.x,"Y:",this.y);
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

Player.prototype.checkPlayerCollisions = function() {
      if(this.y < 168) {
          this.reset();
      }
      for (var counter in allEnemies) {
      if(allEnemies[counter].x + 70 > this.x + 10 && allEnemies[counter].x < this.x + 85 && allEnemies[counter].y + 5 >= this.y) {
          this.reset();
      }
    }
  };

Player.prototype.reset = function () {
this.x = 200;
this.y = 400;
};


var app = function (global) {
    var allEnemies = [];
    var player;
    var enemyCount = Math.floor((Math.random() * 6) + 3);

    var instantiateEnemies = function () {
        for (var i = 1; i <= enemyCount; i++) {
            allEnemies[i] = new Enemy(-100, (i%3 + 1) * 75, (Math.random() * 200 + 50));
        }
    };

    var instantiatePlayer = function () {
        player = new Player(200, 400);
    };

    var instantiateObjects = function () {
        instantiateEnemies();
        instantiatePlayer();
    };

    var reset = function () {
        instantiatePlayer();
        //player.reset(200, 400);
        instantiateEnemies();
        /*for (var i = 1; i <= enemyCount; i++) {
            allEnemies[i].reset(-100, (i%3 + 1) * 75, Math.random() * 300);
        }
        */
    };

    var checkCollisions = function () {
        var i, ex, ey;
        var px = player.x;
        var py = player.y;

        for (i = 1; i <= enemyCount; i++) {
            ex = allEnemies[i].x;
            ey = allEnemies[i].y;
            if (((px <= (ex + 75)) && (px >= (ex - 75))) && ((py <= (ey + 20)) && (py >= (ey - 20)))) {
                reset();
                console.log("CheckCollision called!");
            }
        }
    };

    instantiateObjects();

    global.allEnemies = allEnemies;
    global.player = player;
    global.checkCollisions = checkCollisions;

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

/*ссссссссссссссссссссссссссссссс*/
function restartGame(){
  window.location.href = window.location.href;
}



function startTimer () {
  let sec = 0;
   function pad ( val ) {
     return val > 9 ? val : "0" + val;
   }
     setInterval(function(){
     document.getElementById("sec").innerHTML=pad(++sec%60);
     document.getElementById("min").innerHTML=pad(parseInt(sec/60,10));
   }, 1000);
}

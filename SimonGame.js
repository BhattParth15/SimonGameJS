<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            text-align: center;
        }

        .btn {
            height: 150px;
            width: 150px;
            border-radius: 20px;
            border: 2px solid black;
            margin: 10px;
        }

        .container {
            display: flex;
            justify-content: center;

        }

        .yellow {
            background-color: #f99b45;
        }

        .red {
            background-color: #d95980;
        }

        .green {
            background-color: #63aac0;
        }

        .purple {
            background-color: rgb(137, 40, 126);
        }

        .flash {
            background-color: white;
        }

        .userflash {
            background-color: green;
        }
    </style>
</head>

<body>
    <h1>Simon Says Game</h1>
    <h2>Press any key to start the game</h2>
    <div class="container">
        <div class="line1">
            <div class="btn red" id="red">1</div>
            <div class="btn yellow " id="yellow">2</div>
        </div>
        <div class="line2">
            <div class="btn green" id="green">3</div>
            <div class="btn purple" id="purple">4</div>
        </div>
    </div>

    <script>
        let gameSeq = [];
        let userSeq = [];

        let started = false;
        let level = 0;

        let btns = ["yellow", "red", "purple", "green"];

        let h2 = document.querySelector("h2");

        document.addEventListener("keypress", function () {
            if (started == false) {
                console.log("game is started");
                started = true;

                levelUp();
            }
        });

        function gameFlash(btn) {
            btn.classList.add("flash");
            setTimeout(function () {
                btn.classList.remove("flash");
            }, 150);
        }
        function userFlash(btn) {
            btn.classList.add("userflash");
            setTimeout(function () {
                btn.classList.remove("userflash");
            }, 150);
        }
        function levelUp() {
            userSeq = [];
            level++;
            h2.innerText = `Level ${level}`;
            let randIdx = Math.floor(Math.random() * 3);
            let randColor = btns[randIdx];
            let randBtn = document.querySelector(`.${randColor}`);
            gameSeq.push(randColor);
            console.log(gameSeq);
            gameFlash(randBtn);
        }
        function checkAns(idx) {
            if (userSeq[idx] == gameSeq[idx]) {
                if (userSeq.length == gameSeq.length) {
                    setTimeout(levelUp, 1000);
                }
            }
            else {
                h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
                document.querySelector("body").style.backgroundColor = "red";
                setTimeout(function () {
                    document.querySelector("body").style.backgroundColor = "white";
                }, 150);
                reset();
            }
        }
        
        function btnPress() {
            let btn = this;
            userFlash(btn);

            userColor = btn.getAttribute("id");
            userSeq.push(userColor);
            checkAns(userSeq.length - 1);
        }
        let allBtns = document.querySelectorAll(".btn");
        for (btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }
        function reset() {
            started = false;
            gameSeq = [];
            userSeq = [];
            level = 0;
        }
    </script>
</body>

</html>

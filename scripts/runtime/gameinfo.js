const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let atlas = new Image()
atlas.src = 'images/Common.png';

export default class GameInfo {
    renderGameScore(ctx, score, passScore) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";

        ctx.fillText(
            score + "/" + passScore,
            10,
            30
        )
    }

    renderGameLevel(ctx, text) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";

        ctx.fillText(
            text,
            screenWidth / 2 - 30,
            30
        )
    }

    renderFilter(ctx, text) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";

        ctx.fillText(
            text,
            10,
            60
        )
    }

    renderPanel(ctx, score, title, btnText, btn2Text = "") {
        ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300);

        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";

        ctx.fillText(
            title,
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 50
        );

        ctx.fillText(
            '得分: ' + score,
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 130
        );

        let btn1Y = 180;
        if (btn2Text.length > 0) {
            btn1Y = 150
        }

        ctx.drawImage(
            atlas,
            120, 6, 39, 24,
            screenWidth / 2 - 60,
            screenHeight / 2 - 100 + btn1Y,
            120, 40
        );

        ctx.fillText(
            btnText,
            screenWidth / 2 - btnText.length * 10,
            screenHeight / 2 - 100 + btn1Y + 25
        );

        if (btn2Text.length > 0) {
            let btn2Y = 200;

            ctx.drawImage(
                atlas,
                120, 6, 39, 24,
                screenWidth / 2 - 60,
                screenHeight / 2 - 100 + btn2Y,
                120, 40
            );

            ctx.fillText(
                btn2Text,
                screenWidth / 2 - btn2Text.length * 10,
                screenHeight / 2 - 100 + btn2Y + 25
            );

            this.btn2Area = {
                startX: screenWidth / 2 - 40,
                startY: screenHeight / 2 - 100 + btn2Y,
                endX: screenWidth / 2 + 50,
                endY: screenHeight / 2 - 100 + btn2Y + 40
            }
        }


        /**
         * 重新开始按钮区域
         * 方便简易判断按钮点击
         */
        this.btnArea = {
            startX: screenWidth / 2 - 40,
            startY: screenHeight / 2 - 100 + btn1Y,
            endX: screenWidth / 2 + 50,
            endY: screenHeight / 2 - 100 + btn1Y + 40
        }
    }
}


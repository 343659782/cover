import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import TopBread from "./npc/TopBread";
import BotBread from "./player/BotBread";
import Binggan from "./npc/Binggan";
import Orange from "./npc/Orange";
import Cake from "./npc/Cake";

let ctx = canvas.getContext('2d');
let databus = new DataBus();

const DEBUG = false;

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0

        this.restart()
    }

    restart() {
        databus.reset();

        canvas.removeEventListener(
            'touchstart',
            this.touchHandler
        );

        this.bg = new BackGround(ctx);
        // this.player = new Player(ctx);
        this.player = new BotBread(ctx);
        this.gameinfo = new GameInfo();
        this.music = new Music();

        this.bindLoop = this.loop.bind(this);
        this.hasEventBind = false;

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId);

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    topBreadGenerate() {
        if (databus.frame % 100 === 0) {
            this.music.playShoot();
            let topBread = databus.pool.getItemByClass('topBread', TopBread);
            topBread.init(6);
            databus.topBreads.push(topBread)
        }
    }

    binggansGenerate() {
        if (databus.frame % 150 === 0) {
            let binggan = databus.pool.getItemByClass('binggan', Binggan);
            binggan.init();
            databus.foods.push(binggan);
        }
    }

    orangeGenerate() {
        if (databus.frame % 170 === 0) {
            let orange = databus.pool.getItemByClass('orange', Orange);
            orange.init();
            databus.foods.push(orange);
        }
    }

    cakeGenerate() {
        if (databus.frame % 170 === 0) {
            let cake = databus.pool.getItemByClass('cake', Cake);
            cake.init();
            databus.foods.push(cake);
        }
    }

    // 全局碰撞检测
    collisionDetection() {

        for (let i = 0, il = databus.topBreads.length; i < il; i++) {
            let topBread = databus.topBreads[i];
            if (this.player.isCollideWithFood(topBread)) {
                if (!DEBUG) {
                    databus.gameOver = true;
                }
                break;
            }
        }

        for (let i = 0, il = databus.foods.length; i < il; i++) {
            let food = databus.foods[i];

            if (this.player.isCollideWithFood(food)) {
                this.addFood(food);
                break
            }
        }
    }

    addFood(food) {
        this.music.playExplosion();
        this.player.addFood(food);
        databus.gainFoodCount = this.player.foods.length;
        if (food.score) {
            databus.score += food.score;
        }
    }

    // 游戏结束后的触摸事件处理逻辑
    touchEventHandler(e) {
        e.preventDefault();

        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;

        let area = this.gameinfo.btnArea;

        if (x >= area.startX
            && x <= area.endX
            && y >= area.startY
            && y <= area.endY)
            this.restart()
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.bg.render(ctx)

        this.player.drawToCanvas(ctx);

        databus.topBreads
            .concat(databus.foods)
            .forEach((item) => {
                item.drawToCanvas(ctx)
            })


        databus.animations.forEach((ani) => {
            if (ani.isPlaying) {
                ani.aniRender(ctx)
            }
        })

        this.gameinfo.renderGameScore(ctx, databus.score);

        // 游戏结束停止帧循环
        if (databus.gameOver) {
            this.gameinfo.renderGameOver(ctx, databus.score);

            if (!this.hasEventBind) {
                this.hasEventBind = true;
                this.touchHandler = this.touchEventHandler.bind(this);
                canvas.addEventListener('touchstart', this.touchHandler)
            }
        }
    }

    // 游戏逻辑更新主函数
    update(dt) {
        if (databus.gameOver)
            return;

        this.bg.update();
        this.player.update(dt);

        databus.topBreads
            .concat(databus.foods)
            .forEach((item) => {
                item.update()
            })

        this.topBreadGenerate();
        this.binggansGenerate();
        this.orangeGenerate();
        this.cakeGenerate();


        this.collisionDetection();
    }

    // 实现游戏帧循环
    loop(timer) {
        let dt = 0;
        if (this.lastTimer) {
            dt = timer - this.lastTimer;
        } else {
            dt = timer;
        }
        dt *= 0.001;
        this.lastTimer = timer;
        // console.log(dt);
        databus.frame++;

        this.update(dt);
        this.render();

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }
}

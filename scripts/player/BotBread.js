import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// 玩家相关常量设置
const BOT_BREAD_IMG_SRC = 'images/bot_bread.png';
const BOT_BREAD_WIDTH = 80;
const BOT_BREAD_HEIGHT = 20;

let databus = new DataBus();

export default class BotBread extends Sprite {
    constructor() {
        super(BOT_BREAD_IMG_SRC, BOT_BREAD_WIDTH, BOT_BREAD_HEIGHT);

        // 玩家默认处于屏幕底部居中位置
        this.x = screenWidth / 2 - this.width / 2;
        this.y = screenHeight - this.height - 100;
        this.sinkingY = this.y;

        // 用于在手指移动的时候标识手指是否已经在飞机上了
        this.touched = false;

        this.foods = [];

        this.collideWidth = BOT_BREAD_WIDTH;
        this.topY = BOT_BREAD_HEIGHT;

        // 初始化事件监听
        this.initEvent();

    }

    reset() {
        this.foods = [];
    }

    /**
     * 当手指触摸屏幕的时候
     * 判断手指是否在飞机上
     * @param {Number} x: 手指的X轴坐标
     * @param {Number} y: 手指的Y轴坐标
     * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
     */
    checkIsFingerOnAir(x, y) {
        const deviation = 30;

        return !!(x >= this.x - deviation
            // && y >= this.y - deviation
            && x <= this.x + this.width + deviation
            // && y <= this.y + this.height + deviation
        )
    }

    /**
     * 根据手指的位置设置飞机的位置
     * 保证手指处于飞机中间
     * 同时限定飞机的活动范围限制在屏幕中
     */
    setAirPosAcrossFingerPosZ(x, y) {
        let disX = x - this.width / 2;
        let disY = y - this.height / 2;

        if (disX < 0)
            disX = 0;

        else if (disX > screenWidth - this.width)
            disX = screenWidth - this.width;

        if (disY <= 0)
            disY = 0;

        else if (disY > screenHeight - this.height)
            disY = screenHeight - this.height;

        this.x = disX;
        // this.y = disY;
    }

    /**
     * 玩家响应手指的触摸事件
     * 改变战机的位置
     */
    initEvent() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault();

            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;

            if (this.checkIsFingerOnAir(x, y)) {
                this.touched = true;

                this.setAirPosAcrossFingerPosZ(x, y)
            }

        }).bind(this));

        canvas.addEventListener('touchmove', ((e) => {
            if (databus.gameOver) {
                return;
            }
            e.preventDefault();

            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;

            if (this.touched)
                this.setAirPosAcrossFingerPosZ(x, y);

        }).bind(this));

        canvas.addEventListener('touchend', ((e) => {
            e.preventDefault();

            this.touched = false
        }).bind(this))
    }

    update(dt) {
        let size = this.foods.length;
        for (let i = 0; i < size; i++) {
            let food = this.foods[i];
            // food.x = this.x + this.width * 0.5 - food.width * 0.5;
            food.coverIndex = i + 1;
            food.targetX = this.x + this.width * 0.5;
            food.y = this.y - food.offsetY;
            food.updatePosX(dt);
        }

        if (size > 0) {
            let topFood = this.foods[size - 1];
            if (topFood.y < screenHeight * 0.7) {
                this.sinkingY = screenHeight * 0.7 + this.topY;
            }
        }

        this.sinkUpdate();
    }

    isCollideWithFood(sp) {
        if (sp.gain) {
            return;
        }
        if (this.foods.length > 0) {
            return this.foods[this.foods.length - 1].isCollideWith(sp);
        } else {
            return this.isCollideWith(sp);
        }
    }

    addFood(food) {
        if (food.gain) {
            return;
        }
        food.gain = true;
        if (this.foods.length > 0) {
            food.offsetY = this.foods[this.foods.length - 1].offsetY + food.height * 0.5;
        } else {
            food.offsetY = this.height * 0.5;
        }
        this.foods.push(food);

        this.topY = food.offsetY - food.height * 0.5;
    }

    sinkUpdate() {
        if (this.y < this.sinkingY - 30) {
            this.y += 2;
        }
    }
}

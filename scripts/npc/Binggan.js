import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";

const PIZZA_IMG_PREFIX = 'images/binggan';
const PIZZA_FRAME_COUNT = 6;
const BINGGAN_IMG_SRC = PIZZA_IMG_PREFIX + '6.png';
const BINGGAN_WIDTH = 60;
const BINGGAN_HEIGHT = 25;

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
let tools = new Tools();

export default class Binggan extends BaseFood {
    constructor() {
        super(BINGGAN_IMG_SRC, BINGGAN_WIDTH, BINGGAN_HEIGHT);

        this.initExplosionAnimation();
        this.interval = 1000 / 6;
        this.playAnimation(0, false);
        this.playing = false;
        this.timer = 0;
        this.animTime = 1;
        this.poolKey = "binggan";
        this.score = 400;
        this.speed = 5;
    }

    init() {
        this.x = tools.rnd(0, window.innerWidth - BINGGAN_WIDTH);
        this.y = -this.height;

        this[__.speed] = this.speed;
        this.visible = true
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = []

        for (let i = 0; i < PIZZA_FRAME_COUNT; i++) {
            frames.push(PIZZA_IMG_PREFIX + (i + 1) + '.png')
        }

        this.initFrames(frames)
    }

    // 每一帧更新子弹位置
    update(dt) {
        if (this.gain) {
            return;
        }

        this.y += this[__.speed];

        // 对象回收
        if (this.y > window.innerHeight + this.height)
            databus.removeFood(this)
    }
}

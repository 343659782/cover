import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";

const CAKE_IMG_PREFIX = 'images/dangao';
const CAKE_FRAME_COUNT = 6;
const CAKE_IMG_SRC = CAKE_IMG_PREFIX + '6.png';
const CAKE_WIDTH = 64;
const CAKE_HEIGHT = 40;

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
let tools = new Tools();

export default class Cake extends BaseFood {
    constructor() {
        super(CAKE_IMG_SRC, CAKE_WIDTH, CAKE_HEIGHT);

        this.initExplosionAnimation();
        this.playAnimation(0, false);
        this.playing = false;
        this.timer = 0;
        this.animTime = 1;
        this.poolKey = "cake";
        this.score = 20;
        this.speed = 4;
    }

    init() {
        this.x = tools.rnd(0, window.innerWidth - CAKE_WIDTH);
        this.y = -this.height;

        this[__.speed] = this.speed;
        this.visible = true
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = []

        for (let i = 0; i < CAKE_FRAME_COUNT; i++) {
            frames.push(CAKE_IMG_PREFIX + (i + 1) + '.png')
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

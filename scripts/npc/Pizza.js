import Animation from '../base/animation'
import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";

const PIZZA_IMG_SRC = 'images/pizza_11.png';
const PIZZA_WIDTH = 70;
const PIZZA_HEIGHT = 30;

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
let tools = new Tools();

export default class Pizza extends BaseFood {
    constructor() {
        super(PIZZA_IMG_SRC, PIZZA_WIDTH, PIZZA_HEIGHT);

        this.initExplosionAnimation();
        this.interval = 1000 / 6;
        this.playAnimation(0, false);
        this.playing = false;
        this.timer = 0;
        this.animTime = 1;

    }

    init(speed) {
        this.x = tools.rnd(0, window.innerWidth - PIZZA_WIDTH);
        this.y = -this.height;

        this[__.speed] = speed;

        this.visible = true
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = []

        const PIZZA_IMG_PREFIX = 'images/pizza_';
        const PIZZA_FRAME_COUNT = 11;

        for (let i = 0; i < PIZZA_FRAME_COUNT; i++) {
            frames.push(PIZZA_IMG_PREFIX + (i + 1) + '.png')
        }

        this.initFrames(frames)
    }

    // 每一帧更新子弹位置
    update(dt) {
        // if (this.playing) {
        //     this.timer += dt;
        //     if (this.timer >= this.animTime) {
        //         this.stop();
        //         this.visible = true
        //     }
        // }
        if (this.gain) {
            return;
        }

        this.y += this[__.speed];

        // 对象回收
        if (this.y > window.innerHeight + this.height)
            databus.removePizza(this)
    }
}

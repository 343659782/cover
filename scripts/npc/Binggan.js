import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";
import ConfigData from "../../ConfigData";

const BINGGAN_IMG_PREFIX = 'images/binggan';
const BINGGAN_FRAME_COUNT = 6;
const BINGGAN_IMG_SRC = BINGGAN_IMG_PREFIX + '6.png';
const BINGGAN_WIDTH = ConfigData.binggan_width === 0 ? 60 : ConfigData.binggan_width;
const BINGGAN_HEIGHT = ConfigData.binggan_height === 0 ? 25 : ConfigData.binggan_height;

const __ = {
    speed: Symbol('speed')
};

let databus = new DataBus();
let tools = new Tools();

export default class Binggan extends BaseFood {
    constructor() {
        super(BINGGAN_IMG_SRC, BINGGAN_WIDTH, BINGGAN_HEIGHT);

        this.initExplosionAnimation();
        this.playAnimation(0, false);
        this.playing = false;
        this.timer = 0;
        this.animTime = 1;
        this.poolKey = ConfigData.binggan_key;
        this.score = ConfigData.binggan_score === 0 ? 40 : ConfigData.binggan_score;
        this.speed = ConfigData.binggan_fall_speed === 0 ? 5 : ConfigData.binggan_fall_speed;
    }

    init() {
        this.x = tools.rnd(0, window.innerWidth - BINGGAN_WIDTH);
        this.y = -this.height;

        this[__.speed] = this.speed;
        this.visible = true
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = [];

        for (let i = 0; i < BINGGAN_FRAME_COUNT; i++) {
            frames.push(BINGGAN_IMG_PREFIX + (i + 1) + '.png');
        }

        this.initFrames(frames);
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

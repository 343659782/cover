import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";
import ConfigData from "../../ConfigData";

const BINGGAN_IMG_PREFIX = 'images/binggan';
const BINGGAN_FRAME_COUNT = 6;
const BINGGAN_IMG_SRC = BINGGAN_IMG_PREFIX + '6.png';
const BINGGAN_WIDTH = ConfigData.Foods[ConfigData.binggan_key]["width"] === 0 ? 60 : ConfigData.Foods[ConfigData.binggan_key]["width"];
const BINGGAN_HEIGHT = ConfigData.Foods[ConfigData.binggan_key]["height"] === 0 ? 25 : ConfigData.Foods[ConfigData.binggan_key]["height"];

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
        this.score = ConfigData.Foods[this.poolKey]["score"] === 0 ? 50 : ConfigData.Foods[this.poolKey]["score"];
        this.speed = ConfigData.Foods[this.poolKey]["fall_speed"] === 0 ? 5 : ConfigData.Foods[this.poolKey]["fall_speed"];
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

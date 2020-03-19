import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";
import ConfigData from "../../ConfigData";

const ORANGE_IMG_PREFIX = 'images/chengzi';
const ORANGE_FRAME_COUNT = ConfigData.Foods[ConfigData.orange_key]["image_count"] === 0 ? 6 : ConfigData.Foods[ConfigData.orange_key]["image_count"];
const ORANGE_IMG_SRC = ORANGE_IMG_PREFIX + ORANGE_FRAME_COUNT + '.png';
const ORANGE_WIDTH = ConfigData.Foods[ConfigData.orange_key]["width"] === 0 ? 60 : ConfigData.Foods[ConfigData.orange_key]["width"];
const ORANGE_HEIGHT = ConfigData.Foods[ConfigData.orange_key]["height"] === 0 ? 25 : ConfigData.Foods[ConfigData.orange_key]["height"];

const __ = {
    speed: Symbol('speed')
};

let databus = new DataBus();
let tools = new Tools();

export default class Orange extends BaseFood {
    constructor() {
        super(ORANGE_IMG_SRC, ORANGE_WIDTH, ORANGE_HEIGHT);

        this.initExplosionAnimation();

        this.playing = false;
        this.timer = 0;
        this.animTime = 1;
        this.poolKey = ConfigData.orange_key;
        this.score = ConfigData.Foods[this.poolKey]["score"] === 0 ? 50 : ConfigData.Foods[this.poolKey]["score"];
        this.speed = ConfigData.Foods[this.poolKey]["fall_speed"] === 0 ? 5 : ConfigData.Foods[this.poolKey]["fall_speed"];
        this.interval = 1000 / (ConfigData.Foods[this.poolKey]["anim_speed"] === 0 ? 5 : ConfigData.Foods[this.poolKey]["anim_speed"]);

        let a = 1;
    }

    init() {
        this.x = tools.rnd(0, window.innerWidth - ORANGE_WIDTH);
        this.y = -this.height;

        this[__.speed] = this.speed;

        this.playAnimation(0, false);
        this.visible = true;
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = []

        for (let i = 0; i < ORANGE_FRAME_COUNT; i++) {
            frames.push(ORANGE_IMG_PREFIX + (i + 1) + '.png')
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

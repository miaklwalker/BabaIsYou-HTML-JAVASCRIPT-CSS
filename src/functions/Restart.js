import {
    operatorBlocks,
    nounBlocks,
    verbBlocks,
    spriteBlocks,
} from "../blocks/BlocksCache.js";
import { GameInfo } from "../GameFiles/Levels.js";
import { controls } from "./Controls.js";

export function Restart(lvlChange = false) {
    if (controls.KeyR || lvlChange) {
        while (nounBlocks.length) {
            nounBlocks.pop();
        }
        while (verbBlocks.length) {
            verbBlocks.pop();
        }
        while (operatorBlocks.length) {
            operatorBlocks.pop();
        }
        while (spriteBlocks.length) {
            spriteBlocks.pop();
        }
        GameInfo.drawn.level = false;
        console.log("Game Redrawn");
    }
}

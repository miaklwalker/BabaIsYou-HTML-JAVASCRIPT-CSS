import { Vector } from '../Math/Vector.js';
import { uniqueid } from '../functions/CreateId.js';
import { spriteBlocks } from './BlocksCache.js';
import { win } from '../functions/win.js';

export default class Block {
	constructor(x, y, name, type, id = uniqueid()) {
		this.position = new Vector(x, y);
		this.name = name;
		this.id = id;
		this.type = type;

		this.you = false;
		this.push = false;
		this.win = false;
		this.stop = false;
		this.sink = false;
		this.sunk = false;
		this.defeat = false;
		this.right = false;
		this.left = false;
		this.up = false;
		this.down = false;
	}
	sinkBlock() {
		if (this.sink) {
			if (!this.sunk) {
				for (let i = 0; i < spriteBlocks.length; i++) {
					let block = spriteBlocks[i];
					if (
						this.position.same(block.position) &&
						this.id !== block.id
					) {
						spriteBlocks.splice(i, 1);
						spriteBlocks.splice(
							spriteBlocks.indexOf(this),
							1,
						);
						this.sunk = true;
					}
				}
			}
		}
	}
	winLevel() {
		if (this.win) {
			spriteBlocks.forEach(block => {
				if (block.you) {
					if (block.position.same(this.position)) {
						win();
					}
				}
			});
		}
	}
	delete() {
		if (this.defeat) {
			console.log(this)
			for (let i = 0; i < spriteBlocks.length; i++) {
				let block = spriteBlocks[i];
				if (
					this.position.same(block.position) &&
					this.id !== block.id && block.you
				) {
					spriteBlocks.splice(i, 1);
				}
			}
		}
	}
	move(message) {
		if (this.you || message.to === this.id) {
			if (message.from === 'push' || !this[message.data]) {
				switch (message.data) {
					case 'right':
						this.position.x += 1;
						break;
					case 'left':
						this.position.x -= 1;
						break;
					case 'up':
						this.position.y -= 1;
						break;
					case 'down':
						this.position.y += 1;
						break;
				}
			}
		}
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		this.winLevel();
		this.sinkBlock();
		this.delete();
	}
	onMessage(msg) {
		let from = msg.from;
		let to = msg.to;
		switch (from) {
			case 'collision':
				if (to === this.id) {
					this[msg.type] = msg.data;
				}
				break;

			case 'push':
				if (to === this.id) {
					this.move(msg);
				}
				break;

			case 'movement':
				if (to === 'you') {
					this.move(msg);
				}
				break;
		}
	}
}
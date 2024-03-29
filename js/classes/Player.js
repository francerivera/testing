class Player {
    constructor({position, collisionBlocks}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.width = 25
        this.height = 25
        this.collisionBlocks = collisionBlocks
    }

    draw() {
        c.fillStyle ='red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.applyGravity()
        this.checkForVerticalCollisions()
    }

    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
                ) {
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0
                        this.position.y = collisionBlock.position.y - this.height - 0.01
                    }
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0
                        this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                }
            }
        }
    }
}
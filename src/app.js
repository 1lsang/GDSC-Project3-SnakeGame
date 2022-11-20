/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import Snake from "./snake"

export default class App {
    #pixelRatio

    #tileCount

    #gridSize

    constructor() {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")

        this.#pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

        this.#tileCount = 20

        window.addEventListener("resize", this.resize.bind(this), false) // resize 설정
        this.resize()

        this.snake = new Snake(this.#gridSize, this.#tileCount, 10, 10)

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.#pixelRatio
        this.canvas.height = this.stageHeight * this.#pixelRatio

        // 레티나 디스플레이에서 해상도 4배로 늘리기
        this.ctx.scale(this.#pixelRatio, this.#pixelRatio)

        // Set grid size
        this.#gridSize =
            Math.min(this.stageWidth, this.stageHeight) / this.#tileCount
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        this.snake.draw(this.ctx, this.#gridSize, this.#tileCount)
    }
}

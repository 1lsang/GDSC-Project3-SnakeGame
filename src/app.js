/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

export default class App {
    constructor() {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

        window.addEventListener("resize", this.resize.bind(this), false) // resize 설정
        this.resize()

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio

        // 레티나 디스플레이에서 해상도 4배로 늘리기
        this.ctx.scale(this.pixelRatio, this.pixelRatio)
    }

    animate() {}
}

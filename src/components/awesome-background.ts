import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getRandom, random } from '../utilts';

const colors = ['#4f46e5', '#a78bfa', '#f472b6', '#fff'];

@customElement('awesome-background')
class AwesomeBackground extends LitElement {
  @property({ type: Number })
  count = 4;

  static styles = css`
    :host {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .glass {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(50px);
    }
    .children {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      ${Array(this.count)
        .fill(0)
        .map(
          () => html`<awesome-blob color=${getRandom(colors)}></awesome-blob>`
        )}
      <div class="glass"></div>
      <div class="children"><slot></slot></div>
    `;
  }
}

@customElement('awesome-blob')
class AwesomeBlob extends LitElement {
  @property()
  color = '#000';

  @state()
  size: number;

  @state()
  x: number;

  @state()
  y: number;

  @state()
  speedX = 0;

  @state()
  speedY = 0;

  static styles = css`
    :host {
      position: absolute;
      left: 0;
      top: 0;
    }
    div {
      border-radius: 50%;
      aspect-ratio: 1;
    }
  `;

  constructor() {
    super();
    this.size = random(200, 600);
    this.x = random(0, window.innerWidth - (this.size ?? 0));
    this.y = random(0, window.innerHeight - (this.size ?? 0));
    this.speedX = random(1, 2) * Math.random() > 0.5 ? 1 : -1;
    this.speedY = random(1, 2) * Math.random() > 0.5 ? 1 : -1;

    const animationHandler = () => {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) {
        this.x = 0;
        this.speedX *= -1;
      }
      if (this.y < 0) {
        this.y = 0;
        this.speedY *= -1;
      }
      if (this.x + this.size > window.innerWidth) {
        this.x = window.innerWidth - this.size;
        this.speedX *= -1;
      }
      if (this.y + this.size > window.innerHeight) {
        this.y = window.innerHeight - this.size;
        this.speedY *= -1;
      }
      requestAnimationFrame(animationHandler);
    };

    requestAnimationFrame(animationHandler);
  }

  render() {
    return html`<div
      style=${styleMap({
        width: `${this.size}px`,
        height: `${this.size}px`,
        backgroundColor: this.color,
        transform: `translate(${this.x}px, ${this.y}px)`,
      })}
    ></div>`;
  }
}

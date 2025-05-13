import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import card from "./styles/card.css.ts";

export class VenueElement extends LitElement {
    @property({ type: String, attribute: "address" })
    address = "";
  
    @property({ type: String, attribute: "capacity" })
    capacity = "";
  
    @property({ type: String, attribute: "contact" })
    contact = "";

  static styles = [reset.styles, card.styles, css`
    :host {
      display: block;
    }

    h2 {
      font-family: var(--font-family-display);
      color: var(--color-primary);
      font-size: 1.8rem;
      margin: 0 0 1.5rem 0;
    }
  `];

  override render() {
    return html`
      <div class="card">
        <h2><slot name="name">Venue Name</slot></h2>
        <p><strong>Address:</strong> ${this.address}</p>
        <p><strong>Capacity:</strong> ${this.capacity}</p>
        <p><strong>Contact:</strong> ${this.contact}</p>
      </div>
    `;
  }
} 
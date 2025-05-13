import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import card from "./styles/card.css.ts";

export class RestaurantElement extends LitElement {
  @property({ type: String, attribute: "address" })
  address = "";

  @property({ type: String, attribute: "contact" })
  contact = "";

  @property({ type: String, attribute: "website" })
  website = "";

  @property({ type: String, attribute: "cuisine" })
  cuisine = "";

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

    a {
      color: var(--color-link);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `];

  override render() {
    return html`
      <div class="card">
        <h2><slot name="name">Restaurant Name</slot></h2>
        <p><strong>Address:</strong> ${this.address}</p>
        <p><strong>Contact:</strong> ${this.contact}</p>
        <p>
          <strong>Website:</strong>
          <a href="${this.website}" target="_blank">${this.website.replace(/^https?:\/\//, '')}</a>
        </p>
        <p><strong>Cuisine:</strong> ${this.cuisine}</p>
        <p><slot>Restaurant description goes here.</slot></p>
      </div>
    `;
  }
}

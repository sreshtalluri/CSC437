import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import card from "./styles/card.css.ts";

export class VideographerElement extends LitElement {
  @property({ type: String, attribute: "contact" })
  contact = "";

  @property({ type: String, attribute: "website" })
  website = "";

  @property({ type: String, attribute: "specialty" })
  specialty = "";

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
        <h2><slot name="name">Videographer Name</slot></h2>
        <p>
          <strong>Contact:</strong>
          <a href="mailto:${this.contact}">${this.contact}</a>
        </p>
        <p>
          <strong>Website:</strong>
          <a href="${this.website}" target="_blank">${this.website.replace(/^https?:\/\//, '')}</a>
        </p>
        <p>
          <strong>Specialty:</strong>
          ${this.specialty}
        </p>
        <p><slot>Videographer description goes here.</slot></p>
      </div>
    `;
  }
}

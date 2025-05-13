import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import card from "./styles/card.css.ts";

export class GuestElement extends LitElement {
  @property({ type: String, attribute: "email" })
  email = "";

  @property({ type: String, attribute: "rsvp" })
  rsvp = "";

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
        <h2><slot name="name">Guest Name</slot></h2>
        <p>
          <strong>Email:</strong>
          <a href="mailto:${this.email}">${this.email}</a>
        </p>
        <p><strong>RSVP Status:</strong> ${this.rsvp}</p>
      </div>
    `;
  }
} 
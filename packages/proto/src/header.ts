import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer, Events } from "@calpoly/mustang";
import headings from "./styles/headings.css";
import reset from "./styles/reset.css";

export class HeaderElement extends LitElement {
  static styles = [
    headings.styles,
    reset.styles,
    css`
      :host {
        display: block;
      }
    `
  ];

  _authObserver = new Observer<Auth.Model>(this, "eplan:auth");

  @property({ type: String, attribute: "icon" })
  icon = "";

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;
      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: Event) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`
      <a href="/login.html">
        Sign In
      </a>
    `;
  }

  render() {
    return html`
      <e-header>
        <div class="logo">
          <svg class="icon">
            <use href="/icons/events.svg#${this.icon}" />
          </svg>
          <span>Event Planner</span>
        </div>
        <div class="auth-section">
          <span>Hello, ${this.userid || "Guest"}</span>
          ${this.loggedIn
            ? this.renderSignOutButton()
            : this.renderSignInButton()}
        </div>
      </e-header>
    `;
  }
}
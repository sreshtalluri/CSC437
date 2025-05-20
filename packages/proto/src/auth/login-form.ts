import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

interface LoginFormData {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export class LoginFormElement extends LitElement {

  @state()
  formData: LoginFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    if (this.api?.includes('register')) {
      return Boolean(
        this.api && 
        this.formData.username &&
        this.formData.password &&
        this.formData.confirmPassword &&
        this.formData.password === this.formData.confirmPassword
      );
    }
    return Boolean(this.api && this.formData.username && this.formData.password);
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            ${this.api?.includes('register') ? 'Create Account' : 'Login'}
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;
  
    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
      case "confirmPassword":
        this.formData = { ...prevData, confirmPassword: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      // For registration, only send username and password
      const dataToSend = this.api?.includes('register') 
        ? { username: this.formData.username, password: this.formData.password }
        : this.formData;

      fetch(
        this?.api || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend)
        }
      )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201)
          throw "Login failed";
        else return res.json();
      })
      .then((json: object) => {
          const { token } = json as { token: string };
          const customEvent = new CustomEvent(
          'auth:message', {
          bubbles: true,
          composed: true,
          detail: [
              'auth/signin',
              { token, redirect: this.redirect }
          ]
          });
          console.log("dispatching message", customEvent);
          this.dispatchEvent(customEvent);
      })
      .catch((error: Error) => {
          console.log(error);
          this.error = error.toString();
      });
    }
  }
}
import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import card from "./styles/card.css.ts";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  event_name: string;
  event_date: string;
  event_time: string;
  event_description: string;
  event_status: string;
}

export class HostEditElement extends LitElement {
  @property()
  src?: string;

  @state()
  profile?: Profile;

  @state()
  loading = true;

  @state()
  error?: string;

  @state()
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: ''
  };

  _authObserver = new Observer<Auth.Model>(this, "eplan:auth");
  _user?: Auth.User;

  get authorization() {
    if (!this._user?.authenticated) {
      console.log('User not authenticated');
      return undefined;
    }
    
    const auth = {
      Authorization: `Bearer ${(this._user as any).token}`
    };
    
    return auth;
  }

  static styles = [reset.styles, card.styles, css`
    .edit-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--color-text);
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-primary-light);
      border-radius: 4px;
      font-size: 1rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button[type="submit"] {
      background-color: var(--color-primary);
      color: white;
    }

    button[type="submit"]:hover {
      background-color: var(--color-primary-dark);
    }

    button[type="button"] {
      background-color: #e0e0e0;
      color: #333;
      border: 1px solid #ccc;
    }

    button[type="button"]:hover {
      background-color: #d0d0d0;
    }
  `];

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this._user?.authenticated && this.src) {
        this.hydrate(this.src);
      } else {
        this.loading = false;
      }
    });
  }

  hydrate(src: string) {
    this.loading = true;
    this.error = undefined;

    console.log('Fetching from:', src);
    console.log('Auth state:', this._user?.authenticated ? 'Authenticated' : 'Not authenticated');
    console.log('User:', this._user);

    const username = this._user?.username;
    if (!username) {
      console.error('No username found');
      this.loading = false;
      return;
    }

    const headers = this.authorization ? { headers: this.authorization } : undefined;

    fetch('/api/profiles?username=' + username, headers)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        this.profile = data;
        this.formData = {
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          role: data.role || ''
        };
        this.loading = false;
      })
      .catch(error => {
        console.error('Error loading profile:', error);
        this.error = error.message;
        this.loading = false;
      });
  }

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.formData = {
      ...this.formData,
      [target.name]: target.value
    };
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!this._user?.username) {
      this.error = 'No username found';
      return;
    }

    const headers = this.authorization ? { 
      ...this.authorization,
      'Content-Type': 'application/json'
    } : undefined;

    try {
      const response = await fetch('/api/profiles?username=' + this._user.username, {
        method: 'PUT',
        headers,
        body: JSON.stringify(this.formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Navigate back to index page after successful update
      window.location.href = '/index.html';
    } catch (error) {
      console.error('Error updating profile:', error);
      this.error = error instanceof Error ? error.message : 'Failed to update host details';
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="edit-form">Loading...</div>`;
    }

    if (!this._user?.authenticated) {
      return html`
        <div class="edit-form">
          <p>Please log in to edit host details.</p>
        </div>
      `;
    }

    return html`
      <div class="edit-form">
        <h2>Edit Host Details</h2>
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              .value=${this.formData.firstName}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              .value=${this.formData.lastName}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              .value=${this.formData.email}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              .value=${this.formData.phone}
              @input=${this.handleInput}
            />
          </div>

          <div class="form-group">
            <label for="role">Role</label>
            <select
              id="role"
              name="role"
              .value=${this.formData.role}
              @input=${this.handleInput}
              required
            >
              <option value="">Select a role</option>
              <option value="Host">Host</option>
              <option value="Co-Host">Co-Host</option>
              <option value="Event Planner">Event Planner</option>
            </select>
          </div>

          <div class="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" @click=${() => window.location.href = '/index.html'}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define("host-edit-element", HostEditElement); 
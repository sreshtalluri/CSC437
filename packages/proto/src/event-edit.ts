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

export class EventEditElement extends LitElement {
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
    event_name: '',
    event_date: '',
    event_time: '',
    event_description: ''
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

    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-primary-light);
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea {
      min-height: 150px;
      resize: vertical;
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
      background-color: var(--color-secondary);
      color: white;
    }

    button[type="button"]:hover {
      background-color: var(--color-secondary-dark);
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
          event_name: data.event_name || '',
          event_date: data.event_date || '',
          event_time: data.event_time || '',
          event_description: data.event_description || ''
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
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
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

      // Navigate back to event page after successful update
      window.location.href = '/event.html';
    } catch (error) {
      console.error('Error updating profile:', error);
      this.error = error instanceof Error ? error.message : 'Failed to update event';
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="edit-form">Loading...</div>`;
    }

    if (!this._user?.authenticated) {
      return html`
        <div class="edit-form">
          <p>Please log in to edit event details.</p>
        </div>
      `;
    }

    return html`
      <div class="edit-form">
        <h2>Edit Event Details</h2>
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="event_name">Event Title</label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              .value=${this.formData.event_name}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="event_date">Date</label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              .value=${this.formData.event_date}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="event_time">Time</label>
            <input
              type="time"
              id="event_time"
              name="event_time"
              .value=${this.formData.event_time}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="event_description">Description</label>
            <textarea
              id="event_description"
              name="event_description"
              .value=${this.formData.event_description}
              @input=${this.handleInput}
              required
            ></textarea>
          </div>

          <div class="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" @click=${() => window.location.href = '/event.html'}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define("event-edit-element", EventEditElement); 
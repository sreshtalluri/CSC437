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

export class EventElement extends LitElement {
  @property()
  src?: string;

  @state()
  profile?: Profile;

  @state()
  loading = true;

  @state()
  error?: string;

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
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      align-items: stretch;
      width: 100%;
    }

    h2 {
      font-family: var(--font-family-display);
      color: var(--color-primary);
      font-size: 1.8rem;
      margin: 0 0 1.5rem 0;
    }

    .edit-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: auto;
    }

    .edit-button:hover {
      background-color: #2c5282;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .edit-button svg {
      width: 20px;
      height: 20px;
    }
  `];

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      console.log('Auth state changed:', auth);
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
    console.log('Request headers:', headers);

    fetch('/api/profiles?username=' + username, headers)
      .then(res => {
        console.log('Response status:', res.status);
        console.log('Response headers:', Object.fromEntries(res.headers.entries()));
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return res.json();
      })
      .then(data => {
        console.log('Profile data:', data);
        this.profile = data;
        this.loading = false;
      })
      .catch(error => {
        console.error('Error loading profile:', error);
        this.error = error.message;
        this.loading = false;
      });
  }

  render() {
    if (this.loading) {
      return html`
        <div class="card-grid">
          <div class="card">
            <h2>Event Information</h2>
            <p><strong>Title:</strong> Loading...</p>
            <p><strong>Date:</strong> Loading...</p>
            <p><strong>Time:</strong> Loading...</p>
          </div>
          
          <div class="card">
            <h2>Description</h2>
            <p>Loading...</p>
          </div>
        </div>
      `;
    }

    if (!this._user?.authenticated) {
      return html`
        <div class="card-grid">
          <div class="card">
            <h2>Event Information</h2>
            <p>Please log in to view event details.</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="card-grid">
        <div class="card">
          <h2>Event Information</h2>
          <p><strong>Title:</strong> ${this.profile?.event_name}</p>
          <p><strong>Date:</strong> ${this.profile?.event_date}</p>
          <p><strong>Time:</strong> ${this.profile?.event_time}</p>
          <a href="/event-edit.html" class="edit-button">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Event
          </a>
        </div>
        
        <div class="card">
          <h2>Description</h2>
          <p>${this.profile?.event_description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("event-element", EventElement); 
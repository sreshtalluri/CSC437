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

export class IndexElement extends LitElement {
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
    h1 {
      font-family: var(--font-family-display);
      font-size: 2.5rem;
      color: var(--color-primary);
      margin: 0;
      padding-bottom: 1rem;
      border-bottom: 3px solid var(--color-primary-light);
    }

    .host-details {
      margin-bottom: 2rem;
    }

    .host-info {
      margin-top: 1.5rem;
    }

    .host-info p {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .host-info p:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
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
      margin-top: 1rem;
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

    // Get username from the authenticated user
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
        <div class="card host-details">
          <h1>Host Details</h1>
          <div class="host-info">
            <p><strong>Name:</strong> Loading...</p>
            <p><strong>Contact:</strong> Loading...</p>
            <p><strong>Role:</strong> Loading...</p>
          </div>
        </div>
      `;
    }

    if (!this._user?.authenticated) {
      return html`
        <div class="card host-details">
          <h1>Host Details</h1>
          <div class="host-info">
            <p><strong>Name:</strong> Guest User</p>
            <p><strong>Contact:</strong> Please log in to view contact information</p>
            <p><strong>Role:</strong> Guest</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="card host-details">
        <h1>Host Details</h1>
        <div class="host-info">
          <p><strong>Name:</strong> ${this.profile?.firstName} ${this.profile?.lastName}</p>
          <p><strong>Contact:</strong> ${this.profile?.email}${this.profile?.phone ? ` | ${this.profile.phone}` : ''}</p>
          <p><strong>Role:</strong> ${this.profile?.role}</p>
          <a href="/host-edit.html" class="edit-button">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Host Details
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define("index-element", IndexElement); 
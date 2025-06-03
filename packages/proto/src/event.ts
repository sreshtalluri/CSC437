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
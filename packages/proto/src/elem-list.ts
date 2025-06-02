import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.ts";
import card from "./styles/card.css.ts";

// interfaces for each type of data
interface Venue {
  id: number;
  type: 'venue';
  name: string;
  address: string;
  capacity: number;
  contact: string;
}

interface Photographer {
  id: number;
  type: 'photographer';
  name: string;
  contact: string;
  website: string;
  specialty: string;
}

interface Videographer {
  id: number;
  type: 'videographer';
  name: string;
  contact: string;
  website: string;
  specialty: string;
}

interface Guest {
  id: number;
  type: 'guest';
  name: string;
  email: string;
  rsvp: string;
}

interface Restaurant {
  id: number;
  type: 'restaurant';
  name: string;
  address: string;
  contact: string;
  website: string;
  cuisine: string;
  description: string;
}

// union type for all possible items
type Item = Venue | Photographer | Videographer | Guest | Restaurant;

export class ListElement extends LitElement {
  @property()
  src?: string;

  @state()
  items: Array<Item> = [];

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
    :host {
      display: block;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      align-items: stretch;
      width: 100%;
    }

    .error {
      color: var(--color-error);
      padding: 1rem;
      background-color: var(--color-error-light);
      border-radius: 4px;
      margin: 1rem 0;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: var(--color-text-light);
    }
  `];

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      console.log('Auth state changed:', auth);
      this._user = auth.user;
      if (this.src) this.hydrate(this.src);
    });
  }

  hydrate(src: string) {
    this.loading = true;
    this.error = undefined;

    console.log('Fetching from:', src);
    console.log('Auth state:', this._user?.authenticated ? 'Authenticated' : 'Not authenticated');
    console.log('User:', this._user);

    const headers = this.authorization ? { headers: this.authorization } : undefined;
    console.log('Request headers:', headers);

    fetch(src, headers)
      .then(res => {
        console.log('Response status:', res.status);
        console.log('Response headers:', Object.fromEntries(res.headers.entries()));
        
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Authentication required. Please log in to view this content.');
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json: object) => {
        console.log('Received data:', json);
        if (json) {
          // convert the JSON data to our typed array
          this.items = Array.isArray(json) ? json : [json];
          console.log('Processed items:', this.items);
        }
      })
      .catch(error => {
        console.error('Error loading data:', error);
        this.error = error.message;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private renderVenue(venue: Venue) {
    return html`
      <venue-card
        .address=${venue.address}
        .contact=${venue.contact}
        .capacity=${venue.capacity}
      >
        <span slot="name">${venue.name}</span>
      </venue-card>
    `;
  }

  private renderPhotographer(photographer: Photographer) {
    return html`
      <photographer-card
        .contact=${photographer.contact}
        .website=${photographer.website}
        .specialty=${photographer.specialty}
      >
        <span slot="name">${photographer.name}</span>
      </photographer-card>
    `;
  }

  private renderVideographer(videographer: Videographer) {
    return html`
      <videographer-card
        .contact=${videographer.contact}
        .website=${videographer.website}
        .specialty=${videographer.specialty}
      >
        <span slot="name">${videographer.name}</span>
      </videographer-card>
    `;
  }

  private renderGuest(guest: Guest) {
    return html`
      <guest-card
        .email=${guest.email}
        .rsvp=${guest.rsvp}
      >
        <span slot="name">${guest.name}</span>
      </guest-card>
    `;
  }

  private renderRestaurant(restaurant: Restaurant) {
    return html`
      <restaurant-card
        .address=${restaurant.address}
        .contact=${restaurant.contact}
        .website=${restaurant.website}
        .cuisine=${restaurant.cuisine}
      >
        <span slot="name">${restaurant.name}</span>
        <p>${restaurant.description}</p>
      </restaurant-card>
    `;
  }

  private renderItem(item: Item) {
    switch (item.type) {
      case 'venue':
        return this.renderVenue(item);
      case 'photographer':
        return this.renderPhotographer(item);
      case 'videographer':
        return this.renderVideographer(item);
      case 'guest':
        return this.renderGuest(item);
      case 'restaurant':
        return this.renderRestaurant(item);
      default:
        return html`<div>Unknown item type: ${(item as any).type}</div>`;
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading...</div>`;
    }

    if (this.error) {
      return html`<div class="error">${this.error}</div>`;
    }

    if (!this.items.length) {
      return html`<div class="loading">No items found</div>`;
    }

    return html`
      <div class="card-grid">
        ${this.items.map(item => this.renderItem(item))}
      </div>
    `;
  }
} 
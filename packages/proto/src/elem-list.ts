import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import card from "./styles/card.css.ts";

// interfaces for each type of data
interface Venue {
  type: 'venue';
  name: string;
  address: string;
  capacity: number;
  contact: string;
}

interface Photographer {
  type: 'photographer';
  name: string;
  contact: string;
  website: string;
  specialty: string;
}

interface Videographer {
  type: 'videographer';
  name: string;
  contact: string;
  website: string;
  specialty: string;
}

interface Guest {
  type: 'guest';
  name: string;
  email: string;
  rsvp: string;
}

interface Restaurant {
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
  `];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  hydrate(src: string) {
    fetch(src)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json: object) => {
        if (json) {
          // convert the JSON data to our typed array
          this.items = Array.isArray(json) ? json : [json];
        }
      })
      .catch(error => {
        console.error('Error loading data:', error);
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
    if (!this.items.length) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <div class="card-grid">
        ${this.items.map(item => this.renderItem(item))}
      </div>
    `;
  }
} 
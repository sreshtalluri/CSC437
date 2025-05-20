import{b as p,i as u,O as l,r as m,x as t,n as b,c as g}from"./reset.css-6vUoClCO.js";const $=p`
    .card {
        background-color: var(--color-background-card);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
        
    .card p {
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .card p:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .card strong {
      color: var(--color-primary);
      font-weight: 600;
      margin-right: 0.5rem;
    }
`,y={styles:$};var f=Object.defineProperty,h=(c,r,s,e)=>{for(var a=void 0,i=c.length-1,d;i>=0;i--)(d=c[i])&&(a=d(r,s,a)||a);return a&&f(r,s,a),a};const o=class o extends u{constructor(){super(...arguments),this.items=[],this._authObserver=new l(this,"eplan:auth")}get authorization(){var r;if((r=this._user)!=null&&r.authenticated)return{Authorization:`Bearer ${this._user.username}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(r=>{this._user=r.user}),this.src&&this.hydrate(this.src)}hydrate(r){const s=this.authorization?{headers:this.authorization}:void 0;fetch(r,s).then(e=>{if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return e.json()}).then(e=>{e&&(this.items=Array.isArray(e)?e:[e])}).catch(e=>{console.error("Error loading data:",e)})}renderVenue(r){return t`
      <venue-card
        .address=${r.address}
        .contact=${r.contact}
        .capacity=${r.capacity}
      >
        <span slot="name">${r.name}</span>
      </venue-card>
    `}renderPhotographer(r){return t`
      <photographer-card
        .contact=${r.contact}
        .website=${r.website}
        .specialty=${r.specialty}
      >
        <span slot="name">${r.name}</span>
      </photographer-card>
    `}renderVideographer(r){return t`
      <videographer-card
        .contact=${r.contact}
        .website=${r.website}
        .specialty=${r.specialty}
      >
        <span slot="name">${r.name}</span>
      </videographer-card>
    `}renderGuest(r){return t`
      <guest-card
        .email=${r.email}
        .rsvp=${r.rsvp}
      >
        <span slot="name">${r.name}</span>
      </guest-card>
    `}renderRestaurant(r){return t`
      <restaurant-card
        .address=${r.address}
        .contact=${r.contact}
        .website=${r.website}
        .cuisine=${r.cuisine}
      >
        <span slot="name">${r.name}</span>
        <p>${r.description}</p>
      </restaurant-card>
    `}renderItem(r){switch(r.type){case"venue":return this.renderVenue(r);case"photographer":return this.renderPhotographer(r);case"videographer":return this.renderVideographer(r);case"guest":return this.renderGuest(r);case"restaurant":return this.renderRestaurant(r);default:return t`<div>Unknown item type: ${r.type}</div>`}}render(){return this.items.length?t`
      <div class="card-grid">
        ${this.items.map(r=>this.renderItem(r))}
      </div>
    `:t`<p>Loading...</p>`}};o.styles=[m.styles,y.styles,p`
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
  `];let n=o;h([b()],n.prototype,"src");h([g()],n.prototype,"items");export{n as L,y as c};

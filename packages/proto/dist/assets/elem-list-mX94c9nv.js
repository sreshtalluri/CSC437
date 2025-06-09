import{i as u,O as p,r as g,a as m,x as t,n as v,b as c}from"./reset.css-DieTGmEc.js";import{c as $}from"./card.css-p7RGg8cR.js";var f=Object.defineProperty,o=(h,e,s,i)=>{for(var r=void 0,n=h.length-1,l;n>=0;n--)(l=h[n])&&(r=l(e,s,r)||r);return r&&f(e,s,r),r};const d=class d extends u{constructor(){super(...arguments),this.items=[],this.loading=!0,this._authObserver=new p(this,"eplan:auth")}get authorization(){var s;if(!((s=this._user)!=null&&s.authenticated)){console.log("User not authenticated");return}return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{console.log("Auth state changed:",e),this._user=e.user,this.src&&this.hydrate(this.src)})}hydrate(e){var i;this.loading=!0,this.error=void 0,console.log("Fetching from:",e),console.log("Auth state:",(i=this._user)!=null&&i.authenticated?"Authenticated":"Not authenticated"),console.log("User:",this._user);const s=this.authorization?{headers:this.authorization}:void 0;console.log("Request headers:",s),fetch(e,s).then(r=>{if(console.log("Response status:",r.status),console.log("Response headers:",Object.fromEntries(r.headers.entries())),!r.ok)throw r.status===401?new Error("Authentication required. Please log in to view this content."):new Error(`HTTP error! status: ${r.status}`);return r.json()}).then(r=>{console.log("Received data:",r),r&&(this.items=Array.isArray(r)?r:[r],console.log("Processed items:",this.items))}).catch(r=>{console.error("Error loading data:",r),this.error=r.message}).finally(()=>{this.loading=!1})}renderVenue(e){return t`
      <venue-card
        .address=${e.address}
        .contact=${e.contact}
        .capacity=${e.capacity}
      >
        <span slot="name">${e.name}</span>
      </venue-card>
    `}renderPhotographer(e){return t`
      <photographer-card
        .contact=${e.contact}
        .website=${e.website}
        .specialty=${e.specialty}
      >
        <span slot="name">${e.name}</span>
      </photographer-card>
    `}renderVideographer(e){return t`
      <videographer-card
        .contact=${e.contact}
        .website=${e.website}
        .specialty=${e.specialty}
      >
        <span slot="name">${e.name}</span>
      </videographer-card>
    `}renderGuest(e){return t`
      <guest-card
        .email=${e.email}
        .rsvp=${e.rsvp}
      >
        <span slot="name">${e.name}</span>
      </guest-card>
    `}renderRestaurant(e){return t`
      <restaurant-card
        .address=${e.address}
        .contact=${e.contact}
        .website=${e.website}
        .cuisine=${e.cuisine}
      >
        <span slot="name">${e.name}</span>
        <p>${e.description}</p>
      </restaurant-card>
    `}renderItem(e){switch(e.type){case"venue":return this.renderVenue(e);case"photographer":return this.renderPhotographer(e);case"videographer":return this.renderVideographer(e);case"guest":return this.renderGuest(e);case"restaurant":return this.renderRestaurant(e);default:return t`<div>Unknown item type: ${e.type}</div>`}}render(){return this.loading?t`<div class="loading">Loading...</div>`:this.error?t`<div class="error">${this.error}</div>`:this.items.length?t`
      <div class="card-grid">
        ${this.items.map(e=>this.renderItem(e))}
      </div>
    `:t`<div class="loading">No items found</div>`}};d.styles=[g.styles,$.styles,m`
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
  `];let a=d;o([v()],a.prototype,"src");o([c()],a.prototype,"items");o([c()],a.prototype,"loading");o([c()],a.prototype,"error");export{a as L};

import{i as d,r as l,c as h,a as u,x as g,n as s,d as y}from"./card.css-C3XU9oUb.js";var b=Object.defineProperty,r=(o,n,p,f)=>{for(var e=void 0,i=o.length-1,c;i>=0;i--)(c=o[i])&&(e=c(n,p,e)||e);return e&&b(n,p,e),e};const a=class a extends d{constructor(){super(...arguments),this.address="",this.contact="",this.website="",this.cuisine=""}render(){return g`
      <div class="card">
        <h2><slot name="name">Restaurant Name</slot></h2>
        <p><strong>Address:</strong> ${this.address}</p>
        <p><strong>Contact:</strong> ${this.contact}</p>
        <p>
          <strong>Website:</strong>
          <a href="${this.website}" target="_blank">${this.website.replace(/^https?:\/\//,"")}</a>
        </p>
        <p><strong>Cuisine:</strong> ${this.cuisine}</p>
        <p><slot>Restaurant description goes here.</slot></p>
      </div>
    `}};a.styles=[l.styles,h.styles,u`
    :host {
      display: block;
    }

    h2 {
      font-family: var(--font-family-display);
      color: var(--color-primary);
      font-size: 1.8rem;
      margin: 0 0 1.5rem 0;
    }

    a {
      color: var(--color-link);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `];let t=a;r([s({type:String,attribute:"address"})],t.prototype,"address");r([s({type:String,attribute:"contact"})],t.prototype,"contact");r([s({type:String,attribute:"website"})],t.prototype,"website");r([s({type:String,attribute:"cuisine"})],t.prototype,"cuisine");y({"restaurant-card":t});

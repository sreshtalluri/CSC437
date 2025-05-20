import{i as l,r as h,b as u,x as m,n as r,d as g,a as y}from"./reset.css-6vUoClCO.js";import{c as f,L as b}from"./elem-list-bm3u-S8t.js";import{H as d}from"./header-m5_XIgl8.js";var v=Object.defineProperty,s=(o,n,p,w)=>{for(var e=void 0,i=o.length-1,c;i>=0;i--)(c=o[i])&&(e=c(n,p,e)||e);return e&&v(n,p,e),e};const a=class a extends l{constructor(){super(...arguments),this.address="",this.contact="",this.website="",this.cuisine=""}render(){return m`
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
    `}};a.styles=[h.styles,f.styles,u`
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
  `];let t=a;s([r({type:String,attribute:"address"})],t.prototype,"address");s([r({type:String,attribute:"contact"})],t.prototype,"contact");s([r({type:String,attribute:"website"})],t.prototype,"website");s([r({type:String,attribute:"cuisine"})],t.prototype,"cuisine");g({"mu-auth":y.Provider,"restaurant-card":t,"list-view":b,"event-header":d});d.initializeOnce();

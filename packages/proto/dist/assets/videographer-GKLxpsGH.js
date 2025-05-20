import{i as h,r as d,b as y,x as m,n as s,d as f,a as v}from"./reset.css-6vUoClCO.js";import{c as g,L as b}from"./elem-list-bm3u-S8t.js";import{H as l}from"./header-m5_XIgl8.js";var u=Object.defineProperty,a=(o,n,c,w)=>{for(var t=void 0,r=o.length-1,p;r>=0;r--)(p=o[r])&&(t=p(n,c,t)||t);return t&&u(n,c,t),t};const i=class i extends h{constructor(){super(...arguments),this.contact="",this.website="",this.specialty=""}render(){return m`
      <div class="card">
        <h2><slot name="name">Videographer Name</slot></h2>
        <p>
          <strong>Contact:</strong>
          <a href="mailto:${this.contact}">${this.contact}</a>
        </p>
        <p>
          <strong>Website:</strong>
          <a href="${this.website}" target="_blank">${this.website.replace(/^https?:\/\//,"")}</a>
        </p>
        <p>
          <strong>Specialty:</strong>
          ${this.specialty}
        </p>
        <p><slot>Videographer description goes here.</slot></p>
      </div>
    `}};i.styles=[d.styles,g.styles,y`
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
  `];let e=i;a([s({type:String,attribute:"contact"})],e.prototype,"contact");a([s({type:String,attribute:"website"})],e.prototype,"website");a([s({type:String,attribute:"specialty"})],e.prototype,"specialty");f({"mu-auth":v.Provider,"videographer-card":e,"list-view":b,"event-header":l});l.initializeOnce();

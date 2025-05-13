import{i as p,r as f,c as h,a as d,x as y,n as l,d as g}from"./card.css-C3XU9oUb.js";var m=Object.defineProperty,c=(e,s,i,v)=>{for(var t=void 0,r=e.length-1,n;r>=0;r--)(n=e[r])&&(t=n(s,i,t)||t);return t&&m(s,i,t),t};const a=class a extends p{constructor(){super(...arguments),this.contact="",this.portfolio=""}render(){return y`
      <div class="card">
        <h2><slot name="name">Photographer Name</slot></h2>
        <p>
          <strong>Contact:</strong>
          <a href="mailto:${this.contact}">${this.contact}</a>
        </p>
        <p>
          <strong>Portfolio:</strong>
          <a href="${this.portfolio}" target="_blank">${this.portfolio.replace(/^https?:\/\//,"")}</a>
        </p>
        <p><slot>Photographer description goes here.</slot></p>
      </div>
    `}};a.styles=[f.styles,h.styles,d`
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
  `];let o=a;c([l({type:String,attribute:"contact"})],o.prototype,"contact");c([l({type:String,attribute:"portfolio"})],o.prototype,"portfolio");g({"photographer-card":o});

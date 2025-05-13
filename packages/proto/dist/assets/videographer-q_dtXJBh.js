import{i as p,r as f,c as d,a as h,x as v,n as l,d as y}from"./card.css-C3XU9oUb.js";var g=Object.defineProperty,c=(e,s,i,m)=>{for(var t=void 0,r=e.length-1,n;r>=0;r--)(n=e[r])&&(t=n(s,i,t)||t);return t&&g(s,i,t),t};const a=class a extends p{constructor(){super(...arguments),this.contact="",this.portfolio=""}render(){return v`
      <div class="card">
        <h2><slot name="name">Videographer Name</slot></h2>
        <p>
          <strong>Contact:</strong>
          <a href="mailto:${this.contact}">${this.contact}</a>
        </p>
        <p>
          <strong>Portfolio:</strong>
          <a href="${this.portfolio}" target="_blank">${this.portfolio.replace(/^https?:\/\//,"")}</a>
        </p>
        <p><slot>Videographer description goes here.</slot></p>
      </div>
    `}};a.styles=[f.styles,d.styles,h`
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
  `];let o=a;c([l({type:String,attribute:"contact"})],o.prototype,"contact");c([l({type:String,attribute:"portfolio"})],o.prototype,"portfolio");y({"videographer-card":o});

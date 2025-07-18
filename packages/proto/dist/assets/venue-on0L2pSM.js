import{i as l,r as y,a as m,x as h,n as s,d as f,c as v}from"./reset.css-DieTGmEc.js";import{c as u,H as d}from"./card.css-p7RGg8cR.js";import{L as g}from"./elem-list-mX94c9nv.js";var b=Object.defineProperty,e=(o,n,c,$)=>{for(var t=void 0,a=o.length-1,p;a>=0;a--)(p=o[a])&&(t=p(n,c,t)||t);return t&&b(n,c,t),t};const i=class i extends l{constructor(){super(...arguments),this.address="",this.capacity="",this.contact=""}render(){return h`
      <div class="card">
        <h2><slot name="name">Venue Name</slot></h2>
        <p><strong>Address:</strong> ${this.address}</p>
        <p><strong>Capacity:</strong> ${this.capacity}</p>
        <p><strong>Contact:</strong> ${this.contact}</p>
      </div>
    `}};i.styles=[y.styles,u.styles,m`
    :host {
      display: block;
    }

    h2 {
      font-family: var(--font-family-display);
      color: var(--color-primary);
      font-size: 1.8rem;
      margin: 0 0 1.5rem 0;
    }
  `];let r=i;e([s({type:String,attribute:"address"})],r.prototype,"address");e([s({type:String,attribute:"capacity"})],r.prototype,"capacity");e([s({type:String,attribute:"contact"})],r.prototype,"contact");f({"mu-auth":v.Provider,"venue-card":r,"list-view":g,"event-header":d});d.initializeOnce();

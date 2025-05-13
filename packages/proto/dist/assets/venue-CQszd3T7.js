import{i as d,r as y,c as l,a as f,x as h,n as a,d as g}from"./card.css-C3XU9oUb.js";var v=Object.defineProperty,i=(o,c,n,u)=>{for(var t=void 0,r=o.length-1,p;r>=0;r--)(p=o[r])&&(t=p(c,n,t)||t);return t&&v(c,n,t),t};const e=class e extends d{constructor(){super(...arguments),this.address="",this.capacity="",this.contact=""}render(){return h`
      <div class="card">
        <h2><slot></slot></h2>
        <p><strong>Address:</strong> ${this.address}</p>
        <p><strong>Capacity:</strong> ${this.capacity}</p>
        <p><strong>Contact:</strong> ${this.contact}</p>
      </div>
    `}};e.styles=[y.styles,l.styles,f`
    :host {
      display: block;
    }

    h2 {
      font-family: var(--font-family-display);
      color: var(--color-primary);
      font-size: 1.8rem;
      margin: 0 0 1.5rem 0;
    }
  `];let s=e;i([a({type:String,attribute:"address"})],s.prototype,"address");i([a({type:String,attribute:"capacity"})],s.prototype,"capacity");i([a({type:String,attribute:"contact"})],s.prototype,"contact");g({"event-venue":s});

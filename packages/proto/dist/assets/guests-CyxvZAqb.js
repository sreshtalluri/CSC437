import{i as m,r as d,c,a as v,x as f,n as l,d as h}from"./card.css-C3XU9oUb.js";var y=Object.defineProperty,p=(a,i,o,u)=>{for(var r=void 0,e=a.length-1,n;e>=0;e--)(n=a[e])&&(r=n(i,o,r)||r);return r&&y(i,o,r),r};const s=class s extends m{constructor(){super(...arguments),this.email="",this.rsvp=""}render(){return f`
      <div class="card">
        <h2><slot name="name">Guest Name</slot></h2>
        <p>
          <strong>Email:</strong>
          <a href="mailto:${this.email}">${this.email}</a>
        </p>
        <p><strong>RSVP Status:</strong> ${this.rsvp}</p>
      </div>
    `}};s.styles=[d.styles,c.styles,v`
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
  `];let t=s;p([l({type:String,attribute:"email"})],t.prototype,"email");p([l({type:String,attribute:"rsvp"})],t.prototype,"rsvp");h({"guest-element":t});

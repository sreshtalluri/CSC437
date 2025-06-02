import{i as d,r as v,b as c,x as h,n as l,d as f,a as u}from"./reset.css-6vUoClCO.js";import{H as m}from"./header-m5_XIgl8.js";import{c as y,L as g}from"./elem-list-ruPqSYZY.js";var b=Object.defineProperty,p=(i,s,o,x)=>{for(var r=void 0,e=i.length-1,n;e>=0;e--)(n=i[e])&&(r=n(s,o,r)||r);return r&&b(s,o,r),r};const a=class a extends d{constructor(){super(...arguments),this.email="",this.rsvp=""}render(){return h`
      <div class="card">
        <h2><slot name="name">Guest Name</slot></h2>
        <p>
          <strong>Email:</strong>
          <a href="mailto:${this.email}">${this.email}</a>
        </p>
        <p><strong>RSVP Status:</strong> ${this.rsvp}</p>
      </div>
    `}};a.styles=[v.styles,y.styles,c`
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
  `];let t=a;p([l({type:String,attribute:"email"})],t.prototype,"email");p([l({type:String,attribute:"rsvp"})],t.prototype,"rsvp");f({"mu-auth":u.Provider,"guest-card":t,"list-view":g,"event-header":m});m.initializeOnce();

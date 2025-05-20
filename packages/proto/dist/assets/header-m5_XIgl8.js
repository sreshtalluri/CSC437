import{i as d,O as c,h as g,r as v,b as p,e as b,x as i,c as l,n as f}from"./reset.css-6vUoClCO.js";var y=Object.defineProperty,a=(u,e,s,I)=>{for(var t=void 0,r=u.length-1,h;r>=0;r--)(h=u[r])&&(t=h(e,s,t)||t);return t&&y(e,s,t),t};const o=class o extends d{constructor(){super(...arguments),this._authObserver=new c(this,"eplan:auth"),this.icon="",this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:s}=e;s&&s.authenticated?(this.loggedIn=!0,this.userid=s.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return i`
      <button
        @click=${e=>{b.relay(e,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return i`
      <a href="/login.html">
        Sign In
      </a>
    `}render(){return i`
      <e-header>
        <div class="logo">
          <svg class="icon">
            <use href="/icons/events.svg#${this.icon}" />
          </svg>
          <span>Event Planner</span>
        </div>
        <div class="auth-section">
          <span>Hello, ${this.userid||"Guest"}</span>
          ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
        </div>
      </e-header>
    `}};o.styles=[g.styles,v.styles,p`
      :host {
        display: block;
      }
    `];let n=o;a([f({type:String,attribute:"icon"})],n.prototype,"icon");a([l()],n.prototype,"loggedIn");a([l()],n.prototype,"userid");export{n as H};

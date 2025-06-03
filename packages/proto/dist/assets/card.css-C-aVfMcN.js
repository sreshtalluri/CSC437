import{i as u,O as h,h as p,r as b,a as l,e as v,x as o,b as g,n as m}from"./reset.css-DieTGmEc.js";var f=Object.defineProperty,a=(d,t,e,y)=>{for(var r=void 0,n=d.length-1,c;n>=0;n--)(c=d[n])&&(r=c(t,e,r)||r);return r&&f(t,e,r),r};const i=class i extends u{constructor(){super(...arguments),this._authObserver=new h(this,"eplan:auth"),this.icon="",this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:e}=t;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return o`
      <button
        @click=${t=>{v.relay(t,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return o`
      <a href="/login.html">
        Sign In
      </a>
    `}render(){return o`
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
    `}};i.styles=[p.styles,b.styles,l`
      :host {
        display: block;
      }
    `];let s=i;a([m({type:String,attribute:"icon"})],s.prototype,"icon");a([g()],s.prototype,"loggedIn");a([g()],s.prototype,"userid");const x=l`
    .card {
        background-color: var(--color-background-card);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
        
    .card p {
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .card p:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .card strong {
      color: var(--color-primary);
      font-weight: 600;
      margin-right: 0.5rem;
    }
`,O={styles:x};export{s as H,O as c};

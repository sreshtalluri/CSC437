import{i as u,O as g,r as f,a as m,x as l,n as v,b as h,d as b,c as y}from"./reset.css-DieTGmEc.js";import{c as _,H as p}from"./card.css-C-aVfMcN.js";var $=Object.defineProperty,n=(c,s,e,a)=>{for(var o=void 0,r=c.length-1,t;r>=0;r--)(t=c[r])&&(o=t(s,e,o)||o);return o&&$(s,e,o),o};const d=class d extends u{constructor(){super(...arguments),this.loading=!0,this._authObserver=new g(this,"eplan:auth")}get authorization(){var e;if(!((e=this._user)!=null&&e.authenticated)){console.log("User not authenticated");return}return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(s=>{var e;console.log("Auth state changed:",s),this._user=s.user,(e=this._user)!=null&&e.authenticated&&this.src?this.hydrate(this.src):this.loading=!1})}hydrate(s){var o,r;this.loading=!0,this.error=void 0,console.log("Fetching from:",s),console.log("Auth state:",(o=this._user)!=null&&o.authenticated?"Authenticated":"Not authenticated"),console.log("User:",this._user);const e=(r=this._user)==null?void 0:r.username;if(!e){console.error("No username found"),this.loading=!1;return}const a=this.authorization?{headers:this.authorization}:void 0;console.log("Request headers:",a),fetch("/api/profiles?username="+e,a).then(t=>{if(console.log("Response status:",t.status),console.log("Response headers:",Object.fromEntries(t.headers.entries())),!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>{console.log("Profile data:",t),this.profile=t,this.loading=!1}).catch(t=>{console.error("Error loading profile:",t),this.error=t.message,this.loading=!1})}render(){var s,e,a,o,r,t;return this.loading?l`
        <div class="card host-details">
          <h1>Host Details</h1>
          <div class="host-info">
            <p><strong>Name:</strong> Loading...</p>
            <p><strong>Contact:</strong> Loading...</p>
            <p><strong>Role:</strong> Loading...</p>
          </div>
        </div>
      `:(s=this._user)!=null&&s.authenticated?l`
      <div class="card host-details">
        <h1>Host Details</h1>
        <div class="host-info">
          <p><strong>Name:</strong> ${(e=this.profile)==null?void 0:e.firstName} ${(a=this.profile)==null?void 0:a.lastName}</p>
          <p><strong>Contact:</strong> ${(o=this.profile)==null?void 0:o.email}${(r=this.profile)!=null&&r.phone?` | ${this.profile.phone}`:""}</p>
          <p><strong>Role:</strong> ${(t=this.profile)==null?void 0:t.role}</p>
        </div>
      </div>
    `:l`
        <div class="card host-details">
          <h1>Host Details</h1>
          <div class="host-info">
            <p><strong>Name:</strong> Guest User</p>
            <p><strong>Contact:</strong> Please log in to view contact information</p>
            <p><strong>Role:</strong> Guest</p>
          </div>
        </div>
      `}};d.styles=[f.styles,_.styles,m`
    h1 {
      font-family: var(--font-family-display);
      font-size: 2.5rem;
      color: var(--color-primary);
      margin: 0;
      padding-bottom: 1rem;
      border-bottom: 3px solid var(--color-primary-light);
    }

    .host-details {
      margin-bottom: 2rem;
    }

    .host-info {
      margin-top: 1.5rem;
    }

    .host-info p {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .host-info p:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  `];let i=d;n([v()],i.prototype,"src");n([h()],i.prototype,"profile");n([h()],i.prototype,"loading");n([h()],i.prototype,"error");customElements.define("index-element",i);b({"mu-auth":y.Provider,"event-header":p,"index-element":i});p.initializeOnce();

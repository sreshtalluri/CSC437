import{i as g,O as u,r as m,a as f,x as l,n as v,b as h,d as b,c as y}from"./reset.css-DieTGmEc.js";import{c as x,H as p}from"./card.css-p7RGg8cR.js";var _=Object.defineProperty,n=(c,r,e,a)=>{for(var o=void 0,s=c.length-1,t;s>=0;s--)(t=c[s])&&(o=t(r,e,o)||o);return o&&_(r,e,o),o};const d=class d extends g{constructor(){super(...arguments),this.loading=!0,this._authObserver=new u(this,"eplan:auth")}get authorization(){var e;if(!((e=this._user)!=null&&e.authenticated)){console.log("User not authenticated");return}return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(r=>{var e;console.log("Auth state changed:",r),this._user=r.user,(e=this._user)!=null&&e.authenticated&&this.src?this.hydrate(this.src):this.loading=!1})}hydrate(r){var o,s;this.loading=!0,this.error=void 0,console.log("Fetching from:",r),console.log("Auth state:",(o=this._user)!=null&&o.authenticated?"Authenticated":"Not authenticated"),console.log("User:",this._user);const e=(s=this._user)==null?void 0:s.username;if(!e){console.error("No username found"),this.loading=!1;return}const a=this.authorization?{headers:this.authorization}:void 0;console.log("Request headers:",a),fetch("/api/profiles?username="+e,a).then(t=>{if(console.log("Response status:",t.status),console.log("Response headers:",Object.fromEntries(t.headers.entries())),!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>{console.log("Profile data:",t),this.profile=t,this.loading=!1}).catch(t=>{console.error("Error loading profile:",t),this.error=t.message,this.loading=!1})}render(){var r,e,a,o,s,t;return this.loading?l`
        <div class="card host-details">
          <h1>Host Details</h1>
          <div class="host-info">
            <p><strong>Name:</strong> Loading...</p>
            <p><strong>Contact:</strong> Loading...</p>
            <p><strong>Role:</strong> Loading...</p>
          </div>
        </div>
      `:(r=this._user)!=null&&r.authenticated?l`
      <div class="card host-details">
        <h1>Host Details</h1>
        <div class="host-info">
          <p><strong>Name:</strong> ${(e=this.profile)==null?void 0:e.firstName} ${(a=this.profile)==null?void 0:a.lastName}</p>
          <p><strong>Contact:</strong> ${(o=this.profile)==null?void 0:o.email}${(s=this.profile)!=null&&s.phone?` | ${this.profile.phone}`:""}</p>
          <p><strong>Role:</strong> ${(t=this.profile)==null?void 0:t.role}</p>
          <a href="/host-edit.html" class="edit-button">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Host Details
          </a>
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
      `}};d.styles=[m.styles,x.styles,f`
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

    .edit-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 1rem;
    }

    .edit-button:hover {
      background-color: #2c5282;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .edit-button svg {
      width: 20px;
      height: 20px;
    }
  `];let i=d;n([v()],i.prototype,"src");n([h()],i.prototype,"profile");n([h()],i.prototype,"loading");n([h()],i.prototype,"error");customElements.define("index-element",i);b({"mu-auth":y.Provider,"event-header":p,"index-element":i});p.initializeOnce();

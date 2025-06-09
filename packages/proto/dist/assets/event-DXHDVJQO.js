import{i as p,O as g,r as v,a as f,x as d,n as m,b as l,d as b,c as _}from"./reset.css-DieTGmEc.js";import{c as y,H as u}from"./card.css-p7RGg8cR.js";var x=Object.defineProperty,n=(c,s,e,a)=>{for(var r=void 0,o=c.length-1,t;o>=0;o--)(t=c[o])&&(r=t(s,e,r)||r);return r&&x(s,e,r),r};const h=class h extends p{constructor(){super(...arguments),this.loading=!0,this._authObserver=new g(this,"eplan:auth")}get authorization(){var e;if(!((e=this._user)!=null&&e.authenticated)){console.log("User not authenticated");return}return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(s=>{var e;console.log("Auth state changed:",s),this._user=s.user,(e=this._user)!=null&&e.authenticated&&this.src?this.hydrate(this.src):this.loading=!1})}hydrate(s){var r,o;this.loading=!0,this.error=void 0,console.log("Fetching from:",s),console.log("Auth state:",(r=this._user)!=null&&r.authenticated?"Authenticated":"Not authenticated"),console.log("User:",this._user);const e=(o=this._user)==null?void 0:o.username;if(!e){console.error("No username found"),this.loading=!1;return}const a=this.authorization?{headers:this.authorization}:void 0;console.log("Request headers:",a),fetch("/api/profiles?username="+e,a).then(t=>{if(console.log("Response status:",t.status),console.log("Response headers:",Object.fromEntries(t.headers.entries())),!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>{console.log("Profile data:",t),this.profile=t,this.loading=!1}).catch(t=>{console.error("Error loading profile:",t),this.error=t.message,this.loading=!1})}render(){var s,e,a,r,o;return this.loading?d`
        <div class="card-grid">
          <div class="card">
            <h2>Event Information</h2>
            <p><strong>Title:</strong> Loading...</p>
            <p><strong>Date:</strong> Loading...</p>
            <p><strong>Time:</strong> Loading...</p>
          </div>
          
          <div class="card">
            <h2>Description</h2>
            <p>Loading...</p>
          </div>
        </div>
      `:(s=this._user)!=null&&s.authenticated?d`
      <div class="card-grid">
        <div class="card">
          <h2>Event Information</h2>
          <p><strong>Title:</strong> ${(e=this.profile)==null?void 0:e.event_name}</p>
          <p><strong>Date:</strong> ${(a=this.profile)==null?void 0:a.event_date}</p>
          <p><strong>Time:</strong> ${(r=this.profile)==null?void 0:r.event_time}</p>
          <a href="/event-edit.html" class="edit-button">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Event
          </a>
        </div>
        
        <div class="card">
          <h2>Description</h2>
          <p>${(o=this.profile)==null?void 0:o.event_description}</p>
        </div>
      </div>
    `:d`
        <div class="card-grid">
          <div class="card">
            <h2>Event Information</h2>
            <p>Please log in to view event details.</p>
          </div>
        </div>
      `}};h.styles=[v.styles,y.styles,f`
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      align-items: stretch;
      width: 100%;
    }

    h2 {
      font-family: var(--font-family-display);
      color: var(--color-primary);
      font-size: 1.8rem;
      margin: 0 0 1.5rem 0;
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
      margin-top: auto;
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
  `];let i=h;n([m()],i.prototype,"src");n([l()],i.prototype,"profile");n([l()],i.prototype,"loading");n([l()],i.prototype,"error");customElements.define("event-element",i);b({"mu-auth":_.Provider,"event-header":u,"event-element":i});u.initializeOnce();

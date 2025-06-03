import{i as p,O as g,r as f,a as v,x as d,n as m,b as l,d as _,c as y}from"./reset.css-DieTGmEc.js";import{c as b,H as u}from"./card.css-C-aVfMcN.js";var O=Object.defineProperty,n=(c,s,e,a)=>{for(var r=void 0,i=c.length-1,t;i>=0;i--)(t=c[i])&&(r=t(s,e,r)||r);return r&&O(s,e,r),r};const h=class h extends p{constructor(){super(...arguments),this.loading=!0,this._authObserver=new g(this,"eplan:auth")}get authorization(){var e;if(!((e=this._user)!=null&&e.authenticated)){console.log("User not authenticated");return}return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(s=>{var e;console.log("Auth state changed:",s),this._user=s.user,(e=this._user)!=null&&e.authenticated&&this.src?this.hydrate(this.src):this.loading=!1})}hydrate(s){var r,i;this.loading=!0,this.error=void 0,console.log("Fetching from:",s),console.log("Auth state:",(r=this._user)!=null&&r.authenticated?"Authenticated":"Not authenticated"),console.log("User:",this._user);const e=(i=this._user)==null?void 0:i.username;if(!e){console.error("No username found"),this.loading=!1;return}const a=this.authorization?{headers:this.authorization}:void 0;console.log("Request headers:",a),fetch("/api/profiles?username="+e,a).then(t=>{if(console.log("Response status:",t.status),console.log("Response headers:",Object.fromEntries(t.headers.entries())),!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>{console.log("Profile data:",t),this.profile=t,this.loading=!1}).catch(t=>{console.error("Error loading profile:",t),this.error=t.message,this.loading=!1})}render(){var s,e,a,r,i;return this.loading?d`
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
        </div>
        
        <div class="card">
          <h2>Description</h2>
          <p>${(i=this.profile)==null?void 0:i.event_description}</p>
        </div>
      </div>
    `:d`
        <div class="card-grid">
          <div class="card">
            <h2>Event Information</h2>
            <p>Please log in to view event details.</p>
          </div>
        </div>
      `}};h.styles=[f.styles,b.styles,v`
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
  `];let o=h;n([m()],o.prototype,"src");n([l()],o.prototype,"profile");n([l()],o.prototype,"loading");n([l()],o.prototype,"error");customElements.define("event-element",o);_({"mu-auth":y.Provider,"event-header":u,"event-element":o});u.initializeOnce();

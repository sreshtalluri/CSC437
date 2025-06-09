import{i as p,O as c,r as f,a as b,x as l,b as u,n as v,d as g,c as y}from"./reset.css-DieTGmEc.js";import{c as N,H as m}from"./card.css-p7RGg8cR.js";var $=Object.defineProperty,n=(d,o,e,s)=>{for(var t=void 0,i=d.length-1,r;i>=0;i--)(r=d[i])&&(t=r(o,e,t)||t);return t&&$(o,e,t),t};const h=class h extends p{constructor(){super(...arguments),this.loading=!0,this.formData={firstName:"",lastName:"",email:"",phone:"",role:""},this._authObserver=new c(this,"eplan:auth")}get authorization(){var e;if(!((e=this._user)!=null&&e.authenticated)){console.log("User not authenticated");return}return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{var e;this._user=o.user,(e=this._user)!=null&&e.authenticated&&this.src?this.hydrate(this.src):this.loading=!1})}hydrate(o){var t,i;this.loading=!0,this.error=void 0,console.log("Fetching from:",o),console.log("Auth state:",(t=this._user)!=null&&t.authenticated?"Authenticated":"Not authenticated"),console.log("User:",this._user);const e=(i=this._user)==null?void 0:i.username;if(!e){console.error("No username found"),this.loading=!1;return}const s=this.authorization?{headers:this.authorization}:void 0;fetch("/api/profiles?username="+e,s).then(r=>{if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return r.json()}).then(r=>{this.profile=r,this.formData={firstName:r.firstName||"",lastName:r.lastName||"",email:r.email||"",phone:r.phone||"",role:r.role||""},this.loading=!1}).catch(r=>{console.error("Error loading profile:",r),this.error=r.message,this.loading=!1})}handleInput(o){const e=o.target;this.formData={...this.formData,[e.name]:e.value}}async handleSubmit(o){var s;if(o.preventDefault(),!((s=this._user)!=null&&s.username)){this.error="No username found";return}const e=this.authorization?{...this.authorization,"Content-Type":"application/json"}:void 0;try{const t=await fetch("/api/profiles?username="+this._user.username,{method:"PUT",headers:e,body:JSON.stringify(this.formData)});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);window.location.href="/index.html"}catch(t){console.error("Error updating profile:",t),this.error=t instanceof Error?t.message:"Failed to update host details"}}render(){var o;return this.loading?l`<div class="edit-form">Loading...</div>`:(o=this._user)!=null&&o.authenticated?l`
      <div class="edit-form">
        <h2>Edit Host Details</h2>
        ${this.error?l`<p class="error">${this.error}</p>`:""}
        
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              .value=${this.formData.firstName}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              .value=${this.formData.lastName}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              .value=${this.formData.email}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              .value=${this.formData.phone}
              @input=${this.handleInput}
            />
          </div>

          <div class="form-group">
            <label for="role">Role</label>
            <select
              id="role"
              name="role"
              .value=${this.formData.role}
              @input=${this.handleInput}
              required
            >
              <option value="">Select a role</option>
              <option value="Host">Host</option>
              <option value="Co-Host">Co-Host</option>
              <option value="Event Planner">Event Planner</option>
            </select>
          </div>

          <div class="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" @click=${()=>window.location.href="/index.html"}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    `:l`
        <div class="edit-form">
          <p>Please log in to edit host details.</p>
        </div>
      `}};h.styles=[f.styles,N.styles,b`
    .edit-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--color-text);
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-primary-light);
      border-radius: 4px;
      font-size: 1rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button[type="submit"] {
      background-color: var(--color-primary);
      color: white;
    }

    button[type="submit"]:hover {
      background-color: var(--color-primary-dark);
    }

    button[type="button"] {
      background-color: #e0e0e0;
      color: #333;
      border: 1px solid #ccc;
    }

    button[type="button"]:hover {
      background-color: #d0d0d0;
    }
  `];let a=h;n([v()],a.prototype,"src");n([u()],a.prototype,"profile");n([u()],a.prototype,"loading");n([u()],a.prototype,"error");n([u()],a.prototype,"formData");customElements.define("host-edit-element",a);g({"mu-auth":y.Provider,"event-header":m,"host-edit-element":a});m.initializeOnce();

import{i as m,O as p,r as v,a as f,x as d,n as b,b as u,d as g,c as _}from"./reset.css-DieTGmEc.js";import{c as y,H as c}from"./card.css-p7RGg8cR.js";var $=Object.defineProperty,s=(h,o,e,n)=>{for(var t=void 0,a=h.length-1,r;a>=0;a--)(r=h[a])&&(t=r(o,e,t)||t);return t&&$(o,e,t),t};const l=class l extends m{constructor(){super(...arguments),this.loading=!0,this.formData={event_name:"",event_date:"",event_time:"",event_description:""},this._authObserver=new p(this,"eplan:auth")}get authorization(){var e;if(!((e=this._user)!=null&&e.authenticated)){console.log("User not authenticated");return}return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{var e;this._user=o.user,(e=this._user)!=null&&e.authenticated&&this.src?this.hydrate(this.src):this.loading=!1})}hydrate(o){var t,a;this.loading=!0,this.error=void 0,console.log("Fetching from:",o),console.log("Auth state:",(t=this._user)!=null&&t.authenticated?"Authenticated":"Not authenticated"),console.log("User:",this._user);const e=(a=this._user)==null?void 0:a.username;if(!e){console.error("No username found"),this.loading=!1;return}const n=this.authorization?{headers:this.authorization}:void 0;fetch("/api/profiles?username="+e,n).then(r=>{if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return r.json()}).then(r=>{this.profile=r,this.formData={event_name:r.event_name||"",event_date:r.event_date||"",event_time:r.event_time||"",event_description:r.event_description||""},this.loading=!1}).catch(r=>{console.error("Error loading profile:",r),this.error=r.message,this.loading=!1})}handleInput(o){const e=o.target;this.formData={...this.formData,[e.name]:e.value}}async handleSubmit(o){var n;if(o.preventDefault(),!((n=this._user)!=null&&n.username)){this.error="No username found";return}const e=this.authorization?{...this.authorization,"Content-Type":"application/json"}:void 0;try{const t=await fetch("/api/profiles?username="+this._user.username,{method:"PUT",headers:e,body:JSON.stringify(this.formData)});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);window.location.href="/event.html"}catch(t){console.error("Error updating profile:",t),this.error=t instanceof Error?t.message:"Failed to update event"}}render(){var o;return this.loading?d`<div class="edit-form">Loading...</div>`:(o=this._user)!=null&&o.authenticated?d`
      <div class="edit-form">
        <h2>Edit Event Details</h2>
        ${this.error?d`<p class="error">${this.error}</p>`:""}
        
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="event_name">Event Title</label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              .value=${this.formData.event_name}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="event_date">Date</label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              .value=${this.formData.event_date}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="event_time">Time</label>
            <input
              type="time"
              id="event_time"
              name="event_time"
              .value=${this.formData.event_time}
              @input=${this.handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="event_description">Description</label>
            <textarea
              id="event_description"
              name="event_description"
              .value=${this.formData.event_description}
              @input=${this.handleInput}
              required
            ></textarea>
          </div>

          <div class="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" @click=${()=>window.location.href="/event.html"}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    `:d`
        <div class="edit-form">
          <p>Please log in to edit event details.</p>
        </div>
      `}};l.styles=[v.styles,y.styles,f`
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

    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-primary-light);
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea {
      min-height: 150px;
      resize: vertical;
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
      background-color: var(--color-secondary);
      color: white;
    }

    button[type="button"]:hover {
      background-color: var(--color-secondary-dark);
    }
  `];let i=l;s([b()],i.prototype,"src");s([u()],i.prototype,"profile");s([u()],i.prototype,"loading");s([u()],i.prototype,"error");s([u()],i.prototype,"formData");customElements.define("event-edit-element",i);g({"mu-auth":_.Provider,"event-header":c,"event-edit-element":i});c.initializeOnce();

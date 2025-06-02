import{i as u,x as p,r as l,h as f,b,c as m,n as d}from"./reset.css-6vUoClCO.js";var g=Object.defineProperty,n=(c,e,s,i)=>{for(var t=void 0,r=c.length-1,o;r>=0;r--)(o=c[r])&&(t=o(e,s,t)||t);return t&&g(e,s,t),t};const h=class h extends u{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){var e;return(e=this.api)!=null&&e.includes("register")?!!(this.api&&this.formData.username&&this.formData.password&&this.formData.confirmPassword&&this.formData.password===this.formData.confirmPassword):!!(this.api&&this.formData.username&&this.formData.password)}render(){var e;return p`
      <form
        @change=${s=>this.handleChange(s)}
        @submit=${s=>this.handleSubmit(s)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            ${(e=this.api)!=null&&e.includes("register")?"Create Account":"Login"}
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(e){const s=e.target,i=s==null?void 0:s.name,t=s==null?void 0:s.value,r=this.formData;switch(i){case"username":this.formData={...r,username:t};break;case"password":this.formData={...r,password:t};break;case"confirmPassword":this.formData={...r,confirmPassword:t};break}}handleSubmit(e){var s;if(e.preventDefault(),this.canSubmit){const i=(s=this.api)!=null&&s.includes("register")?{username:this.formData.username,password:this.formData.password}:this.formData;fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:r}=t,o=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:r,redirect:this.redirect}]});console.log("dispatching message",o),this.dispatchEvent(o)}).catch(t=>{console.log(t),this.error=t.toString()})}}};h.styles=[l.styles,f.styles,b`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let a=h;n([m()],a.prototype,"formData");n([d()],a.prototype,"api");n([d()],a.prototype,"redirect");n([m()],a.prototype,"error");customElements.define("login-form",a);export{a as L};

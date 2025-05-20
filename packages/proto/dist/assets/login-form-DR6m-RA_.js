import{i as p,x as u,r as l,h as f,b,c as m,n as d}from"./reset.css-6vUoClCO.js";var D=Object.defineProperty,n=(c,a,s,i)=>{for(var t=void 0,r=c.length-1,o;r>=0;r--)(o=c[r])&&(t=o(a,s,t)||t);return t&&D(a,s,t),t};const h=class h extends p{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){var a;return(a=this.api)!=null&&a.includes("register")?!!(this.api&&this.formData.username&&this.formData.password&&this.formData.confirmPassword&&this.formData.password===this.formData.confirmPassword):!!(this.api&&this.formData.username&&this.formData.password)}render(){var a;return u`
      <form
        @change=${s=>this.handleChange(s)}
        @submit=${s=>this.handleSubmit(s)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            ${(a=this.api)!=null&&a.includes("register")?"Create Account":"Login"}
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(a){const s=a.target,i=s==null?void 0:s.name,t=s==null?void 0:s.value,r=this.formData;switch(i){case"username":this.formData={...r,username:t};break;case"password":this.formData={...r,password:t};break;case"confirmPassword":this.formData={...r,confirmPassword:t};break}}handleSubmit(a){var s;if(a.preventDefault(),this.canSubmit){const i=(s=this.api)!=null&&s.includes("register")?{username:this.formData.username,password:this.formData.password}:this.formData;fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:r}=t,o=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:r,redirect:this.redirect}]});console.log("dispatching message",o),this.dispatchEvent(o)}).catch(t=>{console.log(t),this.error=t.toString()})}}};h.styles=[l.styles,f.styles,b`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let e=h;n([m()],e.prototype,"formData");n([d()],e.prototype,"api");n([d()],e.prototype,"redirect");n([m()],e.prototype,"error");export{e as L};

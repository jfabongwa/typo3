/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","jquery","TYPO3/CMS/Core/Ajax/AjaxRequest","TYPO3/CMS/Backend/Notification"],(function(e,t,o,i,s){"use strict";var a;o=__importDefault(o),function(e){e.loginrefresh="t3js-modal-loginrefresh",e.lockedModal="t3js-modal-backendlocked",e.loginFormModal="t3js-modal-backendloginform"}(a||(a={}));class n{constructor(){this.options={modalConfig:{backdrop:"static"}},this.intervalTime=60,this.intervalId=null,this.backendIsLocked=!1,this.isTimingOut=!1,this.$timeoutModal=null,this.$backendLockedModal=null,this.$loginForm=null,this.loginFramesetUrl="",this.logoutUrl="",this.submitForm=e=>{e.preventDefault();const t=this.$loginForm.find("form"),a=t.find("input[name=p_field]"),n=t.find("input[name=userident]"),l=a.val();if(""===l&&""===n.val())return s.error(TYPO3.lang["mess.refresh_login_failed"],TYPO3.lang["mess.refresh_login_emptyPassword"]),void a.focus();l&&(n.val(l),a.val(""));const d={login_status:"login"};o.default.each(t.serializeArray(),(function(e,t){d[t.name]=t.value})),new i(t.attr("action")).post(d).then(async e=>{(await e.resolve()).login.success?this.hideLoginForm():(s.error(TYPO3.lang["mess.refresh_login_failed"],TYPO3.lang["mess.refresh_login_failed_message"]),a.focus())})},this.checkActiveSession=()=>{new i(TYPO3.settings.ajaxUrls.login_timedout).get().then(async e=>{const t=await e.resolve();t.login.locked?this.backendIsLocked||(this.backendIsLocked=!0,this.showBackendLockedModal()):this.backendIsLocked&&(this.backendIsLocked=!1,this.hideBackendLockedModal()),this.backendIsLocked||(t.login.timed_out||t.login.will_time_out)&&(t.login.timed_out?this.showLoginForm():this.showTimeoutModal())})}}initialize(e){"object"==typeof e&&this.applyOptions(e),this.initializeTimeoutModal(),this.initializeBackendLockedModal(),this.initializeLoginForm(),this.startTask()}startTask(){if(null!==this.intervalId)return;let e=1e3*this.intervalTime;this.intervalId=setInterval(this.checkActiveSession,e)}stopTask(){clearInterval(this.intervalId),this.intervalId=null}setIntervalTime(e){this.intervalTime=Math.min(e,86400)}setLogoutUrl(e){this.logoutUrl=e}setLoginFramesetUrl(e){this.loginFramesetUrl=e}showTimeoutModal(){this.isTimingOut=!0,this.$timeoutModal.modal(this.options.modalConfig),this.$timeoutModal.modal("show"),this.fillProgressbar(this.$timeoutModal)}hideTimeoutModal(){this.isTimingOut=!1,this.$timeoutModal.modal("hide")}showBackendLockedModal(){this.$backendLockedModal.modal(this.options.modalConfig),this.$backendLockedModal.modal("show")}hideBackendLockedModal(){this.$backendLockedModal.modal("hide")}showLoginForm(){new i(TYPO3.settings.ajaxUrls.logout).get().then(()=>{TYPO3.configuration.showRefreshLoginPopup?this.showLoginPopup():(this.$loginForm.modal(this.options.modalConfig),this.$loginForm.modal("show"))})}showLoginPopup(){const e=window.open(this.loginFramesetUrl,"relogin_"+Math.random().toString(16).slice(2),"height=450,width=700,status=0,menubar=0,location=1");e&&e.focus()}hideLoginForm(){this.$loginForm.modal("hide")}initializeBackendLockedModal(){this.$backendLockedModal=this.generateModal(a.lockedModal),this.$backendLockedModal.find(".modal-header h4").text(TYPO3.lang["mess.please_wait"]),this.$backendLockedModal.find(".modal-body").append(o.default("<p />").text(TYPO3.lang["mess.be_locked"])),this.$backendLockedModal.find(".modal-footer").remove(),o.default("body").append(this.$backendLockedModal)}initializeTimeoutModal(){this.$timeoutModal=this.generateModal(a.loginrefresh),this.$timeoutModal.addClass("modal-severity-notice"),this.$timeoutModal.find(".modal-header h4").text(TYPO3.lang["mess.login_about_to_expire_title"]),this.$timeoutModal.find(".modal-body").append(o.default("<p />").text(TYPO3.lang["mess.login_about_to_expire"]),o.default("<div />",{class:"progress"}).append(o.default("<div />",{class:"progress-bar progress-bar-warning progress-bar-striped progress-bar-animated",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100"}).append(o.default("<span />",{class:"sr-only"})))),this.$timeoutModal.find(".modal-footer").append(o.default("<button />",{class:"btn btn-default","data-action":"logout"}).text(TYPO3.lang["mess.refresh_login_logout_button"]).on("click",()=>{top.location.href=this.logoutUrl}),o.default("<button />",{class:"btn btn-primary t3js-active","data-action":"refreshSession"}).text(TYPO3.lang["mess.refresh_login_refresh_button"]).on("click",()=>{new i(TYPO3.settings.ajaxUrls.login_refresh).get().then(async e=>{const t=await e.resolve();this.hideTimeoutModal(),t.refresh.success||this.showLoginForm()})})),this.registerDefaultModalEvents(this.$timeoutModal),o.default("body").append(this.$timeoutModal)}initializeLoginForm(){if(TYPO3.configuration.showRefreshLoginPopup)return;this.$loginForm=this.generateModal(a.loginFormModal),this.$loginForm.addClass("modal-notice");let e=String(TYPO3.lang["mess.refresh_login_title"]).replace("%s",TYPO3.configuration.username);this.$loginForm.find(".modal-header h4").text(e),this.$loginForm.find(".modal-body").append(o.default("<p />").text(TYPO3.lang["mess.login_expired"]),o.default("<form />",{id:"beLoginRefresh",method:"POST",action:TYPO3.settings.ajaxUrls.login}).append(o.default("<div />").append(o.default("<input />",{type:"text",name:"username",class:"d-none",value:TYPO3.configuration.username}),o.default("<input />",{type:"hidden",name:"userident",id:"t3-loginrefresh-userident"})),o.default("<div />",{class:"form-group"}).append(o.default("<input />",{type:"password",name:"p_field",autofocus:"autofocus",class:"form-control",placeholder:TYPO3.lang["mess.refresh_login_password"]})))),this.$loginForm.find(".modal-body .d-none").attr("autocomplete","username"),this.$loginForm.find(".modal-body .form-control").attr("autocomplete","current-password"),this.$loginForm.find(".modal-footer").append(o.default("<a />",{href:this.logoutUrl,class:"btn btn-default"}).text(TYPO3.lang["mess.refresh_exit_button"]),o.default("<button />",{type:"submit",class:"btn btn-primary","data-action":"refreshSession"}).text(TYPO3.lang["mess.refresh_login_button"]).on("click",()=>{this.$loginForm.find("form").trigger("submit")})),this.registerDefaultModalEvents(this.$loginForm).on("submit",this.submitForm),o.default("body").append(this.$loginForm)}generateModal(e){return o.default("<div />",{id:e,class:"t3js-modal "+e+" modal modal-type-default modal-severity-notice modal-style-light modal-size-small fade"}).append(o.default("<div />",{class:"modal-dialog"}).append(o.default("<div />",{class:"modal-content"}).append(o.default("<div />",{class:"modal-header"}).append(o.default("<h4 />",{class:"modal-title"})),o.default("<div />",{class:"modal-body"}),o.default("<div />",{class:"modal-footer"}))))}fillProgressbar(e){if(!this.isTimingOut)return;let t=0;const o=e.find(".progress-bar"),i=o.children(".sr-only"),s=setInterval(()=>{const e=t>=100;!this.isTimingOut||e?(clearInterval(s),e&&(this.hideTimeoutModal(),this.showLoginForm()),t=0):t+=1;const a=t+"%";o.css("width",a),i.text(a)},300)}registerDefaultModalEvents(e){return e.on("hidden.bs.modal",()=>{this.startTask()}).on("shown.bs.modal",()=>{this.stopTask(),this.$timeoutModal.find(".modal-footer .t3js-active").first().focus()}),e}applyOptions(e){void 0!==e.intervalTime&&this.setIntervalTime(e.intervalTime),void 0!==e.loginFramesetUrl&&this.setLoginFramesetUrl(e.loginFramesetUrl),void 0!==e.logoutUrl&&this.setLogoutUrl(e.logoutUrl)}}let l;try{window.opener&&window.opener.TYPO3&&window.opener.TYPO3.LoginRefresh&&(l=window.opener.TYPO3.LoginRefresh),parent&&parent.window.TYPO3&&parent.window.TYPO3.LoginRefresh&&(l=parent.window.TYPO3.LoginRefresh),top&&top.TYPO3&&top.TYPO3.LoginRefresh&&(l=top.TYPO3.LoginRefresh)}catch(e){}return l||(l=new n,"undefined"!=typeof TYPO3&&(TYPO3.LoginRefresh=l)),l}));
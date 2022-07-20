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
var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};define(["require","exports","jquery","../AbstractInteractableModule","TYPO3/CMS/Core/Ajax/AjaxRequest","TYPO3/CMS/Core/SecurityUtility","../../Renderable/FlashMessage","../../Renderable/InfoBox","../../Renderable/ProgressBar","../../Renderable/Severity","../../Router","bootstrap"],(function(t,a,e,s,n,i,d,l,o,c,p){"use strict";e=__importDefault(e);class g extends s.AbstractInteractableModule{constructor(){super(...arguments),this.selectorOutputContainer=".t3js-languagePacks-output",this.selectorContentContainer=".t3js-languagePacks-mainContent",this.selectorActivateLanguage=".t3js-languagePacks-activateLanguage",this.selectorActivateLanguageIcon="#t3js-languagePacks-activate-icon",this.selectorAddLanguageToggle=".t3js-languagePacks-addLanguage-toggle",this.selectorLanguageInactive=".t3js-languagePacks-inactive",this.selectorDeactivateLanguage=".t3js-languagePacks-deactivateLanguage",this.selectorDeactivateLanguageIcon="#t3js-languagePacks-deactivate-icon",this.selectorUpdate=".t3js-languagePacks-update",this.selectorLanguageUpdateIcon="#t3js-languagePacks-languageUpdate-icon",this.selectorNotifications=".t3js-languagePacks-notifications",this.activeLanguages=[],this.activeExtensions=[],this.packsUpdateDetails={toHandle:0,handled:0,updated:0,new:0,failed:0},this.notifications=[]}static pluralize(t,a="pack",e="s",s=0){return 1!==t&&1!==s?a+e:a}initialize(t){this.currentModal=t,this.getData(),t.on("click",this.selectorAddLanguageToggle,()=>{t.find(this.selectorContentContainer+" "+this.selectorLanguageInactive).toggle()}),t.on("click",this.selectorActivateLanguage,t=>{const a=e.default(t.target).closest(this.selectorActivateLanguage).data("iso");t.preventDefault(),this.activateLanguage(a)}),t.on("click",this.selectorDeactivateLanguage,t=>{const a=e.default(t.target).closest(this.selectorDeactivateLanguage).data("iso");t.preventDefault(),this.deactivateLanguage(a)}),t.on("click",this.selectorUpdate,t=>{const a=e.default(t.target).closest(this.selectorUpdate).data("iso"),s=e.default(t.target).closest(this.selectorUpdate).data("extension");t.preventDefault(),this.updatePacks(a,s)})}getData(){const t=this.getModalBody();new n(p.getUrl("languagePacksGetData")).get({cache:"no-cache"}).then(async a=>{const s=await a.resolve();if(!0===s.success){this.activeLanguages=s.activeLanguages,this.activeExtensions=s.activeExtensions,t.empty().append(s.html);const a=t.parent().find(this.selectorContentContainer);a.empty(),a.append(this.languageMatrixHtml(s)),a.append(this.extensionMatrixHtml(s)),e.default('[data-bs-toggle="tooltip"]').tooltip({container:a})}else{const t=l.render(c.error,"Something went wrong","");this.addNotification(t)}this.renderNotifications()},a=>{p.handleAjaxError(a,t)})}activateLanguage(t){const a=this.getModalBody(),e=this.findInModal(this.selectorOutputContainer),s=o.render(c.loading,"Loading...","");e.empty().append(s),this.getNotificationBox().empty(),new n(p.getUrl()).post({install:{action:"languagePacksActivateLanguage",token:this.getModuleContent().data("language-packs-activate-language-token"),iso:t}}).then(async t=>{const a=await t.resolve();if(e.empty(),!0===a.success&&Array.isArray(a.status))a.status.forEach(t=>{const a=l.render(t.severity,t.title,t.message);this.addNotification(a)});else{const t=d.render(c.error,"Something went wrong","");this.addNotification(t)}this.getData()},t=>{p.handleAjaxError(t,a)})}deactivateLanguage(t){const a=this.getModalBody(),e=this.findInModal(this.selectorOutputContainer),s=o.render(c.loading,"Loading...","");e.empty().append(s),this.getNotificationBox().empty(),new n(p.getUrl()).post({install:{action:"languagePacksDeactivateLanguage",token:this.getModuleContent().data("language-packs-deactivate-language-token"),iso:t}}).then(async t=>{const a=await t.resolve();if(e.empty(),!0===a.success&&Array.isArray(a.status))a.status.forEach(t=>{const a=l.render(t.severity,t.title,t.message);this.addNotification(a)});else{const t=d.render(c.error,"Something went wrong","");this.addNotification(t)}this.getData()},t=>{p.handleAjaxError(t,a)})}updatePacks(t,a){const s=this.findInModal(this.selectorOutputContainer),i=this.findInModal(this.selectorContentContainer),d=void 0===t?this.activeLanguages:[t];let l=!0,o=this.activeExtensions;void 0!==a&&(o=[a],l=!1),this.packsUpdateDetails={toHandle:d.length*o.length,handled:0,updated:0,new:0,failed:0},s.empty().append(e.default("<div>",{class:"progress"}).append(e.default("<div>",{class:"progress-bar progress-bar-info",role:"progressbar","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,style:"width: 0;"}).append(e.default("<span>",{class:"text-nowrap"}).text("0 of "+this.packsUpdateDetails.toHandle+" language "+g.pluralize(this.packsUpdateDetails.toHandle)+" updated")))),i.empty(),d.forEach(t=>{o.forEach(a=>{this.getNotificationBox().empty(),new n(p.getUrl()).post({install:{action:"languagePacksUpdatePack",token:this.getModuleContent().data("language-packs-update-pack-token"),iso:t,extension:a}}).then(async t=>{const a=await t.resolve();!0===a.success?(this.packsUpdateDetails.handled++,"new"===a.packResult?this.packsUpdateDetails.new++:"update"===a.packResult?this.packsUpdateDetails.updated++:this.packsUpdateDetails.failed++,this.packUpdateDone(l,d)):(this.packsUpdateDetails.handled++,this.packsUpdateDetails.failed++,this.packUpdateDone(l,d))},()=>{this.packsUpdateDetails.handled++,this.packsUpdateDetails.failed++,this.packUpdateDone(l,d)})})})}packUpdateDone(t,a){const e=this.getModalBody(),s=this.findInModal(this.selectorOutputContainer);if(this.packsUpdateDetails.handled===this.packsUpdateDetails.toHandle){const s=l.render(c.ok,"Language packs updated",this.packsUpdateDetails.new+" new language "+g.pluralize(this.packsUpdateDetails.new)+" downloaded, "+this.packsUpdateDetails.updated+" language "+g.pluralize(this.packsUpdateDetails.updated)+" updated, "+this.packsUpdateDetails.failed+" language "+g.pluralize(this.packsUpdateDetails.failed)+" not available");this.addNotification(s),!0===t?new n(p.getUrl()).post({install:{action:"languagePacksUpdateIsoTimes",token:this.getModuleContent().data("language-packs-update-iso-times-token"),isos:a}}).then(async t=>{if(!0===(await t.resolve()).success)this.getData();else{const t=d.render(c.error,"Something went wrong","");this.addNotification(t)}},t=>{p.handleAjaxError(t,e)}):this.getData()}else{const t=this.packsUpdateDetails.handled/this.packsUpdateDetails.toHandle*100;s.find(".progress-bar").css("width",t+"%").attr("aria-valuenow",t).find("span").text(this.packsUpdateDetails.handled+" of "+this.packsUpdateDetails.toHandle+" language "+g.pluralize(this.packsUpdateDetails.handled,"pack","s",this.packsUpdateDetails.toHandle)+" updated")}}languageMatrixHtml(t){const a=this.findInModal(this.selectorActivateLanguageIcon).html(),s=this.findInModal(this.selectorDeactivateLanguageIcon).html(),n=this.findInModal(this.selectorLanguageUpdateIcon).html(),i=e.default("<div>"),d=e.default("<tbody>");return t.languages.forEach(t=>{const i=t.active,l=e.default("<tr>");i?d.append(l.append(e.default("<td>").text(" "+t.name).prepend(e.default("<div />",{class:"btn-group"}).append(e.default("<a>",{class:"btn btn-default t3js-languagePacks-deactivateLanguage","data-iso":t.iso,"data-bs-toggle":"tooltip",title:"Deactivate"}).append(s),e.default("<a>",{class:"btn btn-default t3js-languagePacks-update","data-iso":t.iso,"data-bs-toggle":"tooltip",title:"Download language packs"}).append(n))))):d.append(l.addClass("t3-languagePacks-inactive t3js-languagePacks-inactive").css({display:"none"}).append(e.default("<td>").text(" "+t.name).prepend(e.default("<div />",{class:"btn-group"}).append(e.default("<a>",{class:"btn btn-default t3js-languagePacks-activateLanguage","data-iso":t.iso,"data-bs-toggle":"tooltip",title:"Activate"}).append(a))))),l.append(e.default("<td>").text(t.iso),e.default("<td>").text(t.dependencies.join(", ")),e.default("<td>").text(null===t.lastUpdate?"":t.lastUpdate)),d.append(l)}),i.append(e.default("<h3>").text("Active languages"),e.default("<table>",{class:"table table-striped table-bordered"}).append(e.default("<thead>").append(e.default("<tr>").append(e.default("<th>").append(e.default("<div />",{class:"btn-group"}).append(e.default("<button>",{class:"btn btn-default t3js-languagePacks-addLanguage-toggle",type:"button"}).append(e.default("<span>").append(a)," Add language"),e.default("<button>",{class:"btn btn-default disabled update-all t3js-languagePacks-update",type:"button",disabled:"disabled"}).append(e.default("<span>").append(n)," Update all"))),e.default("<th>").text("Locale"),e.default("<th>").text("Dependencies"),e.default("<th>").text("Last update"))),d)),Array.isArray(this.activeLanguages)&&this.activeLanguages.length&&i.find(".update-all").removeClass("disabled").removeAttr("disabled"),i.html()}extensionMatrixHtml(t){const a=new i,s=this.findInModal(this.selectorLanguageUpdateIcon).html();let n,d="",o=0;const p=e.default("<div>"),g=e.default("<tr>");g.append(e.default("<th>").text("Extension"),e.default("<th>").text("Key")),t.activeLanguages.forEach(t=>{g.append(e.default("<th>").append(e.default("<a>",{class:"btn btn-default t3js-languagePacks-update","data-iso":t,"data-bs-toggle":"tooltip",title:"Download and update all language packs"}).append(e.default("<span>").append(s)," "+t)))});const u=e.default("<tbody>");return t.extensions.forEach(t=>{o++,n=void 0!==t.icon?e.default("<span>").append(e.default("<img>",{style:"max-height: 16px; max-width: 16px;",src:t.icon,alt:t.title}),e.default("<span>").text(" "+t.title)):e.default("<span>").text(t.title);const i=e.default("<tr>");i.append(e.default("<td>").html(n.html()),e.default("<td>").text(t.key)),t.packs.forEach(n=>{const l=e.default("<td>");i.append(l),d=!0!==n.exists?null!==n.lastUpdate?"No language pack available for "+n.iso+" when tried at "+n.lastUpdate+". Click to re-try.":"Language pack not downloaded. Click to download":null===n.lastUpdate?"Downloaded. Click to renew":"Language pack downloaded at "+n.lastUpdate+". Click to renew",l.append(e.default("<a>",{class:"btn btn-default t3js-languagePacks-update","data-extension":t.key,"data-iso":n.iso,"data-bs-toggle":"tooltip",title:a.encodeHtml(d)}).append(s))}),u.append(i)}),p.append(e.default("<h3>").text("Translation status"),e.default("<table>",{class:"table table-striped table-bordered"}).append(e.default("<thead>").append(g),u)),0===o?l.render(c.ok,"Language packs have been found for every installed extension.","To download the latest changes, use the refresh button in the list above."):p.html()}getNotificationBox(){return this.findInModal(this.selectorNotifications)}addNotification(t){this.notifications.push(t)}renderNotifications(){const t=this.getNotificationBox();for(let a of this.notifications)t.append(a);this.notifications=[]}}return new g}));
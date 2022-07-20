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
define(["require","exports","../Enum/Viewport/ScaffoldIdentifier","./AbstractContainer","../Event/TriggerRequest"],(function(t,e,n,o,i){"use strict";class a extends o.AbstractContainer{constructor(t){super(t),this.activeComponentId=""}get parent(){return document.querySelector(n.ScaffoldIdentifierEnum.scaffold)}get container(){return document.querySelector(n.ScaffoldIdentifierEnum.contentNavigation)}get switcher(){return document.querySelector(n.ScaffoldIdentifierEnum.contentNavigationSwitcher)}showComponent(e){const n=this.container;if(this.show(e),e===this.activeComponentId)return;if(""!==this.activeComponentId){let t=n.querySelector("#navigationComponent-"+this.activeComponentId.replace(/[/]/g,"_"));t&&(t.style.display="none")}const o="navigationComponent-"+e.replace(/[/]/g,"_");if(1===n.querySelectorAll('[data-component="'+e+'"]').length)return this.show(e),void(this.activeComponentId=e);t([e],t=>{if("string"==typeof t.navigationComponentName){const i=t.navigationComponentName,a=document.createElement(i);a.setAttribute("id",o),a.classList.add("scaffold-content-navigation-component"),a.dataset.component=e,n.append(a)}else{n.insertAdjacentHTML("beforeend",'<div class="scaffold-content-navigation-component" data-component="'+e+'" id="'+o+'"></div>');Object.values(t)[0].initialize("#"+o)}this.show(e),this.activeComponentId=e})}hide(t){const e=this.parent,n=this.switcher;e.classList.remove("scaffold-content-navigation-expanded"),e.classList.remove("scaffold-content-navigation-available"),t&&n&&(n.style.display="none")}show(t){const e=this.parent,o=this.container,i=this.switcher;if(o.querySelectorAll(n.ScaffoldIdentifierEnum.contentNavigationDataComponent).forEach(t=>t.style.display="none"),void 0!==typeof t){e.classList.add("scaffold-content-navigation-expanded"),e.classList.add("scaffold-content-navigation-available");const n=o.querySelector('[data-component="'+t+'"]');n&&(n.style.display=null)}i&&(i.style.display=null)}setUrl(t,e){const n=this.consumerScope.invoke(new i("typo3.setUrl",e));return n.then(()=>{this.parent.classList.add("scaffold-content-navigation-expanded");const e=this.getIFrameElement();e&&e.setAttribute("src",t)}),n}getUrl(){const t=this.getIFrameElement();return t?t.getAttribute("src"):""}refresh(){const t=this.getIFrameElement();if(t)return t.contentWindow.location.reload()}getIFrameElement(){return this.container.querySelector(n.ScaffoldIdentifierEnum.contentNavigationIframe)}}return a}));
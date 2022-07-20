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
var __decorate=this&&this.__decorate||function(e,t,o,r){var n,l=arguments.length,a=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(l<3?n(a):l>3?n(t,o,a):n(t,o))||a);return l>3&&a&&Object.defineProperty(t,o,a),a};define(["require","exports","lit","lit/decorators","TYPO3/CMS/Backend/Enum/Severity","TYPO3/CMS/Backend/Severity","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Core/lit-helper"],(function(e,t,o,r,n,l,a,s){"use strict";var i;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.formatSelector=".t3js-record-download-format-selector",e.formatOptions=".t3js-record-download-format-option"}(i||(i={}));let c=class extends o.LitElement{constructor(){super(),this.addEventListener("click",e=>{e.preventDefault(),this.showDownloadConfigurationModal()})}render(){return o.html`<slot></slot>`}showDownloadConfigurationModal(){this.url&&a.advanced({content:this.url,title:this.title||"Download records",severity:n.SeverityEnum.notice,size:a.sizes.small,type:a.types.ajax,buttons:[{text:this.close||s.lll("button.close")||"Close",active:!0,btnClass:"btn-default",name:"cancel",trigger:()=>a.dismiss()},{text:this.ok||s.lll("button.ok")||"Download",btnClass:"btn-"+l.getCssClass(n.SeverityEnum.info),name:"download",trigger:()=>{const e=a.currentModal[0].querySelector("form");e&&e.submit(),a.dismiss()}}],ajaxCallback:()=>{const e=a.currentModal[0].querySelector(i.formatSelector),t=a.currentModal[0].querySelectorAll(i.formatOptions);null!==e&&t.length&&e.addEventListener("change",e=>{const o=e.target.value;t.forEach(e=>{e.dataset.formatname!==o?e.classList.add("hide"):e.classList.remove("hide")})})}})}};__decorate([r.property({type:String})],c.prototype,"url",void 0),__decorate([r.property({type:String})],c.prototype,"title",void 0),__decorate([r.property({type:String})],c.prototype,"ok",void 0),__decorate([r.property({type:String})],c.prototype,"close",void 0),c=__decorate([r.customElement("typo3-recordlist-record-download-button")],c)}));
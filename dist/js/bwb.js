/* Packaged with "koop-componentenbibliotheek-wettennl" version: bwb-1.3.4. */
!function(e){function i(){var i=onl.dom.$('[data-set="which-types"]'),t=!1;i&&(t=!0,i.forEach((function(e){e.checked||(t=!1)}))),e("#AlleSoorten").prop("checked",t)}function t(){n("ZBO","ZoekOp_EerstVerantwoordelijke_ZBO","","ss21"),n("Bedrijf","ZoekOp_EerstVerantwoordelijke_PBO","","ss31")}function n(i,t,n,o){var r=e("#"+i).is(":checked"),a=!1;if(!e("#AlleSoorten").is(":checked")&&!r){e("#"+t).val("");var c=document.querySelector("#"+o);if(c)for(var l=c.querySelectorAll(".subselection__summaryitem__remove"),d=0;d<l.length;d++)l[d].click(),a=!0}a&&e("#"+i).is(":checked")&&e("#"+i).prop("checked",!1)}function o(){var i=e(this),t=e("#ZoekOp_TitelAfkorting");0==i.is(":checked")?(t.prop("checked",!1),t.prop("disabled",!0)):t.prop("disabled",!1)}function r(){"3"===e("#ZoekOp_Datumbereik").val()?e("#divEinddatum").show():e("#divEinddatum").hide()}function a(){var i=!0;e("#soortCategorienLijst input:checkbox:checked").each((function(){"Verdrag"!=e(this).prop("id")&&(i=!1)})),i?(!0===e("#ZoekOp_DatumtypeOndertekening").is(":checked")&&e("#ZoekOp_DatumtypeInwerkingtreding").prop("checked",!0),e("#ZoekOp_DatumtypeOndertekening").prop("disabled",!0)):e("#ZoekOp_DatumtypeOndertekening").prop("disabled",!1),c()}function c(){e("#Verdrag").is(":checked")&&e("#ZoekOp_DatumscopeRegeling").is(":checked")?e("#ZoekOp_DatumtypeTotstandkoming").prop("disabled",!1):(e("#ZoekOp_DatumtypeTotstandkoming").prop("checked",!1),e("#ZoekOp_DatumtypeTotstandkoming").prop("disabled",!0),!1===e("#ZoekOp_DatumtypeOndertekening").is(":checked")&&e("#ZoekOp_DatumtypeInwerkingtreding").prop("checked",!0))}function l(){if(e("#ZoekOp_WTI").is(":checked")){var i=document.querySelector("#ss41");if(i)for(var t=i.querySelectorAll(".subselection__summaryitem__remove"),n=0;n<t.length;n++)t[n].click()}}function d(i){var t=i.data("aantevinkencheckboxen");if(""!==t&&!e("#AlleSoorten").is(":checked")){for(var n=!1,o=e("."+t),r=0;r<o.length;r++)if(e(o[r]).is(":checked")){n=!0;break}if(!n)for(r=0;r<o.length;r++)e(o[r]).prop("checked",!0)}var a=i.data("uittevinkencheckboxen");if(""!==a)for(o=e("."+a),r=0;r<o.length;r++)e(o[r]).prop("checked",!1);var c,l=i.data("veldidgeselecteerdeitems"),d=function(i){var t=[];return i.find("input:checked").each((function(){t.push({identifier:this.value,omschrijving:e(this).data("omschrijving")})})),i.find("input:eq(0)").click().click(),t}(i),p=[];for(r=0;(c=d[r])&&r<d.length;r++)p.push(c.identifier);e("#"+l).val(p.join(","))}function p(){e("#ZoekOp_DatumtypeTotstandkoming").is(":checked")?(e("#ZoekOp_DatumscopeArtikel").prop("disabled",!0),e("#ZoekOp_DatumscopeRegeling").prop("checked",!0)):e("#ZoekOp_DatumscopeArtikel").prop("disabled",!1)}function u(){e("#ZoekOp_DatumtypeInwerkingtreding").is(":checked")&&e("#ZoekOp_DatumscopeArtikel").prop("disabled",!1)}function s(){e("#ZoekOp_DatumtypeOndertekening").is(":checked")&&e("#ZoekOp_DatumscopeArtikel").prop("disabled",!1)}function k(){var i=0;e(".regelingsoort").each((function(){e(this).is(":checked")&&i++})),1===i&&e("#Verdrag").is(":checked")?(e("#ZoekOp_ArtikelnummerBijlage").prop("disabled",!0),e("#ZoekOp_ArtikelnummerArtikel").prop("checked",!0)):e("#ZoekOp_ArtikelnummerBijlage").prop("disabled",!1)}e(document).ready((function(){e("#MinR").on("click",(function(){var t=e("#MinR").is(":checked");e("#MinRArchief, #MinROverig").prop("checked",t),i()})),e("#MinRArchief, #MinROverig").on("click",(function(){var t=e("#MinRArchief").is(":checked")&&e("#MinROverig").is(":checked");e("#MinR").prop("checked",t),i()})),r(),c(),a(),e("#ZoekOp_Datumbereik").bind("change",r),e("#ZoekOp_TitelExact").bind("change",o),e("#soortCategorienLijst input:checkbox").bind("change",a),e("#soortCategorienLijst input:checkbox").bind("change",t),e("#soortCategorienLijst .regelingsoort").bind("change",k),e("#ZoekOp_DatumscopeArtikel").bind("change",c),e("#ZoekOp_DatumscopeRegeling").bind("change",c),e("#ZoekOp_WTI").bind("change",l),e("input[type=checkbox]",".modal__content").bind("change",(function(){d(e(this).closest(".modal__content"))})),e(".subselection__trigger",".subselection").bind("click",(function(){d(e(this).prev("div").find(".modal__content"))})),e("#ZoekOp_DatumtypeInwerkingtreding").bind("change",u),e("#ZoekOp_DatumtypeOndertekening").bind("change",s),e("#ZoekOp_DatumtypeTotstandkoming").bind("change",p)}))}(jQuery),function(e){"use strict";function i(){var i=e("#popupvergelijken .btn-vergelijk"),t=e("#popupvergelijken .dlDatum");i.prop("disabled",0===t.length||""===t.val())}function t(i,t){e("#spVergelekenMet").html(t),""!=i&&e("#spVergelekenVan").html(i),e("#pGeenVergelijkingMogelijk, #pKiesVergelijking, #fKiesVergelijking").hide(),e("#pKiesVergelijkingWachten, #LoadMessageCompare, #pKiesVergelijkingWachtenMinuten").show()}var n="";e((function(){e("#popupvergelijken .dlDatum").on("change",i),e("#pKiesVergelijkingWachten, #LoadMessageCompare, #pKiesVergelijkingWachtenMinuten").hide(),e(".popupvergelijken").click((function(i){var t=e(this).data("inwerking");n=e(this).data("hashfragmentid"),""===t?e("#iwtHuidige, #iwtHuidige3").hide():(e("#lblIWTHuidige").html(t),e("#lblIWTHuidige2").html(t),e("#lblIWTHuidige3").html(t),e("#iwtHuidige, #iwtHuidige3").show());e(this).data("bwb-id"),e(this).data("toestand-id"),e(this).data("volgnummer"),e(this).data("label-id");e("#pGeenVergelijkingMogelijk").hide(),e(".dlDatum option").attr("disabled",!1),e("#pKiesVergelijking, #divVersies, .btn-vergelijk").show(),i.preventDefault()})),e("#popupvergelijken .btn-vergelijk").click((function(){return function(){var i,o,r=e("#popupvergelijken .dlDatum option:checked").text(),a=e("#popupvergelijken .dlDatum option:checked").val().split("_"),c=a[0],l=a[1];t("",r),""===(i=function(e){var i=e.indexOf("#");return i>0?e.substring(i+1):""}(e("#hfVergelijkRedirect").val()))&&""!==n&&(i=n),o=MaakVergelijkUrl(c,l,i),e(".btn-vergelijk","#popupvergelijken").hide(),window.location.href=o}(),!1})),i(),e(".wti-compare").click((function(){e("input:checked[name=compare]").length>2?e("#compareLinkValidationMessage").show():e("#compareLinkValidationMessage").hide()})),e("#compareLinkValidationMessage").hide(),e("#compareLink").click((function(i){var n;if(i.preventDefault(),2!==(n=e("input:checked[name=compare]")).length)return e("#compareLinkValidationMessage").show(),!1;var o=n[0].value,r=n[1].value,a=e("#hiddenBWBId").val(),c="/"+a+"/"+function(e,i,t){return e.replace(/(\d{2})-(\d{2})-(\d{4})/,"$3-$2-$1")+t+i}(o,"0","/")+"?VergelijkMet="+a+"%3fg%3d"+function(e){return e.replace(/(\d{2})-(\d{2})-(\d{4})/,"$3-$2-$1")}(r);t(o,r),location.href=c})),e(".sluitPopup","#popupvergelijken").click((function(i){i.preventDefault(),"function"==typeof stop?window.stop():document.execCommand("Stop"),e("#pKiesVergelijkingWachten, #LoadMessageCompare, #pKiesVergelijkingWachtenMinuten").hide(),e(".btn-vergelijk","#popupvergelijken").show(),e("#pKiesVergelijking, #fKiesVergelijking").show(),sluitPopup()}))}))}(jQuery),function(e){"use strict";e((function(){e(".popuplidorelaties").click((function(i){var t,n=e(this).data("juriconnectverwijzing"),o=e(this).parent("li").data("aantal-relaties");e("#popuplidorelaties h2").html("Externe relaties ("+escape(o)+")"),t='<div class="alert alert--warning">Er is een fout opgetreden bij het ophalen van de relaties in LiDO.</div>',e.get(endpointLidoRelaties+"?juriconnect-id="+escape(n)+"&_="+(new Date).getTime(),(function(i){""!==i?e("#popuplidorelaties #divLidorelaties").html(i):e("#popuplidorelaties #divLidorelaties").html(t)}),"html").fail((function(){e("#popuplidorelaties #divLidorelaties").html(t)})),i.preventDefault()}))}))}(jQuery),function(e){"use strict";function i(){var i=e(window).scrollTop(),t=e(window).height();setTimeout((function(){e("li.action--relations[data-juriconnectid]").each((function(){var n=e(this);setTimeout((function(){var o=n.data("top");if(0===o||o||(o=n.closest("ul").offset().top,n.data("top",o)),!(n.data("laden")||o<i-300)){if(i+t+300<o)return!1;n.data("laden",!0),e.get(endpointLidoAantallen+"?bwbngid="+escape(n.data("bwbngid")),(function(e){parseInt(e,10)>0&&(n.prepend(e),n.data("aantal-relaties",e),n.removeClass("visually-hidden")),n.removeClass("aantallen-lido-onbekend"),n.addClass("aantallen-lido")}))}}),1)}))}),10)}e(window).on("load scroll resize",(function(){i()}))}(jQuery),function(e){"use strict";var i=e("#hfApplicatieURL").val(),t=e("h1","#regeling").text();e((function(){e("div.well--linkContainer").on("click",(function(){event.preventDefault(),function(e){var i,t,n;"undefined"!=typeof getSelection&&void 0!==document.createRange?((i=document.createRange()).selectNodeContents(e),(t=window.getSelection()).removeAllRanges(),t.addRange(i)):void 0!==document.selection&&void 0!==document.body.createTextRange&&((n=document.body.createTextRange()).moveToElementText(e),n.select())}(this)})),e(".popuppermanentelink").click((function(n){var o,r,a,c,l=e(this).data("juriconnectverwijzing"),d=e(this).closest(".article__header--law").children("h3,h4").first().text(),p=d.indexOf(". ");r=o=-1!=p?d.slice(0,p):e.trim(d);var u=e(this).data("inwerking");u&&e("#pmlink-inwerking").html(u),1==e("#geselecteerdeonderdelen").length&&(t=1==e(this).closest(".fragment-header").length?e(this).closest(".fragment-header").find("h1").text():e(this).closest(".wetgeving").parent("div").prev(".fragment-header").find("h1").text()),o!=t&&(r+=" "+t),(a=e("#divCiteertitel")).text(""),c=e(document.createElement("a")),a.append(c),c.attr("href",i+"/"+l).html(r),e("#divUrl").text(i+"/"+l),e("#divJuriconnectverwijzing").text(l),e("#aLinktoolurl").attr("href",e(this).data("linktoolurl")),n.preventDefault()}))}))}(jQuery),function(e){"use strict";e((function(){e(".popupafdrukken").click((function(i){e("#hfPrintOnderdeelID").val(e(this).attr("href")),i.preventDefault()}))}))}(jQuery),function(e){"use strict";e((function(){$(".popupexporteren").click((function(i){var t=$(this).attr("href"),n=e(".pexporteren-heading");$("#hfRegelingOnderdelenActie").val(""),$("#hfExportOnderdeelID").val(t),$("#popupexporterenafbeeldingen").hide(),/^\/([a-z0-9]+)\/([0-9|_|-]*)\/([0-9]+)(\/?)$/i.test(t)?($("#popupexporterenafbeeldingen").show(),$(".exporteren-xml-optie").show(),n&&$(".pexporteren-heading").text($(".pexporteren-heading").attr("data-label-regeling"))):($("#rbZonderAfbeeldingen").prop("checked",!0),$(".exporteren-xml-optie input:checked").length&&$('#popupexporteren input[id$="rbRtf"]').prop("checked",!0),$(".exporteren-xml-optie input:checked").prop("checked",!1),$(".exporteren-xml-optie").hide(),n&&$(".pexporteren-heading").text($(".pexporteren-heading").attr("data-label-regelingsonderdeel"))),i.preventDefault()}))}))}(jQuery),function(e){"use strict";function i(){var i=e("#rbInclusief").is(":checked");e("#hfRegelingOnderdelenActie").val(i?"afdrukken informatie":"afdrukken")}e((function(){e(".popupafdrukken").click((function(t){e("#hfRegelingOnderdelenAfdrukken").val(e(this).data("onderdeelids")),t.preventDefault(),i()})),e("#rbExclusief, #rbInclusief").on("click",(function(){i()}))}))}(jQuery),function(e){"use strict";e("#Unfoldall").on("click",(function(i){i.preventDefault(),e('ul.treeview button[data-handler="toggle-fold"][aria-expanded="false"]').click()})),e("#Foldall").on("click",(function(i){i.preventDefault(),e('ul.treeview button[data-handler="toggle-fold"][aria-expanded="true"]').click()}))}(jQuery),function(e){"use strict";e('.result--list div.collapsible__header a[data-handler="toggle-collapsible"]').on("click",(function(){var i=e("#"+e(this).attr("aria-controls")),t=e(this).closest(".collapsible").parent(),n=t.find("> input.locationurl").val()||location.href;setTimeout((function(){i.is(":visible")&&!i.html().trim()&&e(i).load(endpointResultaatOnderdelen,{regelingID:t.find("> input.data-id").val(),ref:n})}),0)})),e("#unmarkallAnchor").on("click",(function(i){i.preventDefault(),e("div.collapsible__content input:checkbox").each((function(){e(this).prop("checked",!1)}))}))}(jQuery),function(e){"use strict";e((function(){e("#cbNietMeerTonen").click((function(){setTimeout((function(){createCookie("eurlex-popup-niet-tonen",e("#cbNietMeerTonen").is(":checked"))}),100)}))}))}(jQuery);
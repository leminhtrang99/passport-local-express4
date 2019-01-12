function getUrlVars() {
    var vars = [], hash;
    var hashes = decodeURIComponent(window.location.href).slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
jQuery(document).ready(function() {
    var lists = {
        africa: ["AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "DJ", "DZ", "EG", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "KE", "LR", "LS", "LY", "MA", "MU", "MG", "ML", "MR", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SD", "SL", "SN", "SO", "SS", "SZ", "TD", "TG", "TN", "TZ", "UG", "ZA", "ZM", "ZW", "EH", "KM", "GO", "JU", "SH", "ST", "YT", "BV", "CV", "SC"],
        asia: ["AE", "AF", "BD", "BN", "IO", "BT", "CN", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MO", "MM", "MN", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SY", "TH", "TJ", "TL", "TM", "TW", "UZ", "VN", "YE", "HK", "MV", "BH", "SG"],
        europe: ["AL", "AM", "AT", "AZ", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "JE", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "MD", "ME", "MK", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SJ", "SK", "TR", "UA", "RU", "VA", "MT", "MC", "XK", "LI", "IM", "GI", "FO", "AD", "AX", "GG", "SM"],
        northAmerica: ["BS", "BZ", "CA", "CR", "CU", "DO", "GL", "GT", "HN", "HT", "JM", "MX", "NI", "PA", "PR", "SV", "US", "AG", "AW", "BB", "BL", "GD", "KN", "LC", "MQ", "TC", "VG", "AI", "BM", "DM", "PM", "GP", "KY", "MF", "MS", "SX", "TT", "VC", "VI", "BQ", "CW"],
        southAmerica: ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE", "GS"],
        oceania: ["AS", "AU", "UM-FQ", "CC", "CX", "FJ", "FM", "GU", "HM", "UM-HQ", "UM-DQ", "UM-JQ", "KI", "MH", "UM-MQ", "MP", "NC", "NF", "NR", "NU", "NZ", "PG", "PW", "SB", "TF", "TK", "TL", "TO", "TV", "VU", "UM-WQ", "WF", "WS", "CK", "PF", "PN"]
    };
    var names = {};
    map = AmCharts.makeChart("mapdiv", {
        type: "map",
        theme: "animated",
        addClassNames: true,
        zoomDuration: 0,
        backgroundColor: "#535364",
        backgroundAlpha: 1,
        projection: "mercator",
        zoomControl: {
            zoomControlEnabled: true
        },
        dataProvider: {
            map: "worldHigh",
            getAreasFromMap: true,
            areas: []
        },
        areasSettings: {
            autoZoom: false,
            selectable: true
        },
    });
    map.addListener("clickMapObject", function(event) {
        var CC = event.mapObject.id;
        var checkbox = jQuery("input[value=" + CC + "]");
        var anchor = jQuery(checkbox).parents(".tab-pane").attr("id");
        var mapObject = event.mapObject;
        map.selectedObject = map.dataProvider;
        mapObject.showAsSelected = !mapObject.showAsSelected;
        map.returnInitialColor(mapObject);
        checkbox[0].checked = event.mapObject.showAsSelected;
        jQuery(".section-map-list .nav-tabs [data-anchor=" + anchor + "]").tab("show");
        map.updateSettings(true);
    });
    
    map.updateSelection = function(gatherOnly) {
        var areas = [];
        jQuery(".section-map-list input:checked").each(function() {
            var CC = this.value;
            areas.push({
                id: CC,
                showAsSelected: true
            });
        });
        if (!gatherOnly) {
            map.dataProvider.areas = areas;
            map.validateData();
            map.updateHash();
        }
        return areas;
    }
    map.updateHash = function() {
        var inputs = jQuery(".section-map-list input:checked");
        location.hash = jQuery.map(inputs, function(input) {
            return input.value
        }).join(",");
    }
    map.updateSettings = function(fromMap) {
        map.backgroundColor = jQuery('.section-map-settings input[name=backgroundColor]').val();
        map.areasSettings.color = jQuery('.section-map-settings input[name=color]').val();
        map.areasSettings.colorSolid = jQuery('.section-map-settings input[name=colorSolid]').val();
        map.areasSettings.selectedColor = jQuery('.section-map-settings input[name=colorSolid]').val();
        map.areasSettings.outlineColor = jQuery('.section-map-settings input[name=outlineColor]').val();
        map.areasSettings.rollOverColor = jQuery('.section-map-settings input[name=rollOverColor]').val();
        map.areasSettings.rollOverOutlineColor = jQuery('.section-map-settings input[name=rollOverOutlineColor]').val();
        map.zoomControl.zoomControlEnabled = jQuery('.section-map-settings input[name=zoomControl]')[0].checked;
        if (map.AmExport) {
            map.AmExport.imageBackgroundColor = map.backgroundColor;
        }
        jQuery(".section-map-panel").css({
            backgroundColor: map.backgroundColor
        });
        var tpl = jQuery("#template").html();
        var ta = jQuery("textarea");
        var areas = map.updateSelection(true);
        tpl = tpl.replace(/\[\[width\]\]/g, jQuery('.section-map-settings input[name=width]').val());
        tpl = tpl.replace(/\[\[height\]\]/g, jQuery('.section-map-settings input[name=height]').val());
        tpl = tpl.replace(/\[\[backgroundColor\]\]/g, map.backgroundColor);
        tpl = tpl.replace(/\[\[color\]\]/g, map.areasSettings.color);
        tpl = tpl.replace(/\[\[colorSolid\]\]/g, map.areasSettings.colorSolid);
        tpl = tpl.replace(/\[\[outlineColor\]\]/g, map.areasSettings.outlineColor);
        tpl = tpl.replace(/\[\[rollOverColor\]\]/g, map.areasSettings.rollOverColor);
        tpl = tpl.replace(/\[\[rollOverOutlineColor\]\]/g, map.areasSettings.rollOverOutlineColor);
        tpl = tpl.replace(/\[\[zoom\]\]/g, map.zoomControl.zoomControlEnabled ? 'true' : 'false');
        tpl = tpl.replace(/\[\[areas\]\]/g, JSON.stringify(areas, undefined, "\t"));
        tpl = tpl.replace(/\[\[projection\]\]/g, map.projection);
        ta.html(tpl);
        map.updateHash();
        if (!fromMap) {
            map.validateNow();
        }
        AmCharts.MEDIA_ID = undefined;
    }
    jQuery(AmCharts.maps.worldHigh.svg.g.path).each(function() {
        if (this.title !== undefined)
            names[this.id] = this.title.replace(/x28/g, '(').replace(/x29/g, ')').replace(/x2C/g, ',');
    });
    jQuery(".section-map-list").each(function() {
        jQuery.map(lists, function(list, name) {
            var tbody = jQuery("#" + name).find("tbody");
            list.sort(function(x, y) {
                var a = names[x].toLowerCase()
                  , b = names[y].toLowerCase();
                if (a > b)
                    return 1;
                if (a < b)
                    return -1;
                return 0;
            });
            jQuery(list).each(function() {
                var CC = String(this);
                var row = jQuery("<tr>").appendTo(tbody);
                var col = jQuery("<td>").appendTo(row);
                var div = jQuery("<div>").appendTo(col).addClass("checkbox");
                var label = jQuery("<label>").appendTo(div).text(names[CC]);
                var checkbox = jQuery("<input>").attr({
                    type: "checkbox",
                    name: "map",
                    value: this
                }).prependTo(label);
                row.on("click", function() {
                    checkbox.trigger("click");
                    map.updateSelection();
                    map.updateSettings();
                });
            });
        });
    });
    jQuery(".input-colorpicker").each(function() {
        var addon = jQuery(this).find(".input-group-addon");
        var input = jQuery(this).find("input");
        jQuery(addon).ColorPicker({
            color: jQuery(input).attr('value'),
            onShow: function(colpkr) {
                jQuery(colpkr).fadeIn(250);
                return false;
            },
            onHide: function(colpkr) {
                jQuery(colpkr).fadeOut(250);
                return false;
            },
            onChange: function(hsb, hex, rgb) {
                hex = ('#' + hex).toUpperCase();
                if (input.attr("name") == "backgroundColor") {
                    jQuery(".section-map-panel").css({
                        backgroundColor: hex
                    });
                }
                input.val(hex);
                addon.css({
                    backgroundColor: hex
                });
                clearTimeout(map.timer);
                map.timer = setTimeout(function() {
                    map.updateSettings();
                    if (input.attr("name") == "color") {
                        map.updateSelection();
                    }
                }, 100);
            }
        });
    });
    jQuery(".section-map-settings input").on("change", function() {
        var input = jQuery(this);
        var prev = jQuery(this).prev();
        var value = jQuery(this).val();
        if (jQuery(prev).hasClass("input-group-addon")) {
            jQuery(prev).css({
                backgroundColor: value
            });
        } else {}
        clearTimeout(map.timer);
        map.timer = setTimeout(function() {
            map.updateSettings();
            if (input.attr("name") == "color") {
                map.updateSelection();
            }
        }, 100);
    });
    jQuery(".btn-settings-reset").on("click", function(e) {
        jQuery(".section-map-list input").prop("checked", false);
        jQuery(".section-map-settings input").each(function() {
            jQuery(this).val(jQuery(this).attr("placeholder")).trigger("change");
        });
        map.updateSelection();
        e.preventDefault();
    });
    if (location.hash || getUrlVars()["cc"]) {
        var areas = (getUrlVars()["cc"] ? getUrlVars()["cc"] : location.hash).replace("#", "").split(",");
        jQuery(areas).each(function() {
            jQuery(".section-map-list input[value=" + this + "]").prop("checked", true);
        });
        map.updateSelection();
    }
    map.updateSettings();
    ZeroClipboard.config({
        moviePath: './static/vendor/zeroclipboard/ZeroClipboard.swf',
        hoverClass: 'hover',
        activeClass: 'active'
    });
    new ZeroClipboard(jQuery('.btn-copypasta')).on('copy', function(e) {
        jQuery(e.relatedTarget).addClass("focus");
        setTimeout(function() {
            jQuery(e.relatedTarget).removeClass("focus");
        }, 300);
    });
    function updateShare(btn, popup) {
        var popupURL = "";
        var SOCIAL_TITLE = "Visited Countries";
        var SOCIAL_SUMMARY = ""
        var SOCIAL_URL = "http://www.amcharts.com/visited_countries/?";
        var SOCIAL_ID = AmCharts.MEDIA_ID;
        var SOCIAL_PARAMS = {
            i: SOCIAL_ID
        };
        var SOCIAL_IMAGE = "";
        var x = jQuery('.section-map-list input:checked').length;
        var tot = jQuery('.section-map-list input').length;
        var x_name = x == 1 ? 'country' : 'countries';
        var percent = Math.round((x / tot) * 1000) / 10;
        SOCIAL_IMAGE = SOCIAL_URL + "static/share/" + SOCIAL_ID + ".png";
        SOCIAL_SUMMARY = 'I visited ' + x + ' ' + x_name + ' out of ' + tot + '. That\'s ' + percent + '% of all countries in the world!\n\nBuild your own free Visited Countries map like this and share on [[network]] or add as interactive widget to your website.';
        if (jQuery(btn).hasClass("btn-facebook")) {
            SOCIAL_SUMMARY = SOCIAL_SUMMARY.replace("[[network]]", "Facebook");
            SOCIAL_PARAMS.cc = location.hash.slice(1);
            SOCIAL_URL += jQuery.param(SOCIAL_PARAMS);
            shareURL = "https://www.facebook.com/sharer/sharer.php?";
            sharePARAMS = {
                s: 100,
                p: {
                    url: SOCIAL_URL
                }
            }
        } else if (jQuery(btn).hasClass("btn-twitter")) {
            SOCIAL_SUMMARY = 'I visited ' + x + ' ' + x_name + ' out of ' + tot + '. That\'s ' + percent + '% of all countries in the world!';
            SOCIAL_URL = SOCIAL_URL.replace("?", "") + location.hash;
            shareURL = "https://twitter.com/intent/tweet?";
            sharePARAMS = {
                url: SOCIAL_URL,
                text: SOCIAL_SUMMARY
            }
        } else if (jQuery(btn).hasClass("btn-google-plus")) {
            SOCIAL_SUMMARY = SOCIAL_SUMMARY.replace("[[network]]", "Google");
            SOCIAL_PARAMS.cc = location.hash.slice(1);
            SOCIAL_URL += jQuery.param(SOCIAL_PARAMS);
            shareURL = "https://plus.google.com/share?";
            sharePARAMS = {
                url: SOCIAL_URL
            }
        } else if (jQuery(btn).hasClass("btn-tumblr")) {
            SOCIAL_SUMMARY = SOCIAL_SUMMARY.replace("[[network]]", "Tumblr");
            SOCIAL_URL = SOCIAL_URL.replace("?", "") + location.hash;
            shareURL = "https://www.tumblr.com/share/link/?";
            sharePARAMS = {
                url: SOCIAL_URL,
                title: SOCIAL_TITLE,
                description: SOCIAL_SUMMARY
            }
        } else if (jQuery(btn).hasClass("btn-linkedin")) {
            SOCIAL_SUMMARY = SOCIAL_SUMMARY.replace("[[network]]", "Linkedin");
            SOCIAL_PARAMS.cc = location.hash.slice(1);
            SOCIAL_URL += jQuery.param(SOCIAL_PARAMS);
            shareURL = "https://www.linkedin.com/shareArticle?";
            sharePARAMS = {
                url: SOCIAL_URL,
                title: SOCIAL_TITLE,
                summary: SOCIAL_SUMMARY,
                source: SOCIAL_URL,
                mini: true
            }
        } else if (jQuery(btn).hasClass("btn-pinterest")) {
            SOCIAL_SUMMARY = SOCIAL_SUMMARY.replace("[[network]]", "Pinterest");
            SOCIAL_PARAMS.cc = location.hash.slice(1);
            SOCIAL_URL += jQuery.param(SOCIAL_PARAMS);
            shareURL = "https://www.pinterest.com/pin/create/button/?";
            sharePARAMS = {
                url: SOCIAL_URL,
                title: SOCIAL_TITLE,
                media: SOCIAL_IMAGE,
                description: SOCIAL_SUMMARY
            }
        } else if (jQuery(btn).hasClass("btn-reddit")) {
            SOCIAL_SUMMARY = SOCIAL_SUMMARY.replace("[[network]]", "Reddit");
            SOCIAL_URL = SOCIAL_URL.replace("?", "") + location.hash;
            shareURL = "https://www.reddit.com/submit?";
            sharePARAMS = {
                url: SOCIAL_URL,
                title: SOCIAL_TITLE,
                media: SOCIAL_IMAGE,
                text: SOCIAL_SUMMARY
            }
        }
        popup.location.href = shareURL + jQuery.param(sharePARAMS);
    }
    function createShare(btn, popup) {
        var ame, title, zoomControl = jQuery('.section-map-settings input[name=zoomControl]')[0].checked;
        if (zoomControl) {
            map.zoomControl.zoomControlEnabled = false;
            map.validateNow();
        }
        var title = jQuery(btn).find("span");
        jQuery(".btn-share").addClass("disabled");
        title.data("title", title.text()).text("Hold on...");
        setTimeout(function() {
            map["export"].capture({}, function() {
                this.toPNG({}, function(datastring) {
                    if (zoomControl) {
                        map.zoomControl.zoomControlEnabled = true;
                        map.validateNow();
                    }
                    if (datastring) {
                        jQuery.ajax({
                            url: './save.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                _rnd: Number(new Date()),
                                data: datastring
                            },
                            complete: function(transport) {
                                var response = transport.responseJSON;
                                jQuery(".btn-share").removeClass("disabled");
                                title.text(title.data("title"));
                                if (response.id) {
                                    AmCharts.MEDIA_ID = response.id;
                                    updateShare(btn, popup);
                                } else {
                                    alert(response.error || "Something went wrong. Try again later or contact amCharts. Sorry!");
                                }
                            }
                        });
                    }
                });
            });
        }, 100);
    }
    jQuery(".btn-share").on("click", function(e) {
        var popup = window.open("about:blank", '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');
        if (AmCharts.MEDIA_ID) {
            updateShare(this, popup);
        } else {
            createShare(this, popup);
        }
        e.preventDefault();
    });
    jQuery("#index_cards").on("mouseenter", function() {
        jQuery("#card-3").removeClass("hover");
    }).on("mouseleave", function() {
        jQuery("#card-3").addClass("hover");
    });
    var resizeTimer = 0;
    jQuery(window).on("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (jQuery(window).width() <= 480) {
                jQuery(".form-control").addClass("input-lg");
            } else {
                jQuery(".form-control").removeClass("input-lg");
            }
        }, 100);
    });
    jQuery(".amcharts-menu-projection").removeClass("hidden");
    jQuery(".amcharts-menu-projection .icon").on("click", function() {
        var projection = jQuery(this).attr("value");
        jQuery(".export-main").attr("class", "export-main icon-" + projection);
        map.setProjection(projection);
        map.updateSettings(true);
    });
});

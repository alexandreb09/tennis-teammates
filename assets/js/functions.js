"use strict";

const feather = require('feather-icons');

//Set environment variable (Used for development and demo)
/* 
    Possible values:
    1. development
    2. customization
*/

let env = "";

//Theme colors to be used from JS
let themeColors = {
    primary: "#671cc9",
    primaryMedium: "#d4b3ff",
    primaryLight: "#f4edfd",
    secondary: "#ff227d",
    accent: "#797bf2",
    success: "#06d6a0",
    info: "#039BE5",
    warning: "#faae42",
    danger: "#FF7273",
    purple: "#8269B2",
    blue: "#37C3FF",
    green: "#93E088",
    yellow: "#FFD66E",
    orange: "#FFA981",
    lightText: "#a2a5b9",
    fadeGrey: "#ededed",
};

//Switch Layouts (DEMO ONLY)
function switchLayouts() {
    let url = window.location.pathname;
    let newUrl = "";

    let urlPrefix = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("-"));
    urlPrefix = urlPrefix.substr(0, urlPrefix.indexOf("-"));

    $(".layout-switcher").on("click", function () {
        if (urlPrefix == "admin") {
            newUrl = url.replace("admin", "webapp");
        } else {
            newUrl = url.replace("webapp", "admin");
        }
        window.location.href = newUrl;
    });
}

//Change demo images
function changeDemoImages() {
    $("*[data-demo-src]").each(function () {
        let newSrc = $(this).attr("data-demo-src");
        $(this).attr("src", newSrc);
    });

    $("*[data-demo-background]").each(function () {
        let newBg = $(this).attr("data-demo-background");
        $(this).attr("data-background", newBg);
    });

    $("*[data-demo-href]").each(function () {
        let newHref = $(this).attr("data-demo-href");
        $(this).attr("href", newHref);
    });
}

//Init attribute background images
function initBgImages() {
    $(".has-background-image").each(function () {
        let bgImage = $(this).attr("data-background");
        if (bgImage !== undefined) {
            $(this).css("background-image", "url(" + bgImage + ")");
        }
    });
}

//Pageloader
function initPageLoader() {
    if ($(".pageloader").length) {
        $(".pageloader").toggleClass("is-active");

        $(window).on("load", function () {
            let pageloaderTimeout = setTimeout(function () {
                $(".pageloader").toggleClass("is-active");
                $(".infraloader").toggleClass("is-active");
                clearTimeout(pageloaderTimeout);
                setTimeout(function () {
                    $(".rounded-hero").addClass("is-active");
                }, 350);
            }, 700);
        });
    }
}

//Set Active Links
function setActivelink() {
    let activePage = window.location.href;
    $(".sidebar-panel .inner ul li a, .sidebar-block ul li a").each(
        function () {
            let linkPage = this.href;

            if (activePage === linkPage) {
                $(this).closest("li").addClass("is-active");
                $(this).closest(".has-children").find("ul").slideToggle();
                $(this).closest(".has-children").addClass("active");
            }
        }
    );

    $(".main-sidebar .sidebar-inner ul li a").each(function () {
        let linkPage = this.href;

        if (activePage === linkPage) {
            $(this).closest("li").find("a").addClass("is-selected");
        }
    });

    $(".webapp-subnavbar-inner .center ul li a").each(function () {
        let linkPage = this.href;

        if (activePage === linkPage) {
            $(this).closest("li").addClass("is-active");
            $(this)
                .closest(".tab-content")
                .addClass("is-active")
                .siblings(".tab-content")
                .removeClass("is-active");
            let tabId = $(this).closest(".tab-content").attr("id");
            $(this)
                .closest(".webapp-subnavbar-inner")
                .find(".tabs ul li")
                .removeClass("is-active");
            $("[data-tab=" + tabId + "]").addClass("is-active");
        }
    });
}

function onShowHideNavbar() {
    let $body = $("body");
    const sidebar = $(this).attr("data-sidebar");

    if ($(this).hasClass('push-block')) {
        $('.nav-trigger .menu-toggle .icon-box-toggle').toggleClass("active");
        $('#sidebar-block').toggleClass('main-sidebar is-float is-active sidebar-block is-bordered');
        $('#sidebar-inner').toggleClass('sidebar-inner sidebar-block-inner pt-6');
        $("#sidebar-block ul a span.text").toggle();
        $('#sidebar-inner ul').toggleClass('icon-menu');
        $('#sidebar-inner ul a').toggleClass('single-link');
        $("#sidebar-block span svg").toggleClass("feather feather-activity sidebar-svg feather-grid");

        $('.sidebar-block-footer, .sidebar-block-header').toggle();

        $('.view-wrapper').toggleClass('view-wrapper-full is-pushed-block');
        $body.toggleClass('opened');

        if ($(this).hasClass('messages-push')) {
            $('.view-wrapper').toggleClass('is-pushed-messages');
            $('.collapsed-messaging').toggleClass('is-active');
            $body.toggleClass('is-chat-side-collapsed');
        }
    }
}
//Main Sidebar
function initSidebar() {
    $(".huro-hamburger").on("click", onShowHideNavbar);

    //Close sidebar
    $(".panel-close").on("click", function () {
        $(this).closest(".sidebar-panel").removeClass("is-active");
        $(".huro-hamburger .icon-box-toggle").removeClass("active");
        if ($(".main-sidebar").hasClass("is-bordered")) {
            $(".main-sidebar").removeClass("is-bordered");
        } else {
            $(".main-sidebar").addClass("is-bordered");
        }
        $("body").toggleClass("opened");
    });

    //Sidebar links default behaviour
    $(".main-sidebar ul li a").on("click", function () {
        $(".main-sidebar ul li a").removeClass("is-selected");
        $(this).addClass("is-selected");
    });

    $(window).on("scroll", function () {
        let height = $(window).scrollTop();
        if (height > 80) {
            $(".circular-menu").addClass("is-active");
        } else {
            $(".circular-menu").removeClass("is-active active");
        }
    });
}

//Close sidebar
function closeSidebarPanel() {
    $(".sidebar-panel.is-active").removeClass("is-active");
    // $(".huro-hamburger .icon-box-toggle").removeClass("active");
    $(".view-wrapper").removeClass("is-pushed-full");
    if ($(".main-sidebar").hasClass("is-bordered")) {
        $(".main-sidebar").removeClass("is-bordered");
    } else {
        $(".main-sidebar").addClass("is-bordered");
    }
    $("body").toggleClass("opened");
}

//Collapsible submenu items
function initCollapsibleMenu() {
    $(".has-children .parent-link").on("click", function (e) {
        e.preventDefault();
        if (!$(this).closest(".has-children").hasClass("active")) {
            $(".sidebar-panel .has-children ul, .sidebar-block .has-children ul").slideUp();
            $(this).closest(".has-children").find("ul").slideToggle();
            $(".sidebar-panel .has-children, .sidebar-block .has-children").removeClass("active");
            $(this).closest(".has-children").addClass("active");
        } else {
            $(this).closest(".has-children").find("ul").slideToggle();
            $(".sidebar-panel li, .sidebar-block li").removeClass("active");
        }
    });
}

//Mobile Navbar
function initMobileNavbar() {
    $(window).on("scroll", function () {
        let height = $(window).scrollTop();
        if (height > 65) {
            $(".mobile-navbar").removeClass("no-shadow");
        } else {
            $(".mobile-navbar").addClass("no-shadow");
        }
    });
}

//Mobile Navbar Hamburger
function initMobileNavbarHamburger() {
    if ($(".navbar-burger").length) {
        $(".navbar-burger").on("click", onShowHideNavbar);
        $(".navbar-burger").on("click", function (){
            $(this).toggleClass('is-active');
        });
        // $(".navbar-burger").on("click", function () {
        //     $(this).toggleClass("is-active");
        //     if ($(".mobile-main-sidebar").hasClass("is-active")) {
        //         $(".mobile-main-sidebar").removeClass("is-active");
        //     } else {
        //         $(".mobile-main-sidebar").addClass("is-active");
        //     }
        // });
    }
}

//Init Sidebar on page load
function openSidebar() {
    if ($('.main-sidebar').length) {
        $('.nav-trigger .menu-toggle .icon-box-toggle').toggleClass('active');
        $('.sidebar-panel').addClass('is-active');
        $('.view-wrapper').addClass('is-pushed-full');
        $('body').addClass('opened');
        $('.main-sidebar').addClass('is-bordered');
    }

    if ($('.sidebar-block').length) {
        $('.nav-trigger .menu-toggle .icon-box-toggle').toggleClass('active');
        $('.sidebar-block').addClass('is-active');
        $('.view-wrapper').addClass('is-pushed-block');
        $('body').addClass('opened');
        $('.sidebar-block').addClass('is-bordered');
    }
}

//Stuck form header
function initStuckHeader() {
    if ($(".stuck-header").length) {
        $(window).on("scroll", function () {
            let height = $(window).scrollTop();
            if (height > 80) {
                $(".stuck-header").addClass("is-stuck");
            } else {
                $(".stuck-header").removeClass("is-stuck");
            }
        });
    }
}

//Navbar Dropdowns
function initNavbarDropdowns() {
    $(".has-dropdown").on("click", function () {
        $(".has-dropdown").removeClass("is-active");
        $(this).addClass("is-active");
    });

    $(document).on("click", function (e) {
        let target = e.target;
        if (
            !$(target).is(".has-dropdown .navbar-link") &&
            !$(target).parents().is(".has-dropdown")
        ) {
            $(".has-dropdown").removeClass("is-active");
        }
    });
}

//Regular Dropdowns
function initDropdowns() {
    $(".dropdown-trigger").on("click", function () {
        $(".dropdown").removeClass("is-active");
        $(this).addClass("is-active");
    });

    $(document).on("click", function (e) {
        let target = e.target;
        if (
            !$(target).is(".dropdown img, .kill-drop") &&
            !$(target).parents().is(".dropdown")
        ) {
            $(".dropdown").removeClass("is-active");
        }
        if ($(target).is(".kill-drop")) {
            $(".dropdown").removeClass("is-active");
        }
    });
}

//Mobile Dropdowns
function initMobileDropdowns() {
    $(".has-dropdown.is-mobile").on("click", function () {
        $(this).find(".navbar-link").toggleClass("is-active");
        $(this).find(".mobile-dropdown").slideToggle();
    });
}

//Adjust dropdowns
function adjustDropdowns() {
    $(".dropdown:not(.user-dropdown):not(.profile-dropdown)").each(function () {
        let $this = $(this);

        if ($(this).offset().top + $(this).height() >= $(window).height() - 250) {
            $($this).addClass("is-up");
        } else {
            $($this).removeClass("is-up");
        }
    });

    $(window).on("scroll", function () {
        $(".dropdown:not(.user-dropdown):not(.profile-dropdown)").each(function () {
            let $this = $(this);

            if ($(this).offset().top + $(this).height() >= $(window).height() - 250) {
                $($this).addClass("is-up");
            } else {
                $($this).removeClass("is-up");
            }
        });
    });
}

//Launch an alert dialog
function initConfirm(
    title,
    message,
    maximizable,
    closableByDimmer,
    okLabel,
    cancelLabel,
    callback
) {
    alertify
        .confirm("confirm")
        .set({
            transition: "fade",
            title: title,
            message: message,
            movable: false,
            maximizable: maximizable,
            closableByDimmer: closableByDimmer,
            labels: {
                ok: okLabel,
                cancel: cancelLabel,
            },
            reverseButtons: true,
            onok: callback,
        })
        .show();
}

//Chosen Selects
function initChosenSelects() {
    if ($(".chosen-select-no-single").length) {
        let config = {
            ".chosen-select-no-single": {
                disable_search_threshold: 100,
                width: "100%",
            },
        };
        for (let selector in config) {
            if (config.hasOwnProperty(selector)) {
                $(selector).chosen(config[selector]);
            }
        }
    }
}

//Tabs
function initTabs() {
    $(".tabs-inner .tabs li, .vertical-tabs-wrapper .tabs li").on(
        "click",
        function () {
            let tab_id = $(this).attr("data-tab");

            //$(this).closest('.tabs-wrapper').find('> .tabs-inner > .tabs > li.is-active').removeClass('is-active');
            //$(this).addClass('is-active');

            $(this).siblings("li").removeClass("is-active");
            $(this).addClass("is-active");

            $(this)
                .closest(".tabs-wrapper, .vertical-tabs-wrapper")
                .find(".tab-content")
                .removeClass("is-active");
            $("#" + tab_id).addClass("is-active");
        }
    );

    /*$('.tabs-wrapper.is-slider .tabs a').on('click', function () {
          $(this).closest('.tabs-wrapper').find('.tab-naver').toggleClass('is-active');
      })*/
}

//H Select
function initHSelect() {
    $(".h-select").on("click", function () {
        $(this).toggleClass("is-active");
    });

    $(document).click(function (e) {
        let target = e.target;
        if (!$(target).is(".h-select") && !$(target).parents().is(".control")) {
            $(".h-select").removeClass("is-active");
        }
    });

    $(".h-select input").on("change", function () {
        let selectedValue = $(this).siblings(".option-meta").find("span").text();
        $(this).closest(".h-select").find(".select-box span").html(selectedValue);
    });
}

//Combo Box
function initComboBox() {
    $(".is-combo .combo-box").on("click", function () {
        $(this).toggleClass("is-active");
    });

    $(".combo-box .box-dropdown li").on("click", function (e) {
        let target = e.target;
        //Get selected item data
        let itemIconClass = $(this).find(".item-icon i").attr("class");
        let itemIcon = $(this).find(".item-icon i");
        let itemSvgIcon = $(this).find(".item-icon").html();
        let itemName = $(this).find(".item-name").text();
        let iconTemplate = '<i class="' + itemIconClass + '"></i>';
        let template = "";

        console.log(itemSvgIcon);

        if (
            !$(target).is(".box-dropdown li, body") &&
            !$(target).parents().is(".box-dropdown")
        ) {
            $(".box-dropdown").removeClass("is-active");
        }
        if ($(target).is("body")) {
            $(".box-dropdown").removeClass("is-active");
        }

        //Handle dropdown item active state toggle
        $(this).siblings("li.is-active").removeClass("is-active");
        $(this).addClass("is-active");
        //Update combo box selected value
        if (itemIcon.length) {
            $(this).closest(".combo-box").find(".combo-item i").remove();
            $(this).closest(".combo-box").find(".combo-item svg").remove();
            $(this).closest(".combo-box").find(".combo-item").prepend(iconTemplate);
            $(this)
                .closest(".combo-box")
                .find(".combo-item .selected-item")
                .text(itemName);
        } else {
            $(this).closest(".combo-box").find(".combo-item i").remove();
            $(this).closest(".combo-box").find(".combo-item").prepend(itemSvgIcon);
            $(this)
                .closest(".combo-box")
                .find(".combo-item .selected-item")
                .text(itemName);
        }

        if ($(this).hasClass("data-push")) {
            let deleteIcon = feather.icons.x.toSvg();
            template = `
            <div class="added-spec">
                <i class="${itemIconClass}"></i>
                <div class="spec-name">${itemName}</div>
                <div class="remove-spec">
                    ${deleteIcon}
                </div>
            </div>
            `;
            $.when($("#quick-specs").append(template)).then(function () {
                //Make the spec boxes expandable when the title is clicked
                $("#quick-specs .added-spec .remove-spec").on("click", function () {
                    $(this).closest(".added-spec").remove();
                });
            });
        }
    });
}

//Image Combo Box
function initImageComboBox() {
    $(".is-combo .image-combo-box").on("click", function () {
        $(this).toggleClass("is-active");
    });

    $(".image-combo-box .box-dropdown li").on("click", function (e) {
        let target = e.target;
        //Get selected item data
        let itemPic = $(this).find(".item-icon img").attr("src");
        let itemName = $(this).find(".item-name").text();

        if (
            !$(target).is(".box-dropdown li, body") &&
            !$(target).parents().is(".box-dropdown")
        ) {
            $(".box-dropdown").removeClass("is-active");
        }
        if ($(target).is("body")) {
            $(".box-dropdown").removeClass("is-active");
        }

        //Handle dropdown item active state toggle
        $(this).siblings("li.is-active").removeClass("is-active");
        $(this).addClass("is-active");
        //Update combo box selected value
        $(this)
            .closest(".image-combo-box")
            .find(".combo-item img")
            .attr("src", itemPic);
        $(this)
            .closest(".image-combo-box")
            .find(".combo-item .selected-item")
            .text(itemName);
    });
}

//User combo Box
function initUserComboBox() {
    $(".is-combo .user-combo-box").on("click", function () {
        $(this).toggleClass("is-active");
    });

    $(".user-combo-box .box-dropdown li").on("click", function (e) {
        let target = e.target;
        //Get selected item data
        let itemPic = $(this).find(".item-icon .avatar").attr("src");
        let itemBadge = $(this).find(".item-icon .badge").attr("src");
        let itemName = $(this).find(".item-name").text();

        if (
            !$(target).is(".box-dropdown li, body") &&
            !$(target).parents().is(".box-dropdown")
        ) {
            $(".box-dropdown").removeClass("is-active");
        }
        if ($(target).is("body")) {
            $(".box-dropdown").removeClass("is-active");
        }

        //Handle dropdown item active state toggle
        $(this).siblings("li.is-active").removeClass("is-active");
        $(this).addClass("is-active");
        //Update combo box selected value
        $(this)
            .closest(".user-combo-box")
            .find(".combo-item .avatar")
            .attr("src", itemPic);
        $(this)
            .closest(".user-combo-box")
            .find(".combo-item .badge")
            .attr("src", itemBadge);
        $(this)
            .closest(".user-combo-box")
            .find(".combo-item .selected-item")
            .text(itemName);
    });
}

//Stacked Combo Box
function initStackedComboBox() {
    $(".is-combo .stacked-combo-box").on("click", function () {
        $(this).toggleClass("is-active");
    });

    $(".stacked-combo-box .box-dropdown li").on("click", function (e) {
        let target = e.target;
        //Get selected item data
        let itemPic = $(this).find(".item-icon img").attr("src");
        let itemName = $(this).find(".item-name").text();
        let itemRef = $(this).attr("data-skill");
        let initialText = "Select one or more skills";

        let skillTemplate = `
            <img id="${itemRef}" class="is-stacked" src="${itemPic}">
        `;

        if (
            !$(target).is(".box-dropdown li, body") &&
            !$(target).parents().is(".box-dropdown")
        ) {
            $(".box-dropdown").removeClass("is-active");
        }
        if ($(target).is("body")) {
            $(".box-dropdown").removeClass("is-active");
        }

        //Handle dropdown item active state toggle
        $(this).toggleClass("is-active");
        console.log(skillTemplate);

        if ($(".stacked-combo-box li.is-active").length == 0) {
            $("#" + itemRef).remove();
            $("#skill-placeholder").removeClass("is-hidden");
            $(this)
                .closest(".stacked-combo-box")
                .find(".selected-item")
                .text(initialText);
        } else {
            $("#skill-placeholder").addClass("is-hidden");
            $(this).closest(".stacked-combo-box").find(".selected-item").text("");
            if ($("#" + itemRef).length) {
                $("#" + itemRef).remove();
            } else {
                $(this)
                    .closest(".stacked-combo-box")
                    .find(".combo-item")
                    .prepend(skillTemplate);
            }
        }
    });
}

//Big Combo Box
function initBigComboBox() {
    $(".big-combo-box").on("click", function () {
        $(this).toggleClass("is-active");
    });

    $(".big-combo-box .box-dropdown li").on("click", function (e) {
        let target = e.target;
        //Get selected item data
        let itemIcon = $(this).find(".item-icon i").attr("class");
        let itemName = $(this).find(".item-name span:first-child").text();
        let itemDesc = $(this).find(".item-name span:nth-child(2)").text();

        if (
            !$(target).is(".box-dropdown li, body") &&
            !$(target).parents().is(".box-dropdown")
        ) {
            $(".box-dropdown").removeClass("is-active");
        }
        if ($(target).is("body")) {
            $(".box-dropdown").removeClass("is-active");
        }

        //Handle dropdown item active state toggle
        $(this).siblings("li.is-active").removeClass("is-active");
        $(this).addClass("is-active");
        //Update combo box selected value
        $(this)
            .closest(".big-combo-box")
            .find(".combo-item i")
            .attr("class", itemIcon);
        $(this)
            .closest(".big-combo-box")
            .find(".combo-item .selected-item")
            .text(itemName);
        $(this)
            .closest(".big-combo-box")
            .find(".combo-item .selected-desc")
            .text(itemDesc);
    });
}

//Accordion
function initAccordion() {
    let $accor = $(".accordion");
    $accor.each(function () {
        $(this).toggleClass("ui-accordion ui-widget ui-helper-reset");
        $(this)
            .find("h3")
            .addClass(
                "ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all"
            );
        $(this)
            .find("div")
            .addClass(
                "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
            );
        $(this).find("div").hide();
    });
    let $trigger = $accor.find("h3");
    $trigger.on("click", function (e) {
        let location = $(this).parent();
        if ($(this).next().is(":hidden")) {
            let $triggerloc = $("h3", location);
            $triggerloc
                .removeClass("ui-accordion-header-active ui-state-active ui-corner-top")
                .next()
                .slideUp(300);
            $triggerloc.find("span").removeClass("ui-accordion-icon-active");
            $(this).find("span").addClass("ui-accordion-icon-active");
            $(this)
                .addClass("ui-accordion-header-active ui-state-active ui-corner-top")
                .next()
                .slideDown(300);
        }
        e.preventDefault();
    });
    $(".toggle-container").hide();
    $(".trigger, .trigger.opened").on("click", function (a) {
        $(this).toggleClass("active");
        a.preventDefault();
    });
    $(".trigger").on("click", function () {
        $(this).next(".toggle-container").slideToggle(300);
    });
    $(".trigger.opened").addClass("active").next(".toggle-container").show();
}

//Animated Modals
function initAnimatedModals() {
    if ($(".modal-trigger").length) {
        //main variable
        let modalID;

        //Triggering a modal
        $(".modal-trigger").on("click", function () {
            modalID = $(this).attr("data-modal");
            $("#" + modalID).toggleClass("is-active");
            $("#" + modalID + " .modal-background").toggleClass("scaleInCircle");
            $("#" + modalID + " .modal-content").toggleClass("scaleIn");
            $("#" + modalID + " .modal-close").toggleClass("is-hidden");
            //Prevent body from scrolling when scrolling inside modal
            setTimeout(function () {
                $("body").addClass("is-fixed");
            }, 700);
        });

        //Closing a modal
        $(".modal-close, .modal-dismiss").on("click", function () {
            $("#" + modalID + " .modal-background").toggleClass("scaleInCircle");
            $("#" + modalID + " .modal-content").toggleClass("scaleIn");
            $("#" + modalID + " .modal-close").toggleClass("is-hidden");
            //Restore native body scroll

            $("body").removeClass("is-fixed");

            setTimeout(function () {
                $(".modal.is-active").removeClass("is-active");
            }, 500);
        });
    }
}

//Regular Modals
function initHModals() {
    let modalID;
    if ($(".h-modal-trigger").length) {
        $(".h-modal-trigger").on("click", function () {
            modalID = $(this).attr("data-modal");
            $("#" + modalID).toggleClass("is-active");
        });

        $(".h-modal-close").on("click", function () {
            $(this).closest(".modal").removeClass("is-active");
        });
    }
}

//Right Panels
function initPanels() {
    let panelId;
    if ($(".right-panel-trigger").length) {
        $(".right-panel-trigger").on("click", function () {
            panelId = $(this).attr("data-panel");
            $("#" + panelId).addClass("is-active");

            if (panelId == "search-panel") {
                $(".right-panel .search-input").focus();
            }
        });

        $(".panel-overlay, .right-panel .close-panel").on("click", function () {
            $(this).closest(".right-panel-wrapper").removeClass("is-active");
        });
    }
}

//Scroll to top
function scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//Small Text Tip
function initSmallTextTip() {
    $(".has-small-text-tip").on("mouseenter", function () {
        let elementWidth = $(this).find(".text-tip-text").width();
        if (elementWidth >= 250) {
            let elementText = $(this).find(".text-tip-text").text();
            let tooltipTemplate = `
                <div class="text-tooltip scaleInTooltip">
                    <div class="tooltip-content">
                        Some tooltip content
                    </div>
                </div>
            `;
            $.when($(this).append(tooltipTemplate)).then(function () {
                $(this).find(".text-tooltip .tooltip-content").html(elementText);
            });
        }
    });
    $(".has-small-text-tip").on("mouseleave", function () {
        $(this).find(".text-tooltip").remove();
    });
}

//Text Tip
function initTextTip() {
    $(".has-text-tip").on("mouseenter", function () {
        let elementWidth = $(this).find(".text-tip-text").width();
        if (elementWidth >= 380) {
            let elementText = $(this).find(".text-tip-text").text();
            let tooltipTemplate = `
                <div class="text-tooltip scaleInTooltip">
                    <div class="tooltip-content">
                        Some tooltip content
                    </div>
                </div>
            `;
            $.when($(this).append(tooltipTemplate)).then(function () {
                $(this).find(".text-tooltip .tooltip-content").html(elementText);
            });
        }
    });
    $(".has-text-tip").on("mouseleave", function () {
        $(this).find(".text-tooltip").remove();
    });
}

//Medium Text Tip
function initMediumTextTip() {
    $(".has-medium-text-tip").on("mouseenter", function () {
        let elementWidth = $(this).find(".text-tip-text").width();
        if (elementWidth >= 345) {
            let elementText = $(this).find(".text-tip-text").text();
            let tooltipTemplate = `
                <div class="text-tooltip scaleInTooltip">
                    <div class="tooltip-content">
                        Some tooltip content
                    </div>
                </div>
            `;
            $.when($(this).append(tooltipTemplate)).then(function () {
                $(this).find(".text-tooltip .tooltip-content").html(elementText);
            });
        }
    });
    $(".has-medium-text-tip").on("mouseleave", function () {
        $(this).find(".text-tooltip").remove();
    });
}

//Toast
function launchToast(title, message, position, timeout) {
    iziToast.show({
        class: "h-toast",
        icon: icon,
        title: title,
        message: message,
        titleColor: "#fff",
        messageColor: "#fff",
        iconColor: "#fff",
        backgroundColor: "#5d4394",
        progressBarColor: "#444F60",
        position: position,
        transitionIn: "fadeInUp",
        close: false,
        timeout: timeout,
        zindex: 99999,
    });
}

//Get Theme
function setThemeToLocalStorage(value) {
    window.localStorage.setItem("theme", value);
    if (value === "dark") {
        $("body").addClass("is-dark");
    } else {
        $("body").removeClass("is-dark");
    }
}

//Dark Mode
function initDarkMode() {
    let theme = window.localStorage.getItem("theme");

    if (!$(".landing-page-wrapper").length) {
        if (theme != null && theme != undefined) {
            setThemeToLocalStorage(theme);

            if (theme === "dark") {
                $(".dark-mode input").prop("checked", false);
            }

            $(document).trigger("themeChange", theme);
        }
    }

    $(".dark-mode input").on("change", function () {
        if ($(this).prop("checked") === true) {
            $("html, body").removeClass("is-dark");
            $(".theme-image").each(function () {
                let imageUrl = $(this).attr("data-light");
                $(this).attr("src", imageUrl);
            });
            setThemeToLocalStorage("light");
            $(document).trigger("themeChange", "light");
        } else {
            $("html, body").addClass("is-dark");
            $(".theme-image").each(function () {
                let imageUrl = $(this).attr("data-dark");
                $(this).attr("src", imageUrl);
            });
            setThemeToLocalStorage("dark");
            $(document).trigger("themeChange", "dark");
        }
    });
}

//Animated chackboxes
function initAnimatedCheckboxes() {
    $(".animated-checkbox input").each(function () {
        let $this = $(this);
        if ($(this).closest(".animated-checkbox").hasClass("is-checked")) {
            $(this).closest(".animated-checkbox").addClass("is-checked");
            $this
                .closest(".animated-checkbox")
                .find(".shadow-circle")
                .addClass("is-opaque");
            setTimeout(function () {
                $this.closest(".animated-checkbox").removeClass("is-unchecked");
            }, 150);
        } else {
            $(this)
                .closest(".animated-checkbox")
                .addClass("is-unchecked")
                .removeClass("is-checked");
            setTimeout(function () {
                $this
                    .closest(".animated-checkbox")
                    .find(".shadow-circle")
                    .removeClass("is-opaque");
            }, 150);
        }
    });
    $(".animated-checkbox input").on("change", function () {
        let $this = $(this);
        if ($(this).closest(".animated-checkbox").hasClass("is-checked")) {
            $(this)
                .closest(".animated-checkbox")
                .addClass("is-unchecked")
                .removeClass("is-checked");
            setTimeout(function () {
                $this
                    .closest(".animated-checkbox")
                    .find(".shadow-circle")
                    .removeClass("is-opaque");
            }, 150);
        } else {
            $(this).closest(".animated-checkbox").addClass("is-checked");
            $this
                .closest(".animated-checkbox")
                .find(".shadow-circle")
                .addClass("is-opaque");
            setTimeout(function () {
                $this.closest(".animated-checkbox").removeClass("is-unchecked");
            }, 150);
        }
    });
}

//Init single textfilter
function initTextFilter() {
    if ($(".textFilter-input").length) {
        (function () {
            let defaultText = $(".textFilter-input").val();

            $(".textFilter-input")
                .focus(function () {
                    if ($(this).val() === defaultText) $(this).val("");
                })
                .blur(function () {
                    if ($(this).val() === "") $(this).val(defaultText);
                })
                .keyup(function () {
                    let patterns = $(this).val().toLowerCase().split(" ");
                    if (!patterns.length) return;
                    $(".textFilter-target")
                        .hide()
                        .filter(function () {
                            let matchText = $(this)
                                .find(".textFilter-match")
                                .text()
                                .toLowerCase();
                            for (let i = 0; i < patterns.length; i++)
                                if (matchText.indexOf(patterns[i]) === -1) return false;
                            return true;
                        })
                        .show();
                });
        })();
    }
}

//Init reusable search filter used in layout views
function initCustomTextFilter() {
    if ($(".custom-text-filter").length) {
        $(".custom-text-filter").each(function () {
            let filterTarget = $(this).attr("data-filter-target");
            let defaultText = $(this).val();

            $(this)
                .focus(function (e) {
                    if ($(this).val() === defaultText) $(this).val("");
                })
                .blur(function (e) {
                    if ($(this).val() === "") $(this).val(defaultText);
                })
                .keyup(function (e) {
                    let patterns = $(this).val().toLowerCase().split(" ");
                    if (!patterns.length) return;
                    $(filterTarget)
                        .hide()
                        .filter(function () {
                            let matchText = $(this)
                                .find("*[data-filter-match]")
                                .text()
                                .toLowerCase();
                            for (let i = 0; i < patterns.length; i++)
                                if (matchText.indexOf(patterns[i]) === -1) return false;
                            return true;
                        })
                        .show();
                    let items = $(filterTarget + ":visible").length;

                    if (items === 0) {
                        $("*[data-filter-hide]").addClass("is-hidden");
                        $(".custom-text-filter-placeholder").removeClass("is-hidden");
                    } else {
                        $(".custom-text-filter-placeholder").addClass("is-hidden");
                        $("*[data-filter-hide]").removeClass("is-hidden");
                    }
                });
        });
    }
}

//Custom Plyr Players
function initPlayers() {
    if ($(".video-player").length) {
        if (env === "development") {
            $("[data-demo-poster]").each(function () {
                let poster = $(this).attr("data-demo-poster");
                if (poster !== undefined) {
                    $(this).attr("data-poster", poster);
                }
            });
            const players = Array.from(
                document.querySelectorAll(".bulkit-player")
            ).map((p) => new Plyr(p));
        } else {
            const players = Array.from(
                document.querySelectorAll(".bulkit-player")
            ).map((p) => new Plyr(p));
        }
    }
}

//Flex Table
function initAdvancedFlexTable() {
    if ($("#advanced-flex-table").length) {
        $(".flex-table .flex-table-header .is-checkbox input").on(
            "change",
            function () {
                if ($(this).prop("checked") === false) {
                    $(".flex-table .flex-table-item .is-checkbox input").prop(
                        "checked",
                        false
                    );
                } else {
                    $(".flex-table .flex-table-item .is-checkbox input").prop(
                        "checked",
                        true
                    );
                }
            }
        );
    }
}

//Accordion
function initSingleAccordion() {
    $(".single-accordion .accordion-header").on("click", function () {
        if ($(this).closest(".single-accordion").hasClass("is-exclusive")) {
            if ($(this).hasClass("is-active")) {
                $(this).removeClass("is-active").next(".accordion-content").slideUp();
            } else {
                $(this)
                    .closest(".single-accordion")
                    .find(".accordion-header")
                    .removeClass("is-active");
                $(this)
                    .closest(".single-accordion")
                    .find(".accordion-content")
                    .slideUp();
                $(this)
                    .toggleClass("is-active")
                    .next(".accordion-content")
                    .slideToggle();
            }
        } else {
            $(this).toggleClass("is-active").next(".accordion-content").slideToggle();
        }
    });
}

//Collapse
function initCollapse() {
    $(".collapse .collapse-header").on("click", function () {
        $(this)
            .closest(".collapse")
            .toggleClass("is-active")
            .find(".collapse-content")
            .slideToggle("fast");
    });
}

//Back to top
function initBackToTop() {
    let pxShow = 600;
    let scrollSpeed = 500;
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= pxShow) {
            $("#backtotop").addClass("visible");
        } else {
            $("#backtotop").removeClass("visible");
        }
    });
    $("#backtotop a").on("click", function () {
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            scrollSpeed
        );
        return false;
    });
}

//Fake json search demo
function initSearch() {
    $("#webapp-navbar-search-empty").on("click", function () {
        $(".search-input").val("");
        $(".search-results").removeClass("is-active");
    });

    $(".search-input").each(function () {
        $(this).on("keyup", function () {
            let $container = $(this).closest(".control");
            let searchQuery = $(this).val();
            if (searchQuery.length > 0) {
                $("#webapp-navbar-search-empty").removeClass("is-hidden");
            } else {
                $("#webapp-navbar-search-empty").addClass("is-hidden");
            }
            let expression = new RegExp(searchQuery, "i");
            $.getJSON("assets/data/search.json", function (data) {
                $container
                    .find(
                        ".search-results .search-result, .search-results .placeholder-wrap"
                    )
                    .remove();
                $.each(data, function (key, value) {
                    if (
                        value.name.search(expression) != -1 ||
                        value.position.search(expression) != -1
                    ) {
                        if (value.pic != null) {
                            let template = `
                                    <a class="search-result">
                                        <div class="h-avatar is-small">
                                            <img class="${value.type === "user" ? "avatar" : "article"}" src="${value.pic}" alt="">
                                        </div>
                                        <div class="meta">
                                            <span>${value.name}</span>
                                            <span>${value.position}</span>
                                        </div>
                                    </a>
                                `;
                            $container.find(".search-results").append(template);
                        } else {
                            let classes = ["is-danger",
                                "is-info",
                                "is-primary",
                                "is-success",
                                "is-warning",
                                "is-h-purple",
                                "is-h-blue",
                                "is-h-green",
                                "is-h-orange",
                                "is-h-red",
                                "is-h-green"];
                            let length = classes.length;
                            let randomClass = classes[Math.floor(Math.random() * length)];

                            let template = `
                                    <a class="search-result">
                                        <div class="h-avatar is-small">
                                            <span class="avatar is-fake ${randomClass}">
                                                <span>${value.initials}</span>
                                            </span>
                                        </div>
                                        <div class="meta">
                                            <span>${value.name}</span>
                                            <span>${value.position}</span>
                                        </div>
                                    </a>
                                `;

                            $container.find(".search-results").append(template);
                        }
                    }
                });

                if ($(".search-result").length === 0) {
                    let placeholder = `
                            <div class="placeholder-wrap">
                                <div class="placeholder-content has-text-centered">
                                    <img class="light-image" src="assets/img/illustrations/placeholders/search-4.svg" alt="" />
                                    <img class="dark-image" src="assets/img/illustrations/placeholders/search-4-dark.svg" alt="" />
                                    <h3 class="dark-inverted">No Matching Results</h3>
                                    <p>Sorry, we couldn't find any matching records. Please try different search terms.</p>
                                </div>
                            </div>
                        `;

                    $container.find(".search-results").append(placeholder);
                }
            });

            if (searchQuery === "") {
                $container.find(".search-results").removeClass("is-active");
            } else {
                $container.find(".search-results").addClass("is-active");
            }
        });
    });
}

//Customize Datatable
function customizeDatatable() {
    $(".datatable-filter-cell")
        .find(".input")
        .wrap("<div class='control has-icon'></div>");
    let searchIcon = `
        <div class="form-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
    `;
    $(".datatable-filter-cell").find(".control.has-icon").append(searchIcon);

    $(".datatable-filter-cell")
        .find("select")
        .wrap(
            "<div class='field'><div class='control has-icons-left'><div class='select'></div></div></div>"
        );
    let selectIcon = `
        <div class="icon is-small is-left">
            <i class="lnil lnil-menu-circle"></i>
        </div>
    `;
    $(".datatable-filter-cell")
        .find(".control.has-icons-left")
        .append(selectIcon);
    $(".datatable-filter-cell")
        .find("select option:first-child")
        .html("Filter by");

    $(".is-datatable tbody td .checkbox input").on("change", function () {
        $(this).closest("tr").toggleClass("is-selected");

        if ($(".is-datatable td .checkbox input:checked").length > 0) {
            $(".field.has-addons").removeClass("is-disabled");
        } else {
            $(".field.has-addons").addClass("is-disabled");
        }
    });

    $(".is-datatable th .checkbox input").on("change", function () {
        if ($(this).prop("checked") === true) {
            $(".is-datatable td .checkbox input")
                .prop("checked", true)
                .trigger("change");
            $(".field.has-addons").removeClass("is-disabled");
        } else {
            $(".is-datatable td .checkbox input")
                .prop("checked", false)
                .trigger("change");
            $(".field.has-addons").addClass("is-disabled");
        }
    });

    $(".pagination li").click(function () {
        $(".pagination li.is-selected").removeClass("is-selected");
        $(this).addClass("is-selected");
    });
}

//Tabbed Widget
function initTabbedWidgets() {
    $(".tabbed-widget .tabbed-control").on("click", function () {
        let container = $(this).closest(".tabbed-widget");
        if (!$(this).hasClass("is-active")) {
            $(this).siblings(".tabbed-control").removeClass("is-active");
            $(this).addClass("is-active");
            container.find(".inner-list-wrapper").toggleClass("is-active");
        }
    });
}

export {
    themeColors,
    env,
    switchLayouts,
    changeDemoImages,
    initBgImages,
    initPageLoader,
    setActivelink,
    initSidebar,
    closeSidebarPanel,
    initCollapsibleMenu,
    initMobileNavbar,
    initMobileNavbarHamburger,
    openSidebar,
    initStuckHeader,
    initNavbarDropdowns,
    initDropdowns,
    initMobileDropdowns,
    adjustDropdowns,
    initConfirm,
    initChosenSelects,
    initTabs,
    initHSelect,
    initComboBox,
    initImageComboBox,
    initUserComboBox,
    initStackedComboBox,
    initBigComboBox,
    initAccordion,
    initAnimatedModals,
    initHModals,
    initPanels,
    scrollToTop,
    initSmallTextTip,
    initTextTip,
    initMediumTextTip,
    launchToast,
    setThemeToLocalStorage,
    initDarkMode,
    initAnimatedCheckboxes,
    initTextFilter,
    initCustomTextFilter,
    initPlayers,
    initAdvancedFlexTable,
    initSingleAccordion,
    initCollapse,
    initBackToTop,
    initSearch,
    customizeDatatable,
    initTabbedWidgets,
}

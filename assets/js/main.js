/* ==========================================================================
Main initialization file
========================================================================== */

const feather = require('feather-icons');
import {
    initPageLoader,
    switchLayouts,
    changeDemoImages,
    initWebapp,
    initCollapsibleMenu,
    initStuckHeader,
    initNavbarDropdowns,
    initDropdowns,
    initMobileDropdowns,
    adjustDropdowns,
    initChosenSelects,
    initTabs,
    initTabbedWidgets,
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
    initSmallTextTip,
    initTextTip,
    initMediumTextTip,
    initAnimatedCheckboxes,
    initCustomTextFilter,
    initTextFilter,
    initAdvancedFlexTable,
    initSingleAccordion,
    initCollapse,
    initPlayers,
    initSearch,
    initDarkMode,
    initBgImages,
    setActivelink,
    initMobileNavbar,
    initMobileNavbarHamburger,
    initSidebar,
    openSidebar,
    closeSidebarPanel,
    env,
} from "./functions";

"use strict";

initPageLoader();

$(document).ready(function () {
    //Swicth to Admin / Webapp
    switchLayouts();

    if (env === "development") {
        changeDemoImages();
    }

    //JS background images
    initBgImages();

    //Feather icons
    feather.replace();

    //Active Link
    setActivelink();

    //Mobile Navbar
    initMobileNavbar();

    //Mobile Navbar Hamburger
    initMobileNavbarHamburger();

    //Init sidebar (Admin Layout)
    if ($('.main-sidebar, .sidebar-block').length) {
        initSidebar();

        if ($("[data-sidebar-open]").length) {
            openSidebar();
        }

        if (
            window.matchMedia("(min-width: 768px)").matches &&
            window.matchMedia("(max-width: 1024px)").matches &&
            window.matchMedia("(orientation: landscape)").matches
        ) {
            closeSidebarPanel();
            $(".main-sidebar, .sidebar-brand").removeClass("is-bordered");
        }

        $(window).on("resize", function () {
            if (
                window.matchMedia("(min-width: 768px)").matches &&
                window.matchMedia("(max-width: 1024px)").matches &&
                window.matchMedia("(orientation: landscape)").matches
            ) {
                closeSidebarPanel();
                $(".main-sidebar, .sidebar-brand").removeClass("is-bordered");
            }
        });
    }

    //Init navbar (Webapp Layout)
    if ($(".view-wrapper").hasClass("is-webapp")) {
        initWebapp();
    }

    //Collapsible menus
    initCollapsibleMenu();

    //Stuck form header
    initStuckHeader();

    //Navbar Dropdowns
    initNavbarDropdowns();

    //Regular Dropdowns
    initDropdowns();

    //Mobile Dropdowns
    initMobileDropdowns();

    //Adjust Dropdowns
    adjustDropdowns();

    //Chosen Selects
    initChosenSelects();

    //Tabs
    initTabs();

    initTabbedWidgets();

    //H Select
    initHSelect();

    //Combo Box
    initComboBox();

    //Image Combo Box
    initImageComboBox();

    //User Combo Box
    initUserComboBox();

    //Stacked Combo Box
    initStackedComboBox();

    //Big Combo Box
    initBigComboBox();

    //Accordion
    initAccordion();

    //Animated Modals
    initAnimatedModals();

    //Regular Modals
    initHModals();

    //Right Panels
    initPanels();

    //Text Tips
    initSmallTextTip();
    initTextTip();
    initMediumTextTip();

    //Animated checkbox
    initAnimatedCheckboxes();

    //Text Filter
    initCustomTextFilter();
    initTextFilter();

    //Advanced flex table
    initAdvancedFlexTable();

    //Accordion
    initSingleAccordion();

    //Collapse
    initCollapse();

    //PLyr players
    initPlayers();

    //Search
    initSearch();

    //Dark Mode
    initDarkMode();
});

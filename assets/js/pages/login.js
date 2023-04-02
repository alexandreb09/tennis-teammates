"use strict";

import '../../scss/main.scss';

import '../main';
import '../popover';
import '../widgets';
import '../touch';

const feather = require('feather-icons');
import {
    env,
    changeDemoImages,
    initAnimatedModals,
    initDarkMode,
    initPageLoader
} from "../functions";

// initPageLoader();

$(document).ready(function () {
    // if (env === "development") {
    //     //Change demo images
    //     changeDemoImages();
    // }
    //
    // feather.replace();
    //
    // //Dark Mode
    // initDarkMode();
    //
    // //Regular Modals
    // initAnimatedModals();
    //
    // //Login submission
    // $("#login-submit").on("click", function () {
    //     let $this = $(this);
    //     $this.addClass("is-loading");
    //     setTimeout(function () {
    //         $this.removeClass("is-loading");
    //         $("#login-form").submit();
    //     }, 1000);
    // });
    //
    // //Reset password
    // $("#forgot-link, #cancel-recover").on("click", function () {
    //     $(this)
    //         .closest(".is-form")
    //         .find("form, .form-text")
    //         .toggleClass("is-hidden");
    // });
});

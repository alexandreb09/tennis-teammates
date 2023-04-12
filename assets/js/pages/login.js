"use strict";

import '../../scss/main.scss';

import '../main';
import '../popover';
import '../widgets';
import '../touch';

$(document).ready(function () {
    //Login submission
    $("#login-form").on("submit", function () {
        $("#login-submit").addClass("is-loading disabled");
    });

    // //Reset password
    // $("#forgot-link, #cancel-recover").on("click", function () {
    //     $(this)
    //         .closest(".is-form")
    //         .find("form, .form-text")
    //         .toggleClass("is-hidden");
    // });
});
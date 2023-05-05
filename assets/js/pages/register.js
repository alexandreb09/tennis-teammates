"use strict";

import '../../scss/main.scss';
// import '../../scss/pages/auth/_auth.scss';

import '../main';
import '../popover';
import '../widgets';
import '../touch';

$(document).ready(function () {
    //Login submission
    $("form[name='registration_form']").on("submit", function () {
        $('button[type="submit"]').addClass("is-loading disabled");
    });

    // //Reset password
    // $("#forgot-link, #cancel-recover").on("click", function () {
    //     $(this)
    //         .closest(".is-form")
    //         .find("form, .form-text")
    //         .toggleClass("is-hidden");
    // });
});
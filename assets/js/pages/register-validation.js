"use strict";

import '../../scss/main.scss';
// import '../../scss/pages/auth/_auth.scss';

import '../main';
import '../popover';
import '../widgets';
import '../touch';
import OTPInput from "../utils/otp-input";
import {fetchJson} from "../utils/requests";
import displayError from "../utils/errors";

$(document).ready(function () {
    const inputs = [...document.querySelectorAll('#otp > *[id]')];
    new OTPInput(inputs, submitCode, removeErrorMessage);
});

function submitCode(code){
    // switch
    $('button[type="submit"]').addClass("is-loading disabled");

    fetchJson(window.PATH_REGISTER_SUBMIT_CODE, {
        method: 'POST',
        body: JSON.stringify({ code: code }),
    }).then(r => {
        if (r.message){
            $('.form-card').prepend(displayError(r.message));
        } else {
            window.location.href = window.PATH_LOGIN;
            return;
        }
        $('button[type="submit"]').removeClass("is-loading disabled");
    })
}

function removeErrorMessage(){
    $('.form-card [data-type="error-message"] .message').each(function(){
        $(this).fadeOut('normal', function() {
            $(this).parent('[data-type="error-message"]').remove();
        });
    });
}

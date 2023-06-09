"use strict";

$(document).ready(function () {
    if ($("#form-layout-4").length) {
        //Init datepickers
        let datepickers = document.querySelectorAll(".form-datepicker");
        let datePicker = [];
        console.log(datepickers.length);
        for (let i = 0; i < datepickers.length; i++) {
            datePicker[i] = new Pikaday({
                field: datepickers[i],
                firstDay: 1,
                format: "MMM D, YYYY",
                onSelect: function () {
                    //Do your stuff
                },
            });
        }
    }

    if ($("#form-layout-5").length) {
        let step = 0;
        let button = $("#next-button");

        button.on("click", function () {
            step = step + 1;
            let $this = $(this);
            $this.addClass("is-loading");

            setTimeout(function () {
                $this.removeClass("is-loading");
                $("#form-step-" + step).addClass("is-active");
            }, 800);

            setTimeout(function () {
                $(".form-help").addClass("is-hidden");
                $(".steps").removeClass("is-hidden");
                $(
                    ".stepper-form .steps-segment, .mobile-steps .steps-segment"
                ).removeClass("is-active");
                $("#step-segment-" + step).addClass("is-active");
                $("#mobile-step-segment-" + step).addClass("is-active");
                $("html, body").animate(
                    {
                        scrollTop: $("#form-step-" + step).offset().top,
                    },
                    500
                );
            }, 1200);
        });

        $(".help-button").on("click", function () {
            let helpSection = $(this).attr("data-help");
            $(".steps").addClass("is-hidden");
            $(".form-help").removeClass("is-hidden");
            $(".form-help-inner").removeClass("is-active");
            $("#" + helpSection).addClass("is-active");
        });

        $(".close-help-button").on("click", function () {
            $(".form-help").addClass("is-hidden");
            $(".steps").removeClass("is-hidden");
        });

        $(window).on("scroll", function () {
            let height = $(window).scrollTop();
            if (height > 80) {
                $(".mobile-steps").addClass("is-active");
            } else {
                $(".mobile-steps").removeClass("is-active");
            }
        });
    }
});

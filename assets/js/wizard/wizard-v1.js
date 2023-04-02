"use strict";

let project = {
    customer: {},
    info: {},
    members: [],
    tools: [],
};
let currentStep = 0;
let delay = 1200; //1200

function buildProjectPreview(object) {
    //1. Handle Project Type
    let typeIcon;
    if (object.type === "UI/UX Design") {
        typeIcon = `
            <div class="h-icon is-medium is-warning is-rounded">
                <i class="lnil lnil-vector-pen"></i>
            </div>
        `;
    } else if (object.type === "Web Development") {
        typeIcon = `
            <div class="h-icon is-medium is-info is-rounded">
                <i class="lnil lnil-layout"></i>
            </div>
        `;
    } else if (object.type === "Marketing") {
        typeIcon = `
            <div class="h-icon is-medium is-success is-rounded">
                <i class="lnil lnil-megaphone"></i>
            </div>
        `;
    }
    let typeTemplate = `
        <div class="media-flex-center">
            ${typeIcon}
            <div class="flex-meta">
                <span>${object.type}</span>
                <span>Project Type</span>
            </div>
        </div>
    `;

    $("#project-preview-type").find(".media-flex-center").remove();
    $("#project-preview-type").append(typeTemplate);

    //2. Project Name & description
    if (project.name !== "") {
        $("#project-preview-title span").html(project.name);
    } else {
        $("#project-preview-title span").html("Project Name Goes Here");
    }

    if (project.description !== "") {
        $("#project-preview-description").html(project.description);
    } else {
        $("#project-preview-description").html(
            "You didn't enter any description. You can edit it anytime by clicking on the small edit icon."
        );
    }

    //3. Project Customer
    if (project.customer.logoUrl !== undefined || project.customer.name !== "") {
        $("#project-preview-customer-logo").attr("src", project.customer.logoUrl);
        $("#project-preview-customer-name").html(project.customer.name);
        $("#project-preview-customer-placeholder").addClass("is-hidden");
        $("#project-preview-customer-block").removeClass("is-hidden");
    } else {
        $("#project-preview-customer-block").addClass("is-hidden");
        $("#project-preview-customer-placeholder").removeClass("is-hidden");
    }

    //4. Project Info
    $("#project-preview-budget span").html(project.info.budget);
    if (project.info.date !== "") {
        $("#project-preview-date span").html(project.info.date);
    } else {
        $("#project-preview-date span").html("Unset");
    }

    $("#project-preview-attachments span").html(project.info.attachments);

    //5. Team
    $("#project-preview-team .media-list-item:not(.is-owner)").remove();
    for (let m = 0; m < project.members.length; m++) {
        let teamTemplate = `
            <div class="media-list-item">
                <div class="media-flex-center">
                    <div class="h-avatar">
                        <img class="avatar" src="${project.members[m].photoUrl}" alt="Avatar">
                    </div>
                    <div class="flex-meta">
                        <span>${project.members[m].name}</span>
                        <span>Member</span>
                    </div>
                </div>
            </div>
        `;
        $("#project-preview-team").append(teamTemplate);
    }

    //6. Tools
    $("#project-preview-tools .media-list-item").remove();
    if (project.tools.length > 0) {
        $("#project-preview-tools-placeholder").addClass("is-hidden");
        $("#project-preview-tools").removeClass("is-hidden");

        for (let t = 0; t < project.tools.length; t++) {
            let toolTemplate = `
                <div class="media-list-item">
                    <div class="media-flex-center">
                        <div class="h-avatar is-small">
                            <img class="avatar" src="${project.tools[t].photoUrl}" alt="Avatar">
                        </div>
                        <div class="flex-meta">
                            <span>${project.tools[t].name}</span>
                            <span>${project.tools[t].type}</span>
                        </div>
                    </div>
                </div>
            `;
            $("#project-preview-tools").append(toolTemplate);
        }
    } else {
        $("#project-preview-tools").addClass("is-hidden");
        $("#project-preview-tools-placeholder").removeClass("is-hidden");
    }
}

function handleProgress(value) {
    $("#wizard-progress").val(value);
}

function goToStep(step) {
    currentStep = step;

    $(".wizard-v1-wrapper .inner-wrapper").removeClass("is-active");
    $("#wizard-step-" + step).addClass("is-active");

    let stepTitle = $(".inner-wrapper.is-active").attr("data-step-title");
    let titleHtml = `
        <span class="title-wrap">Step ${
        step + 1
    }: <span>${stepTitle}</span></span>
    `;
    $(".is-wizard-title").html(titleHtml);

    $(".project-preview-loader").addClass("is-active");

    if (currentStep > 0) {
        $(".wizard-buttons").addClass("is-active");
    }

    if (currentStep === 0) {
        handleProgress(15);
        $(".wizard-buttons").removeClass("is-active");
    } else if (currentStep === 1) {
        handleProgress(25);
    } else if (currentStep === 2) {
        handleProgress(45);
    } else if (currentStep === 3) {
        handleProgress(60);
    } else if (currentStep === 4) {
        handleProgress(75);
    } else if (currentStep === 5) {
        handleProgress(85);
    } else if (currentStep === 6) {
        handleProgress(95);
        buildProjectPreview(project);
        setTimeout(function () {
            $(".project-preview-loader").removeClass("is-active");
        }, 800);
    } else if (currentStep === 7) {
        handleProgress(100);
        $(".wizard-buttons").removeClass("is-active");
        $(".wizard-dropdown").addClass("is-hidden");
    }

    $('[data-dropdown-step="' + step + '"]').removeClass("is-disabled");
}

function initPermissions() {
    $(".permission-level-inner")
        .off()
        .on("click", function () {
            let $this = $(this);
            let progress = $this.attr("data-progress");
            $this.closest(".permission-levels").find(".progress").val(progress);
            $this.addClass("is-active");
            $this
                .closest(".permission-level")
                .prevAll()
                .find(".permission-level-inner")
                .addClass("is-active");
            $this
                .closest(".permission-level")
                .nextAll()
                .find(".permission-level-inner")
                .removeClass("is-active");
        });
}

function removeMember() {
    $(".invited-member .cancel-button")
        .off()
        .on("click", function () {
            $(this).closest(".invited-member").remove();

            let memberCount = $(".invited-member").length;

            if (memberCount === 0) {
                $(".empty-wrap").removeClass("is-hidden");
            }
        });
}

function addMember(MemberId, MemberPhoto, MemberName) {
    let template = `
        <div id="invited-member-${MemberId}" class="invited-member">
            <div class="h-avatar is-medium">
                <img class="avatar" src="${MemberPhoto}" alt="">
            </div>
            <div class="meta">
                <span>Invited</span>
                <p class="dark-inverted">${MemberName}</p>
            </div>
            <div class="actions">
                <div class="permissions">
                    <div class="permission-levels">
                        <div class="permission-level hint--bubble hint--primary hint--top" aria-label="Reader">
                            <div class="permission-level-inner is-active" data-progress="20"></div>
                        </div>
                        <div class="permission-level hint--bubble hint--primary hint--top" aria-label="Collaborator">
                            <div class="permission-level-inner" data-progress="50"></div>
                        </div>
                        <div class="permission-level hint--bubble hint--primary hint--top" aria-label="Manager">
                            <div class="permission-level-inner" data-progress="68"></div>
                        </div>
                        <div class="permission-level hint--bubble hint--primary hint--top" aria-label="Owner">
                            <div class="permission-level-inner" data-progress="100"></div>
                        </div>
                        <progress class="progress permissions-progress is-primary is-tiny" value="20" max="100">20%</progress>
                    </div>
                </div>
                <button class="button is-circle cancel-button hint--top hint--bubble hint--primary" aria-label="Cancel Invite">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;

    $(".empty-wrap").addClass("is-hidden");

    if ($("#invited-member-" + MemberId).length) {
        notyf.open({
            type: "warning",
            message: "You already Invited " + MemberName,
        });
    } else {
        $(".members-list").append(template);
        removeMember();
        initPermissions();
    }
}

$(document).ready(function () {
    //Step 1 card buttons
    $(".type-select-button").on("click", function () {
        let $this = $(this);
        let projectType = $(this).closest(".wizard-card").find("h3").text();

        project.type = projectType;

        $this.addClass("is-loading");
        setTimeout(function () {
            $this.removeClass("is-loading");
            goToStep(currentStep + 1);
        }, delay);
    });

    //Wizard buttons
    $(".wizard-button-next").on("click", function () {
        let $this = $(this);
        $this.addClass("is-loading");

        if (currentStep === 1) {
            project.name = $("#project-name").val();
            project.description = $("#project-description").val();
        } else if (currentStep === 2) {
            project.customer.logoUrl = $(
                ".media-flex-center:not(.is-hidden) #customer-logo"
            ).attr("src");
            project.customer.name = $(
                ".media-flex-center:not(.is-hidden) #customer-name"
            ).text();
            project.info.date = $("#project-end-date").val();
            project.info.budget = $(".budget-item-inner.is-active span").text();
        } else if (currentStep === 3) {
            project.info.attachments = $(".preview-box").length;
        } else if (currentStep === 4) {
            project.members.splice(0, project.members.length);

            let invitedCount = $(".invited-member").length;
            if (invitedCount > 0) {
                $(".invited-member").each(function () {
                    let memberPhoto = $(this).find("img").attr("src");
                    let memberName = $(this).find(".meta p").text();
                    project.members.push({
                        name: memberName,
                        photoUrl: memberPhoto,
                    });
                });
            }
        } else if (currentStep === 5) {
            project.tools.splice(0, project.tools.length);

            let toolsCount = $(".tool-card input:checked").length;
            if (toolsCount > 0) {
                $(".tool-card input:checked").each(function () {
                    let container = $(this).closest(".tool-card");
                    let toolPhoto = container.find("img").attr("src");
                    let toolName = container.find(".flex-meta span:first-child").text();
                    let toolType = container.find(".flex-meta span:nth-child(2)").text();
                    project.tools.push({
                        name: toolName,
                        photoUrl: toolPhoto,
                        type: toolType,
                    });
                });
            }
        }

        setTimeout(function () {
            $this.removeClass("is-loading");
            goToStep(currentStep + 1);
        }, delay);
    });

    $(".wizard-button-previous").on("click", function () {
        let $this = $(this);
        $this.addClass("is-loading");
        setTimeout(function () {
            $this.removeClass("is-loading");
            goToStep(currentStep - 1);
        }, delay);
    });

    //Wizard nav dropdown
    $("#wizard-navigation-dropdown .dropdown-item").on("click", function () {
        let targetStep = parseInt($(this).attr("data-dropdown-step"));
        goToStep(targetStep);
    });

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

    //Autocomplete
    let customerOptions = {
        url: "assets/data/companies.json",
        getValue: "name",
        template: {
            type: "custom",
            method: function (value, item) {
                return `
                    <div class="template-wrapper">
                        <div class="avatar-wrapper">
                            <img class="autocpl-avatar" src="${item.pic}" alt="Avatar">
                        </div>
                        <div class="entry-text">
                            <span>${value}</span>
                            <span>${item.location}</span>
                        </div>
                    </div>
                `;
            },
        },
        highlightPhrase: false,
        list: {
            maxNumberOfElements: 5,
            showAnimation: {
                type: "fade", //normal|slide|fade
                time: 400,
                callback: function () {
                },
            },
            match: {
                enabled: true,
            },
            onChooseEvent: function () {
                let value = $("#customers-search").getSelectedItemData();
                $("#customer-logo").attr("src", value.pic);
                $("#customer-name").html(value.name);
                $("#customer-location").html(value.location);
                $(".project-customer")
                    .find(".field, .media-flex-center")
                    .toggleClass("is-hidden");
                //console.log('You chose the customer named ' + value + ' and who lives in ' + item.location);
            },
        },
    };

    $("#customers-search").easyAutocomplete(customerOptions);

    //Remove Customer
    $("#remove-customer").on("click", function () {
        $("#customers-search").val("");
        $(".project-customer")
            .find(".field, .media-flex-center")
            .toggleClass("is-hidden");
    });

    $(".project-budget .budget-item-inner").on("click", function () {
        let $container = $(this).closest(".project-budget");
        $container.find(".budget-item-inner").removeClass("is-active");
        $(this).addClass("is-active");
    });

    $(".toggle-uploader-link").on("click", function () {
        $(".uploader, .page-placeholder.is-files").toggleClass("is-hidden");
    });

    //Add Members
    let members = 0;

    $(".toggle-members-link").on("click", function () {
        $(".project-team-wrapper, .page-placeholder.is-people").toggleClass(
            "is-hidden"
        );
    });

    if ($("#add-member").length) {
        let membersOptions = {
            url: "assets/data/user.json",
            getValue: "name",
            template: {
                type: "custom",
                method: function (value, item) {
                    return `
                        <div class="template-wrapper">
                            <div class="avatar-wrapper">
                                <img class="autocpl-avatar" src="${item.pic}" alt="">
                            </div>
                            <div class="entry-text">
                                <span>${value}</span>
                                <span>${item.position}</span>
                            </div>
                        </div>
                    `;
                },
            },
            highlightPhrase: false,
            list: {
                maxNumberOfElements: 5,
                showAnimation: {
                    type: "fade", //normal|slide|fade
                    time: 400,
                    callback: function () {
                    },
                },
                match: {
                    enabled: true,
                },
                onChooseEvent: function () {
                    //Get the user name from the autocomplete
                    let memberName = $("#add-member").val();
                    let memberPhoto = $("#add-member").getSelectedItemData().pic;
                    let memberId = $("#add-member").getSelectedItemData().id;

                    addMember(memberId, memberPhoto, memberName);

                    //empty the input for next use
                    $("#add-member").val("");

                    //Increment instructor variable
                    members = members + 1;
                },
            },
        };

        $("#add-member").easyAutocomplete(membersOptions);
    }

    //Preview
    $(".edit-icon").on("click", function () {
        let targetStep = parseInt($(this).attr("data-step-edit"));
        goToStep(targetStep);
    });
});

Dropzone.autoDiscover = false;

// Get the template HTML and remove it from the doument
let previewNode = document.querySelector("#template");
previewNode.id = "";
let previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

let myDropzone = new Dropzone(document.body, {
    // Make the whole body a dropzone
    url: "https://www.cssninja.io/dropzone.php", // Set the url
    //thumbnailWidth: 80,
    //thumbnailHeight: 80,
    thumbnailWidth: 800,
    thumbnailHeight: 600,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: "#previews", // Define the container to display the previews
    clickable: ".fileinput-button", // Define the element that should be used as click trigger to select files.
});

myDropzone.on("addedfile", function (file) {
    // Hookup the start button
    file.previewElement.querySelector(".start").onclick = function () {
        myDropzone.enqueueFile(file);
    };
    feather.replace();
});

// Update the total progress bar
myDropzone.on("totaluploadprogress", function (progress) {
    document.querySelector("#total-progress .progress-bar").style.width =
        progress + "%";
});

myDropzone.on("sending", function (file) {
    // Show the total progress bar when upload starts
    document.querySelector("#total-progress").style.opacity = "1";
    // And disable the start button
    file.previewElement
        .querySelector(".start")
        .setAttribute("disabled", "disabled");
});

// Hide the total progress bar when nothing's uploading anymore
myDropzone.on("queuecomplete", function () {
    document.querySelector("#total-progress").style.opacity = "0";
});

// Setup the buttons for all transfers
// The "add files" button doesn't need to be setup because the config
// `clickable` has already been specified.
document.querySelector("#actions .start").onclick = function () {
    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
};
document.querySelector("#actions .cancel").onclick = function () {
    myDropzone.removeAllFiles(true);
};

// Now fake the file upload, since GitHub does not handle file uploads
// and returns a 404

let minSteps = 6,
    maxSteps = 60,
    timeBetweenSteps = 100,
    bytesPerStep = 100000;

myDropzone.uploadFiles = function (files) {
    let self = this;

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let totalSteps = Math.round(
            Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep))
        );

        for (let step = 0; step < totalSteps; step++) {
            let duration = timeBetweenSteps * (step + 1);
            setTimeout(
                (function (file, totalSteps, step) {
                    return function () {
                        file.upload = {
                            progress: (100 * (step + 1)) / totalSteps,
                            total: file.size,
                            bytesSent: ((step + 1) * file.size) / totalSteps,
                        };

                        self.emit(
                            "uploadprogress",
                            file,
                            file.upload.progress,
                            file.upload.bytesSent
                        );
                        if (file.upload.progress === 100) {
                            file.status = Dropzone.SUCCESS;
                            self.emit("success", file, "success", null);
                            self.emit("complete", file);
                            self.processQueue();
                        }
                    };
                })(file, totalSteps, step),
                duration
            );
        }
    }
};

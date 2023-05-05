

export default function OTPInput(inputs, onSubmitCallback, onBackspaceCallback) {
    let checkSubmit = () => {
        if (inputs.every(input => input.value !== "")){
            let code = inputs.map(input => input.value).join("");
            if (inputs.length === code.length){
                return onSubmitCallback(code);
            }
        }
    }

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        input.addEventListener('keydown', function(event) {
            const isNumber = event.keyCode > 95 && event.keyCode < 106;
            if (isNumber){
                input.value = event.key;
                if (i !== inputs.length - 1)
                    inputs[i + 1].focus();
                checkSubmit();
                event.preventDefault();
            } else if (event.key === "Backspace") {
                input.value = '';
                if (i !== 0)
                    inputs[i - 1].focus();
                event.preventDefault();
                onBackspaceCallback();
            } else if (event.key !== "Control" && event.key !== "v"){
                input.value = "";
            }
        });
        input.addEventListener('input', checkSubmit);

        input.addEventListener('paste', function(event) {
            let paste = (event.clipboardData || window.clipboardData).getData("text");
            paste = paste.trim().toLowerCase();
            let char_i = 0;
            for (let j = i; j < Math.min(paste.length, inputs.length); j++){
                inputs[j].value = paste[char_i];
                inputs[j].focus();
                char_i += 1;
            }
            checkSubmit();
        });
    }
}
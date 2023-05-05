export default function displayError(errorMessage){
    return `
        <div class="field" data-type="error-message" onTransitionEnd="this.remove()">
            <div class="message is-danger">
                <button class="delete" onClick="this.parentElement.parentElement.style.opacity='0'"></button>
                <div class="message-body">
                    ${ errorMessage }
                </div>
            </div>
        </div>
        `;
}
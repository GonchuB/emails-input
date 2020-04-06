import {
    DeleteHandler,
    Email,
    Component,
} from '../types';
import { IDS, CLASS_NAMES } from '../constants';

interface EmailTagProps {
    onDelete: DeleteHandler;
    email: Email;
}

export function EmailTag(props: EmailTagProps): Component {
    const emailElement = document.createElement("span");
    emailElement.setAttribute("id", IDS.EMAIL_TAG(props.email.id));

    const emailActionElement = document.createElement("span");
    emailActionElement.setAttribute("role", "button")
    emailActionElement.setAttribute("tabindex", "0")

    function handleDelete(): void {
        props.onDelete(props.email.id);
    }
    function handleClick(): void {
        handleDelete();
    }
    function handleInputKeyPress(event: KeyboardEvent): void {
        if (event.key === "Enter" || event.key === " ") {
            handleDelete();
        }
    }
    function remove(): void {
        emailActionElement.removeEventListener("click", handleClick);
        emailActionElement.removeEventListener("keypress", handleInputKeyPress);
        emailElement.remove();
    }
    function render(): HTMLElement {
        const validityClassName = props.email.isValid ? CLASS_NAMES.EMAIL_TAG_VALID : CLASS_NAMES.EMAIL_TAG_INVALID;
        const className = CLASS_NAMES.EMAIL_TAG + " " + validityClassName;

        emailElement.setAttribute("class", className);
        emailActionElement.setAttribute("class", CLASS_NAMES.EMAIL_TAG_ACTION);
        emailActionElement.appendChild(document.createTextNode("X"))

        emailActionElement.addEventListener("click", handleClick);
        emailActionElement.addEventListener("keypress", handleInputKeyPress);

        emailElement.appendChild(document.createTextNode(props.email.value));
        emailElement.appendChild(emailActionElement);

        return emailElement;
    }
    return { remove, render };
}
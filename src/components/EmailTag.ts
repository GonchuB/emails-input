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

    function handleClick(): void {
        props.onDelete(props.email.id);
    }
    function remove() {
        emailActionElement.removeEventListener("click", handleClick);
        emailElement.remove();
    }
    function render() {
        const validityClassName = props.email.isValid ? CLASS_NAMES.EMAIL_TAG_VALID : CLASS_NAMES.EMAIL_TAG_INVALID;
        const className = CLASS_NAMES.EMAIL_TAG + " " + validityClassName;

        emailElement.setAttribute("class", className);
        emailActionElement.setAttribute("class", CLASS_NAMES.EMAIL_TAG_ACTION);
        emailActionElement.appendChild(document.createTextNode("X"))

        emailActionElement.addEventListener("click", handleClick);

        emailElement.appendChild(document.createTextNode(props.email.value));
        emailElement.appendChild(emailActionElement);

        return emailElement;
    }
    return { remove, render };
}
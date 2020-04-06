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
    emailActionElement.setAttribute("role", "button");
    emailActionElement.setAttribute("tabindex", "0");

    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');

    svgElement.setAttribute("aria-hidden","true");
    svgElement.setAttribute('viewbox', '0 0 8 8');
    svgElement.setAttribute('width', '8px');
    svgElement.setAttribute('height', '8px');
    svgElement.setAttribute('fill', 'none')
    svgPath.setAttribute('d', 'M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z');
    svgPath.setAttribute('fill', '#050038');
    svgElement.appendChild(svgPath);

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
        emailActionElement.appendChild(svgElement)

        emailActionElement.addEventListener("click", handleClick);
        emailActionElement.addEventListener("keypress", handleInputKeyPress);

        emailElement.appendChild(document.createTextNode(props.email.value));
        emailElement.appendChild(emailActionElement);

        return emailElement;
    }
    return { remove, render };
}
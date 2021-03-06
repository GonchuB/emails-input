import { DeleteHandler, Email, Component } from '../types';
import { IDS, CLASS_NAMES, ACCESSIBILITY } from '../constants';

interface EmailTagProps {
    uniqueId: string;
    onDelete: DeleteHandler;
    email: Email;
}

function createSvgIcon(): SVGElement {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('aria-hidden', 'true');
    svgElement.setAttribute('viewbox', '0 0 8 8');
    svgElement.setAttribute('width', '8px');
    svgElement.setAttribute('height', '8px');
    svgElement.setAttribute('fill', 'none');

    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgPath.setAttribute('d', 'M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z');
    svgPath.setAttribute('fill', '#050038');

    svgElement.appendChild(svgPath);
    return svgElement;
}

export function EmailTag(props: EmailTagProps): Component {
    const emailElement = document.createElement('span');
    emailElement.setAttribute('id', IDS.EMAIL_TAG(props.email.id + props.uniqueId));

    const emailActionElement = document.createElement('span');
    emailActionElement.setAttribute('role', 'button');
    emailActionElement.setAttribute('tabindex', '0');
    emailActionElement.setAttribute('aria-label', ACCESSIBILITY.DELETE_EMAIL_BUTTON(props.email.value));

    const svgElement = createSvgIcon();

    function handleDelete(): void {
        props.onDelete(props.email.id);
    }
    function handleActionClick(): void {
        handleDelete();
    }
    function handleActionKeypress(event: KeyboardEvent): void {
        if (['Enter', 'Space'].indexOf(event.code) >= 0) {
            handleDelete();
            event.preventDefault();
        }
    }
    function remove(): HTMLElement {
        emailActionElement.removeEventListener('click', handleActionClick);
        emailActionElement.removeEventListener('keypress', handleActionKeypress);
        emailElement.removeChild(emailActionElement);
        return emailElement;
    }
    function render(): HTMLElement {
        const validityClassName = props.email.isValid ? CLASS_NAMES.EMAIL_TAG_VALID : CLASS_NAMES.EMAIL_TAG_INVALID;
        const className = CLASS_NAMES.EMAIL_TAG + ' ' + validityClassName;

        emailElement.setAttribute('class', className);
        emailActionElement.setAttribute('class', CLASS_NAMES.EMAIL_TAG_ACTION);
        emailActionElement.appendChild(svgElement);

        emailActionElement.addEventListener('click', handleActionClick);
        emailActionElement.addEventListener('keypress', handleActionKeypress);

        emailElement.appendChild(document.createTextNode(props.email.value));
        emailElement.appendChild(emailActionElement);

        return emailElement;
    }
    return { remove, render };
}

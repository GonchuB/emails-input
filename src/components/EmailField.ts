import {
    EmailValidator,
    SubmitHandler,
    Component,
} from '../types';
import { IDS, CLASS_NAMES, STRINGS } from '../constants';

interface EmailFieldProps {
    node: HTMLElement;
    emailValidator: EmailValidator;
    onSubmit: SubmitHandler;
}

export function EmailField(props: EmailFieldProps): Component {
    const inputElement: HTMLInputElement = document.createElement("input");
    inputElement.setAttribute("type", "email");
    inputElement.setAttribute("id", IDS.EMAIL_FIELD);
    inputElement.setAttribute("class", CLASS_NAMES.EMAIL_FIELD);
    inputElement.setAttribute("placeholder", STRINGS.FIELD_PLACEHOLDER);

    function submitField(): void{
        const email = inputElement.value;
        if(email.length > 0) {
            props.onSubmit(email);
            inputElement.value = "";
        }
    }
    function handleInputKeyPress(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            submitField();
        }
    }
    function handleBlur(): void {
        submitField();
    }
    inputElement.addEventListener("keypress", handleInputKeyPress);
    inputElement.addEventListener("blur", handleBlur);

    function remove(): void {
        inputElement.removeEventListener('keypress', handleInputKeyPress);
        inputElement.removeEventListener('blur', handleBlur);
        inputElement.remove();
    }
    function render(): HTMLInputElement {
        return inputElement;
    }

    return { container: props.node, remove, render };
}
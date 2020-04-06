import { EmailValidator, SubmitHandler, Component } from '../types';
import { IDS, CLASS_NAMES, STRINGS, ACCESSIBILITY } from '../constants';

interface EmailFieldProps {
    emailValidator: EmailValidator;
    onSubmit: SubmitHandler;
}

export function EmailField(props: EmailFieldProps): Component {
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.setAttribute('type', 'email');
    inputElement.setAttribute('id', IDS.EMAIL_FIELD);
    inputElement.setAttribute('class', CLASS_NAMES.EMAIL_FIELD);
    inputElement.setAttribute('placeholder', STRINGS.FIELD_PLACEHOLDER);
    inputElement.setAttribute('aria-label', ACCESSIBILITY.EMAIL_FIELD_INPUT);

    function submitField(): void {
        const email = inputElement.value;
        if (email.length > 0) {
            props.onSubmit(email);
            inputElement.value = '';
        }
    }
    function handleInputKeyPress(event: KeyboardEvent): void {
        if (['Enter', '32'].indexOf(event.code) >= 0) {
            event.preventDefault();
            submitField();
        }
    }
    function handleBlur(): void {
        submitField();
    }
    function handlePaste(event: ClipboardEvent): void {
        event.preventDefault();
        if (!event.clipboardData || !event.clipboardData.getData) {
            return;
        }
        event.clipboardData
            .getData('text')
            .split(',')
            .forEach(function (dirtyEmail: string): void {
                props.onSubmit(dirtyEmail.replace(/\s+/g, ''));
            });
    }
    inputElement.addEventListener('keypress', handleInputKeyPress);
    inputElement.addEventListener('blur', handleBlur);
    inputElement.addEventListener('paste', handlePaste);

    function remove(): HTMLInputElement {
        inputElement.removeEventListener('keypress', handleInputKeyPress);
        inputElement.removeEventListener('blur', handleBlur);
        inputElement.removeEventListener('paste', handlePaste);
        return inputElement;
    }
    function render(): HTMLInputElement {
        return inputElement;
    }

    return { remove, render };
}

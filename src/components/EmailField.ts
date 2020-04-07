import { EmailValidator, SubmitHandler, Component } from '../types';
import { IDS, CLASS_NAMES, STRINGS, ACCESSIBILITY } from '../constants';

interface EmailFieldProps {
    uniqueId: string;
    emailValidator: EmailValidator;
    onSubmit: SubmitHandler;
    placeholder?: string;
}

export function EmailField(props: EmailFieldProps): Component {
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.setAttribute('type', 'email');
    inputElement.setAttribute('id', IDS.EMAIL_FIELD + props.uniqueId);
    inputElement.setAttribute('class', CLASS_NAMES.EMAIL_FIELD);
    inputElement.setAttribute('placeholder', props.placeholder || STRINGS.FIELD_PLACEHOLDER);
    inputElement.setAttribute('aria-label', ACCESSIBILITY.EMAIL_FIELD_INPUT);

    function submitField(): void {
        const email = inputElement.value;
        if (email.length > 0) {
            props.onSubmit(email);
            inputElement.value = '';
        }
    }
    function handleInputKeyPress(event: KeyboardEvent): void {
        if (['Enter', 'Comma'].indexOf(event.code) >= 0) {
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
    function remove(): HTMLInputElement {
        inputElement.removeEventListener('keypress', handleInputKeyPress);
        inputElement.removeEventListener('blur', handleBlur);
        inputElement.removeEventListener('paste', handlePaste);
        return inputElement;
    }
    function render(): HTMLInputElement {
        return inputElement;
    }
    function focus(): void {
        inputElement.focus();
    }

    inputElement.addEventListener('keypress', handleInputKeyPress);
    inputElement.addEventListener('blur', handleBlur);
    inputElement.addEventListener('paste', handlePaste);

    return { remove, render, focus };
}

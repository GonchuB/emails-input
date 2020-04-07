import { EmailRepositoryApi, Component, Email } from '../types';
import { IDS, CLASS_NAMES } from '../constants';
import { EmailList, EmailListApi } from './EmailList';
import { EmailField } from './EmailField';

export interface LayoutProps {
    uniqueId: string;
    repository: EmailRepositoryApi;
    placeholder?: string;
}

export function Layout(props: LayoutProps): Component {
    const repository = props.repository;

    const layoutComponents: Record<string, Component> = {};
    const layoutContainer = document.createElement('div');
    layoutContainer.setAttribute('id', IDS.EMAILS_INPUT + props.uniqueId);
    layoutContainer.setAttribute('class', CLASS_NAMES.EMAILS_INPUT);

    function handleClick(): void {
        const onFocus = layoutComponents.emailField.focus as Function;
        onFocus();
    }

    function render(): HTMLElement {
        const emailField = EmailField({
            emailValidator: repository.validator,
            onSubmit: repository.addEmail,
            placeholder: props.placeholder,
            uniqueId: props.uniqueId,
        });
        layoutComponents.emailField = emailField;

        const emailList = EmailList({
            onDelete: repository.deleteEmail,
            emails: repository.getAllEmails(),
            emailField,
            uniqueId: props.uniqueId,
        });
        layoutComponents.emailList = emailList;
        layoutContainer.addEventListener('click', handleClick);
        layoutContainer.appendChild(emailList.render());

        return layoutContainer;
    }

    function remove(): HTMLElement {
        layoutContainer.removeEventListener('click', handleClick);

        if (layoutComponents.emailList) {
            const emailListElement = layoutComponents.emailList.remove();
            layoutContainer.removeChild(emailListElement);
        }

        return layoutContainer;
    }

    props.repository.subscribe(function (emails: Email[]): void {
        (layoutComponents.emailList as EmailListApi).update(emails);
    });

    return { render, remove };
}

import { EmailField } from '../components/EmailField';
import { Component, SubmitHandler, EmailValidator, EmailValue } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = function (): void {};
const defaultEmailValidator = function (email: EmailValue): boolean {
    return email.length > 0;
};

function createTestComponent({
    onSubmit = noop as SubmitHandler,
    emailValidator = defaultEmailValidator as EmailValidator,
} = {}): Component {
    return EmailField({
        onSubmit,
        emailValidator,
    });
}

describe('EmailField component', function () {
    describe('render', function () {
        it('creates the correct container', function () {
            const emailField = createTestComponent();

            const emailFieldElement = emailField.render();

            expect(emailFieldElement.getAttribute('id')).toEqual('emails-input-field');
            expect(emailFieldElement.getAttribute('class')).toEqual('emails-input--field');
            expect(emailFieldElement.getAttribute('type')).toEqual('email');
            expect(emailFieldElement.getAttribute('placeholder')).toEqual('add more people...');
        });
    });
    describe('keypress event', function () {
        it('submits the field value when pressing enter', function () {
            const onSubmit = jest.fn();
            const emailField = createTestComponent({ onSubmit });

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = 'some@email.com';
            emailFieldElement.dispatchEvent(new KeyboardEvent('keypress', { code: 'Enter' }));

            expect(onSubmit).toHaveBeenCalledWith('some@email.com');
        });
        it('does not submit when pressing enter if the field is empty', function () {
            const onSubmit = jest.fn();
            const emailField = createTestComponent({ onSubmit });

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = '';
            emailFieldElement.dispatchEvent(new KeyboardEvent('keypress', { code: 'Enter' }));

            expect(onSubmit).not.toHaveBeenCalled();
        });
        it('does not submit when pressing another key', function () {
            const onSubmit = jest.fn();
            const emailField = createTestComponent({ onSubmit });

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = 'some@email.com';
            emailFieldElement.dispatchEvent(new KeyboardEvent('keypress', { code: 'Esc' }));

            expect(onSubmit).not.toHaveBeenCalled();
        });
        it('clears the field value when submitting', function () {
            const emailField = createTestComponent();

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = 'some@email.com';
            emailFieldElement.dispatchEvent(new KeyboardEvent('keypress', { code: 'Enter' }));

            expect((emailFieldElement as HTMLInputElement).value).toEqual('');
        });
    });
    describe('blur event', function () {
        it('submits the field value when blurring', function () {
            const onSubmit = jest.fn();
            const emailField = createTestComponent({ onSubmit });

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = 'some@email.com';
            emailFieldElement.dispatchEvent(new FocusEvent('blur'));

            expect(onSubmit).toHaveBeenCalledWith('some@email.com');
        });
        it('does not submit when pressing enter if the field is empty', function () {
            const onSubmit = jest.fn();
            const emailField = createTestComponent({ onSubmit });

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = '';
            emailFieldElement.dispatchEvent(new FocusEvent('blur'));

            expect(onSubmit).not.toHaveBeenCalled();
        });

        it('clears the field value when submitting', function () {
            const emailField = createTestComponent();

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = 'some@email.com';
            emailFieldElement.dispatchEvent(new FocusEvent('blur'));

            expect((emailFieldElement as HTMLInputElement).value).toEqual('');
        });
    });
    describe('remove', function () {
        it('removes event listeners', function () {
            const onSubmit = jest.fn();
            const emailField = createTestComponent({ onSubmit });

            const emailFieldElement = emailField.render();
            (emailFieldElement as HTMLInputElement).value = 'some@email.com';

            emailField.remove();

            emailFieldElement.dispatchEvent(new KeyboardEvent('keypress', { code: 'Enter' }));
            emailFieldElement.dispatchEvent(new MouseEvent('blur'));
            expect(onSubmit).not.toHaveBeenCalled();
        });
    });
});

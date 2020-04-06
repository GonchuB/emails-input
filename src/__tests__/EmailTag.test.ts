import { EmailTag } from '../components/EmailTag';
import { Component, DeleteHandler } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = function(): void {};
const defaultNode = document.createElement("div");
defaultNode.setAttribute("id", "default-node");
const defaultEmail = {
    id: 'email@tag.com',
    value: 'email@tag.com',
    isValid: true
}

function createTestComponent({
    node = defaultNode,
    onDelete = noop as DeleteHandler,
    email = defaultEmail,
} = {}): Component {
    return EmailTag({
        node,
        onDelete,
        email,
    })
}

describe('EmailTag component', function() {
    describe('render', function() {
        it('creates the correct container', function() {
            const emailTag = createTestComponent();
            const emailTagElement = emailTag.render();
            expect(emailTagElement.getAttribute("id")).toEqual('emails-input-tag-email@tag.com');
        });
        it('renders the correct value', function() {
            const emailTag = createTestComponent();
            const emailTagElement = emailTag.render();

            const [textNode] = emailTagElement.childNodes;
            expect(textNode.textContent).toEqual('email@tag.com');
        });
        it('renders valid email properly', function() {
            const emailTag = createTestComponent({ email: {
                id: 'another@email.com',
                value: 'another@email.com',
                isValid: true
            }});
            const emailTagElement = emailTag.render();
            expect(emailTagElement.getAttribute("class")).toEqual('emails-input--email-tag emails-input--email-tag--valid');
        });
        it('renders invalid email properly', function() {
            const emailTag = createTestComponent({ email: {
                id: 'another',
                value: 'another',
                isValid: false
            }});
            const emailTagElement = emailTag.render();
            expect(emailTagElement.getAttribute("class")).toEqual('emails-input--email-tag emails-input--email-tag--invalid');
        });
    });
    describe('click event', function() {
        it('submits the field value when pressing enter', function() {
            const onDelete = jest.fn();
            const emailTag = createTestComponent({ onDelete });

            const emailTagElement = emailTag.render();

            const emailActionElement = emailTagElement.querySelector('span') as HTMLElement;
            emailActionElement.dispatchEvent(new MouseEvent('click'));

            expect(onDelete).toHaveBeenCalledWith('email@tag.com');
        });
    });
    describe('remove', function() {
        it('removes event listeners', function() {
            const onDelete = jest.fn();
            const emailTag = createTestComponent({ onDelete });

            const emailTagElement = emailTag.render();
            
            const emailActionElement = emailTagElement.querySelector('span') as HTMLElement;
            
            emailTag.remove();
            
            emailActionElement.dispatchEvent(new MouseEvent('click'));
            expect(onDelete).not.toHaveBeenCalled();
        });
    });
});
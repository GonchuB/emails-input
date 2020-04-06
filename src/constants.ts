export const IDS = {
    EMAILS_INPUT: 'emails-input-component',
    EMAIL_LIST_CONTAINER: 'emails-input-container',
    EMAIL_TAG: (id: string): string => 'emails-input-tag-' + id,
    EMAIL_FIELD: 'emails-input-field',
};

export const CLASS_NAMES = {
    EMAILS_INPUT: 'emails-input--wrapper',
    EMAILS_INPUT_CONTAINER: 'emails-input--container',
    EMAIL_TAG: 'emails-input--email-tag',
    EMAIL_TAG_VALID: 'emails-input--email-tag--valid',
    EMAIL_TAG_INVALID: 'emails-input--email-tag--invalid',
    EMAIL_TAG_ACTION: 'emails-input--email-tag-action',
    EMAIL_FIELD: 'emails-input--field',
};

export const STRINGS = {
    FIELD_PLACEHOLDER: 'add more people...',
}

export const ACCESSIBILITY = {
    DELETE_EMAIL_BUTTON: (value: string): string => 'Delete ' + value,
    EMAIL_FIELD_INPUT: 'Add more people'
}
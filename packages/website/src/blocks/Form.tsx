import React, { useState } from 'react'
import { Button } from '../components/Style'
import styled, { css } from 'styled-components'
import { mix } from 'polished'
import slugify from 'react-slugify'
import { Block, Field } from '../templates/Page'

type FormProps = {
    block: Block
}

export const Form: React.FC<FormProps> = ({ block }) => {
    const recipient = block.recipient || 'unknown'
    const fields = block.fields || []

    const [status, setStatus] = useState('')

    const submitForm = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const form = ev.target as HTMLFormElement
        const data = new FormData(form)
        const xhr = new XMLHttpRequest()
        xhr.open(form.method, form.action)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return
            if (xhr.status === 200) {
                form.reset()
                setStatus('SUCCESS')
            } else {
                setStatus('ERROR')
            }
        }
        xhr.send(data)
    }

    const FormFieldTextArea: React.FC<{ field: Field }> = ({ field }) => (
        <FormField wide>
            <label htmlFor={slugify(field.label)}>
                {field.label}
                {field.required && ' *'}
            </label>
            <textarea
                id={slugify(field.label)}
                name={slugify(field.name)}
                required={field.required || false}
                cols={40}
                rows={5}
            ></textarea>
        </FormField>
    )

    const FormFieldInput: React.FC<{ field: Field }> = ({ field }) => (
        <FormField>
            <label htmlFor={slugify(field.label)}>
                {field.label} {field.required && ' *'}
            </label>
            <input
                id={slugify(field.label)}
                name={slugify(field.name)}
                type={field.inputType}
                autoCorrect="off"
                autoComplete={field.autocomplete || ''}
                required={field.required || false}
            />
        </FormField>
    )

    const FormFieldSubmitButton = () => (
        <FormField wide>
            <Button primary="true" type="submit" value="Submit">
                Submit
            </Button>
        </FormField>
    )

    if (status === 'SUCCESS') {
        return <p>Thanks!</p>
    }

    if (status === 'ERROR') {
        return <p>Ooops! There was an error.</p>
    }

    return (
        <StyledForm name="contact" action={`https://formspree.io/f/${recipient}`} onSubmit={submitForm} method="POST">
            {fields.map((field: Field, index: number) => {
                if (field.inputType === 'textarea') {
                    return <FormFieldTextArea key={'field-' + index} field={field} />
                } else {
                    return <FormFieldInput key={'field-' + index} field={field} />
                }
            })}
            {fields.length > 0 && <FormFieldSubmitButton />}
        </StyledForm>
    )
}

const Base = {
    name: 'customInput',
    key: 'label',
    component: 'group',
    fields: [
        { name: 'name', label: 'Name', component: 'text' },
        { name: 'label', label: 'Label', component: 'text' },
        { name: 'inputType', label: 'Input Type', component: 'text' },
        { name: 'autocomplete', label: 'Autocomplete', component: 'text' },
        { name: 'required', label: 'Required', component: 'toggle' },
    ],
}

export const CustomInputBlock = {
    label: 'Custom',
    ...Base,
}

export const NameInputBlock = {
    label: 'Name',
    defaultItem: {
        name: 'Name',
        label: 'Name',
        inputType: 'text',
        autocomplete: 'name',
        required: false,
    },
    ...Base,
}

export const EmailInputBlock = {
    label: 'Email',
    defaultItem: {
        name: 'Email',
        label: 'Email',
        inputType: 'text',
        autocomplete: 'email',
        required: false,
    },
    ...Base,
}

export const PhoneInputBlock = {
    label: 'Phone',
    defaultItem: {
        name: 'Phone',
        label: 'Phone',
        inputType: 'text',
        autocomplete: 'tel',
        required: false,
    },
    ...Base,
}

export const CompanyInputBlock = {
    label: 'Company',
    defaultItem: {
        name: 'Company',
        label: 'Company',
        inputType: 'text',
        autocomplete: 'organization',
        required: false,
    },
    ...Base,
}

export const MessageInputBlock = {
    label: 'Message',
    defaultItem: {
        name: 'Message',
        label: 'Message',
        inputType: 'textarea',
        autocomplete: '',
        required: false,
    },
    ...Base,
}

export const FormBlock = {
    label: 'Form',
    key: 'name',
    name: 'form',
    component: 'group',
    defaultItem: {
        name: 'Form',
        recipient: '',
        fields: [],
    },
    fields: [
        { name: 'name', label: 'Name', component: 'text' },
        {
            name: 'recipient',
            label: 'Recipient',
            description: 'Form is sent via formspree.io.',
            component: 'text',
        },
        {
            label: 'Fields',
            name: 'fields',
            component: 'blocks',
            templates: {
                CustomInputBlock: CustomInputBlock,
                NameInputBlock: NameInputBlock,
                EmailInputBlock: EmailInputBlock,
                PhoneInputBlock: PhoneInputBlock,
                CompanyInputBlock: CompanyInputBlock,
                MessageInputBlock: MessageInputBlock,
            },
        },
    ],
}

export const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 1.5rem;
    justify-items: stretch;

    @media (min-width: ${props => props.theme.breakpoints.medium}) {
        grid-template-columns: 1fr 1fr;
    }
`

export const FormField = styled.div<{ wide?: boolean }>`
    input,
    textarea {
        position: relative;
        line-height: 2.25rem;
        font-size: 1rem;
        padding: 0 0.625rem;
        border-radius: ${props => props.theme.radius.small};
        border: none;
        width: 100%;
        transition: box-shadow 150ms ${props => props.theme.easing};
        color: ${props => props.theme.color.foreground};
        background-color: ${props => mix(0.95, props.theme.color.background, props.theme.color.foreground)};

        &:focus {
            outline: none;
            box-shadow: 0 0 0 3px ${props => props.theme.color.secondary};
        }

        ${props =>
            props.theme.isDarkMode &&
            css`
                background-color: ${props => props.theme.color.background};
            `};
    }

    textarea {
        line-height: 1.5;
        padding: 0.5rem 0.625rem;
        resize: vertical;
    }

    label {
        display: block;
        margin-bottom: 0.25rem;
    }

    ${props =>
        props.wide &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.medium}) {
                grid-column-start: 1;
                grid-column-end: 3;
            }
        `};
`

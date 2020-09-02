import React from 'react'

import { EditButton } from './Style'
import { useCMS } from 'tinacms'

export const EditToggle: React.FC = (props: any) => {
    const cms = useCMS()
    return (
        <EditButton
            onClick={() => {
                cms.toggle()
            }}
        >
            {cms.enabled ? 'Preview' : 'Edit'}
        </EditButton>
    )
}
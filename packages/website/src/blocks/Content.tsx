import React from 'react'

interface ContentProps {
    data: any
    html: any
}

export const Content: React.FC<ContentProps> = ({ data, html }) => {
    console.log('Content', data, html)
    return (
        <div className="container">
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ContentBlock = {
    label: 'Content',
    name: 'content',
    defaultItem: {
        content: '',
    },
    fields: [{ name: 'content', label: 'Content', component: 'markdown' }],
}

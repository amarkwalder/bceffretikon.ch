import React, { useEffect } from 'react'

import 'materialize-css/dist/css/materialize.min.css'

export const Materialize: React.FC = () => {
    if (typeof window !== 'undefined') {
        require('materialize-css/dist/js/materialize.min.js')
    }
    return <></>
}

export default Materialize

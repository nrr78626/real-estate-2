import Footer from '@/Features/common/module/Footer'
import Navigation from '@/Features/common/module/Navigation/components/Navigation'
import React from 'react'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    )
}

export default DefaultLayout
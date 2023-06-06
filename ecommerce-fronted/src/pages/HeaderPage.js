import React from 'react';
import HeaderImage from '../components/HeaderImage'
import HeaderOne from '../wrappers/header/HeaderOne';


export default function HeaderPage({ pageTitle }) {
    return <>
        <HeaderImage pageTitle={pageTitle} />
    </>;
}

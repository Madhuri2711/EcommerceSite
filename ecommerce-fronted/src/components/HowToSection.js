import React from 'react'
import Buyers from '../components/Buyers'
import Sellers from '../components/Sellers'
import '../assets/css/howTo.css'

export default function HowToSection({ howTo }) {
    return (
        <div className='how-to-use'>
            <Sellers sellersData={howTo} />
            <Buyers buyersData={howTo} />
        </div>
    )
}

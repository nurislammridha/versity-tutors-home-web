import React from 'react'
import ordered from '../assets/icons/ordered.gif'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
const PlaceOrder = () => {
    const router = useRouter()
    return (<>
        {/* <div className='tik'><i class="fa fa-check" aria-hidden="true"></i></div>
                        <PrimaText
                            top='20px'
                            content='Thank You, for Your Order !'
                            size='25px'
                            weight='bold'
                        />
                        <PrimaText
                            top='5px'
                            content='Order ID: 201027452'
                            size='25px'
                            weight='bold'
                        />

                        <div></div> */}
        <div className='place'>
            <div className='place-inner'>
                <Image src={ordered} width={300} />
                <div className='txt'>Ordered Placed successfully!</div>
                <p className='fst'>You will get a response within a</p>
                <p>few minutes</p>
                <div className='btn' onClick={() => router.push("/")}>
                    Browse Home
                </div>
            </div>

        </div>
    </>)
}

export default PlaceOrder
import React from 'react'
import PrimaText from './PrimaText'
import Image from 'next/image'
import pro from '../assets/images/pro3.jpg'
import PrimaButton from './PrimaButton'
import cart from '../assets/icons/cart.png'
const Combo = () => {
    return (
        <div className='container'>
            <div className='d-combo'>
                <PrimaText
                    content='People Buy Together Combo'
                    color='#666'
                    weight='bold'
                    size='20px'
                    bottom='10px'
                    align='center'
                />
                <div className='body'>
                    <div className='page-con'>
                        <div className='page'>
                            <span>Combo</span>
                            <span>1</span>
                            <span className='select'>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                        </div>
                        <div className='right'>
                            <div className='total'>Total: 1250/-</div>
                            <div className='price'>1250/-</div>
                            <div className='save'>You save 125/- Taka (20%)</div>
                        </div>
                    </div>

                    <div className='combos'>
                        <div className='left'>
                            {[1, 2, 3, 4, 3, 4, 5, 6, 6, 6, 6, 6, 6, 5].map((_, index) => (
                                <div key={index} >
                                    <Image src={pro} className='img' />
                                    {index < 13 && <i class="fa fa-plus"></i>}
                                </div>
                            ))}
                            {/* <i class="fa fa-pause" style={{ transform: "rotate(90deg)" }}></i> */}
                        </div>
                    </div>
                    <div className='bot'>

                        <PrimaButton
                            isLeftICon
                            leftICon={cart}
                            width='160px'
                            height='40px'
                            weight='bold'
                            size='16px'
                            content='Add to cart'
                            bgColor='#9966ff'
                            color='#fff'
                            radius='20px'
                            right='10px'
                        />
                        <PrimaButton
                            isLeftICon
                            leftICon={cart}
                            width='160px'
                            height='40px'
                            weight='bold'
                            size='16px'
                            content='Order Now'
                            color='#fff'
                            bgColor='#ff66ff'
                            radius='20px'
                            left='10px'
                        />
                    </div>
                </div>
                {/* <div className='body'>
                    <div className='page'>
                        <span>Combo</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
                    <div className='combos'>
                        <div className='left'>
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <div key={index}>
                                    <Image src={pro} className='img' />
                                    {index < 4 && <i class="fa fa-plus"></i>}
                                </div>
                            ))}
                            <i class="fa fa-pause" style={{ transform: "rotate(90deg)" }}></i>
                        </div>
                        <div className='right'>
                            <div className='total'>Total: 1250/-</div>
                            <div className='price'>1250/-</div>
                            <div className='save'>You save 125/- Taka (20%)</div>
                            <PrimaButton
                                isLeftICon
                                leftICon={cart}
                                width='160px'
                                height='30px'
                                weight='bold'
                                size='14px'
                                content='Add to cart'
                                bgColor='#9966ff'
                                color='#fff'
                                radius='20px'
                                top='10px'
                            />
                            <PrimaButton
                                isLeftICon
                                leftICon={cart}
                                width='160px'
                                height='30px'
                                weight='bold'
                                size='14px'
                                content='Order Now'
                                color='#fff'
                                bgColor='#ff66ff'
                                radius='20px'
                                top='10px'
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Combo
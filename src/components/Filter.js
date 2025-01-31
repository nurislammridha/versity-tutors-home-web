"use client"
import React from 'react'
import PrimaButton from './PrimaButton'
import PrimaText from './PrimaText'
import PriceSlider from './PriceSlider'
import ReactSlider from 'react-slider'

const Filter = ({ brandsList, setBrandId, setSortBy, setPopular, setTrending, popular, trending, setPrice }) => {
    // console.log('brandsList', brandsList)
    return (
        <div className='container'>
            <div className='all-filter'>
                <PrimaButton
                    content='Trending Item'
                    color={trending ? '#FFF' : '#666'}
                    height='30px'
                    width='110px'
                    radius='20px'
                    bgColor={trending ? '#93278f' : '#f2f2f2'}
                    onClick={() => setTrending(!trending)}
                />
                <PrimaButton
                    content='Top Product'
                    color={popular ? '#FFF' : '#666'}
                    height='30px'
                    width='110px'
                    radius='20px'
                    bgColor={popular ? '#93278f' : '#f2f2f2'}
                    onClick={() => setPopular(!popular)}
                />
                <div className='bar'>
                    <PrimaText
                        content='Filter By Price'
                        color='#666'
                        size='16px'
                        right='8px'
                    />
                    <div className='slider'>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            // ariaValuetext={(state) => {
                            //     setPrice(state.value)
                            // }}
                            defaultValue={[1, 10000]}
                            min={1}
                            max={10000}
                            onChange={(value) => setPrice(value)}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            pearling
                            minDistance={100}
                        />
                    </div>
                </div>
                <div className='menu'>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div className='select'>
                    <PrimaText
                        content='Brand'
                        color='#666'
                        right='10px'
                    />
                    <select
                        onChange={(e) => setBrandId(e.target.value)}
                    >
                        <option selected>Select Brand</option>
                        {brandsList?.length > 0 && brandsList.map((item, index) => (
                            <option key={index} value={item._id}>{item.brandName}</option>
                        ))}
                    </select>
                </div>
                <div className='select'>
                    <PrimaText
                        content='Sort By'
                        color='#666'
                        right='10px'
                    />
                    <select
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option selected>Select Sort By</option>
                        <option value="price_low_high">LOW TO HIGH</option>
                        <option value="price_high_low">HIGH TO LOW</option>
                    </select>
                </div>
                <div className='filter'><i class="fa fa-filter" aria-hidden="true"></i></div>
            </div>
        </div>
    )
}

export default Filter
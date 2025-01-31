import React from 'react'
import PrimaText from './PrimaText'

const HeaderLink = ({
    catName,
    subCatName,
    subSubCatName,
    total = 0
}) => {
    return (
        <div className='container'>
            <div className='all-link'>
                <div className='item'>
                    <div className='box'></div>
                    <PrimaText
                        content={catName}
                        left='10px'
                        right='10px'
                        color='#666'
                        size='15px'
                    />
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </div>
                {subCatName &&
                    <div className='item'>
                        <div className='box'></div>
                        <PrimaText
                            content={subCatName}
                            left='10px'
                            right='10px'
                            color='#666'
                            size='15px'
                        />
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                }

                {subSubCatName &&
                    <div className='item'>
                        <div className='box'></div>
                        <PrimaText
                            content={subSubCatName}
                            left='10px'
                            right='10px'
                            color='#666'
                            size='15px'
                        />
                    </div>
                }

                <div className='found'>( We found <span>{total}</span> Item)</div>
            </div>
        </div>
    )
}

export default HeaderLink
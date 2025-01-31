import React from 'react'
import PrimaText from './PrimaText'

const IncrementDec = ({
    width = "70px",
    height = "23px",
    iWidth = "25px",
    iHeight = "25px",
    right = "0px",
    left = "0px",
    quantity = 1,
    increment,
    decrement
}) => {
    return (
        <div
            style={{
                width,
                height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#cccccc',
                position: 'relative',
                marginRight: right,
                marginLeft: left
            }}
        >
            <div
                style={{
                    width: iWidth,
                    height: iHeight,
                    borderRadius: '50%',
                    border: "3px solid #666",
                    backgroundColor: "#e6e6e6",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: "-20px",
                    fontSize: "14px",
                    cursor: 'pointer'
                }}
                onClick={decrement}
            >
                <i class="fa fa-minus" aria-hidden="true"></i>
            </div>

            <PrimaText
                content={quantity}
                size='20px'
                weight='bold'
            />
            <div
                style={{
                    width: iWidth,
                    height: iHeight,
                    borderRadius: '50%',
                    border: "3px solid #666",
                    backgroundColor: "#e6e6e6",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: "-20px",
                    fontSize: "14px",
                    cursor: 'pointer'
                }}
                onClick={increment}
            >
                <i class="fa fa-plus" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default IncrementDec
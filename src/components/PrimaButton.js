"use client"
import React, { useState } from 'react'
import PrimaText from './PrimaText'
import icn from '../assets/icons/TikTok.png'
import Image from 'next/image'
function PrimaButton({
    content = "Prima Button",
    size = "14px",
    color = "#000",
    weight = "regular",
    top = "0px",
    left = "0px",
    right = "0px",
    bottom = "0px",
    bgColor = "#FFF",
    radius = "0px",
    bWidth = "0px",
    width = "300px",
    height = "45px",
    bColor = "#FFF",
    isLeftICon = false,
    leftICon = null,
    isRightICon = false,
    rightICon = null,
    imgWidth = "35px",
    imgHeight = "35px",
    onClick,
}) {
    const [hover, setHover] = useState(false)
    const onMouseEnter = () => {
        setHover(true)
    }

    const onMouseLeave = () => {
        setHover(false)
    }
    return (
        <div
            style={{
                marginTop: top,
                marginLeft: left,
                marginRight: right,
                marginBottom: bottom,
                backgroundColor: bgColor,
                borderRadius: radius,
                borderWidth: bWidth,
                borderColor: bColor,
                borderStyle: 'solid',
                width, height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',


            }}
            // onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {isLeftICon && <Image src={leftICon} style={{ marginRight: "4px", width: imgWidth, height: imgHeight }} />}
            <PrimaText
                content={content}
                size={size}
                color={color}
                weight={weight}
            />
            {isRightICon && <Image src={rightICon} style={{ marginLeft: "5px", width: imgWidth, height: imgHeight }} />}
        </div>
    )
}

export default PrimaButton
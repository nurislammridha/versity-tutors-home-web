import React from 'react'
import PrimaText from './PrimaText'
import Image from 'next/image'
import wish from '../assets/icons/wish.svg'
const CapsulBanner = ({ width = "200px", height = "30px", content = "Add to Compare" }) => {
    return (
        <div
            style={{
                width,
                height,
                borderRadius: "20px",
                borderWidth: "2px",
                borderColor: "#cccccc",
                borderStyle: 'solid',
                backgroundColor: "#e6ffff",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                paddingLeft: "5px"
            }}
        >
            <PrimaText
                content={content}
                size='12px'
                weight='bold'
            />
            <div
                style={{
                    position: 'absolute',
                    right: "-20px",
                    backgroundColor: "#f2f2f2",
                    border: "2px solid #999999",
                    width: "40px",
                    height: '40px',
                    borderRadius: "50%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image src={wish} width={25} height={25} style={{ filter: "invert(8%) sepia(100%) saturate(6481%) hue-rotate(246deg) brightness(62%) contrast(145%)" }} />
            </div>
        </div>
    )
}

export default CapsulBanner
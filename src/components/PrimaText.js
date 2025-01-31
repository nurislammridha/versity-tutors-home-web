import React from 'react'

const PrimaText = ({ content = "Content", size = "14px", color = "#000", weight = "regular", top = "0px", left = "0px", right = "0px", bottom = "0px", align = "left" }) => {
    return (
        <div style={{ fontSize: size, color, fontWeight: weight, marginTop: top, marginLeft: left, marginRight: right, marginBottom: bottom, textAlign: align }}>
            {content}
        </div>
    )
}

export default PrimaText
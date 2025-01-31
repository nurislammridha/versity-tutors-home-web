import React from "react";

const VideoList = ({ videoUrls }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {videoUrls.map((url, index) => (
                <div key={index} style={{ width: "100%", height: "300px" }}>
                    <iframe
                        src={url}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ))}
        </div>
    );
};

export default VideoList;

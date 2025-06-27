import React from 'react';
import YouTube from 'react-youtube';

function VideoPlayer() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <YouTube videoId="9gxlb-xScxs" className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}

export default VideoPlayer;

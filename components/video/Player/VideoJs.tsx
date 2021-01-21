import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from "react-player";
import videojs from 'video.js'

import dynamic from 'next/dynamic';
import 'videojs-vr/dist/videojs-vr.min.js'

interface Props {
    source: string,
    playInline?: boolean
    playing: boolean
    muted?: boolean
    playbackRate: number,
    pip?: boolean
    volume?: number
    onCreateRef: (ref) => void
    onDuration: (duration) => void
    onProgress: (progress) => void
    onBuffer: (buffer) => void
    onReady: () => void
    onPlay: () => void
    onEnded: () => void
    onPause: () => void
    onError: (e) => void
}

export default function VideoJs(props: Props) {
    const events = [
        'loadedmetadata',
        'loadeddata',
        'canplay',
        'canplaythrough',
        'timeupdate',
        'play',
        'pause',
        'waiting',
        'playing',
        'ended',
        'error',
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [loadOnReady, setLoadOnReady] = useState(null);

    const [onDurationCalled, setOnDurationCalled] = useState(false);
    let progressTimeout;
    let durationCheckTimeout;
    const videoRef = useRef();
    const playerRef = useRef();
    const volumeRef = useRef()
    const isReadyRef = useRef(false)
    const isPlayingRef = useRef(false)
    const seekOnPlay = useRef(0);
    const prevPlayed = useRef(0);
    const prevLoaded = useRef(0);
    const playbackRateRef = useRef();
    const getDuration = () => {
        return (playerRef?.current as any).duration()
    };

    const getCurrentTime = () => {
        return (playerRef?.current as any).currentTime()
    };

    const getSecondsLoaded = () => {
        return (playerRef?.current as any).bufferedPercent()
    };
    const handlePause = (e) => {
        if (!isPlayingRef.current) {

        }
        isPlayingRef.current = false;
        if (!seekOnPlay.current) {
            props.onPause();
        }

    }
    const handleEnded = () => {
        isPlayingRef.current = false;
        if (!seekOnPlay.current) {
            props.onEnded()
        }

    }

    const handleError = (e) => {
        setIsLoading(false);
        props.onError(e)
    }
    const handlePlay = () => {
        console.log("HandlePlay", seekOnPlay.current)

        if (isPlayingRef.current) {
            return;
        }

        isPlayingRef.current = true;

        setIsLoading(false);
        props.onPlay();
        handleDurationCheck()
    };
    const handleDurationCheck = () => {
        clearTimeout(durationCheckTimeout)

        const duration = getDuration()
        console.log("onDurationCalled", duration, isReadyRef.current);
        if (duration) {
            if (!onDurationCalled) {

                props.onDuration(duration)
                setOnDurationCalled(true);
            }
        } else {
            durationCheckTimeout = setTimeout(handleDurationCheck, 100)
        }
    }

    const progress = () => {
        if (seekOnPlay.current) {
            return;
        }
        const duration = getDuration()
        const playedSeconds = getCurrentTime() || 0
        const loadedSeconds = getSecondsLoaded() * duration
        console.log("Buffered Present", loadedSeconds);

        if (duration) {
            const progress = {
                playedSeconds,
                loadedSeconds: 0,
                loaded: 0,
                played: playedSeconds / duration
            }
            if (loadedSeconds !== null) {
                progress.loadedSeconds = loadedSeconds
                progress.loaded = loadedSeconds / duration
            }
            // Only call onProgress if values have changed
            if (progress.playedSeconds !== prevPlayed.current || progress.loadedSeconds !== prevLoaded.current) {
                props.onProgress(progress)
            }

            prevPlayed.current = (progress.playedSeconds)
            prevLoaded.current = (progress.loadedSeconds)
        }

    }
    const handleReady = () => {
        console.log("setReady", isReadyRef.current, seekOnPlay.current);
        if (isReadyRef.current) {
            console.log("BlockIsReady")
            if (isPlayingRef.current && seekOnPlay.current) {
                //       (playerRef?.current as any).currentTime(seekOnPlay.current)

            }
            return;
        }
        isReadyRef.current = true;
        setIsLoading(true);
        props.onReady();
        if (volumeRef.current !== null) {
            (playerRef?.current as any).volume(volumeRef.current)
        }
        if (playbackRateRef.current !== null) {
            (playerRef?.current as any).playbackRate(playbackRateRef.current)
        }
        if (loadOnReady) {
            //  (playerRef as any)?.current?.src({src: loadOnReady});
            // (playerRef?.current as any).load()

            setLoadOnReady(null);
        } else if (isPlayingRef.current || seekOnPlay.current) {

            (playerRef?.current as any).play()
            if (seekOnPlay.current) {
                (playerRef?.current as any).currentTime(seekOnPlay.current)
                seekOnPlay.current = null;
            }

        }

        handleDurationCheck();
    }

    useEffect(() => {
        if (!(playerRef as any)?.current) {
            return;
        }
        if (props.playing) {
            (playerRef as any)?.current?.play();
        } else {
            (playerRef as any)?.current?.pause();
        }
    }, [props.playing])

    useEffect(() => {
        if (!(playerRef as any)?.current) {
            return;
        }
        console.log("SetVolume0", props.volume);
        (playerRef as any)?.current?.volume(props.volume);
        (volumeRef as any).current = props.volume;

    }, [props.volume])
    useEffect(() => {
        if (!(playerRef as any)?.current) {
            return;
        }
        console.log("SetVolume0", props.volume);
        (playerRef as any)?.current?.playbackRate(props.playbackRate);
        (playbackRateRef as any).current = props.playbackRate;

    }, [props.playbackRate])

    const handleVideoJsEvent = (event, value) => {
        console.log("event", event, props.source, (playerRef as any).current?.currentSrc())
        switch (event) {
            case 'canplay':
                handleReady();
                break;
            case 'play':
                handlePlay();
                break;
            case 'pause':
                handlePause(value);
                break;
            case 'error':
                handleError(value)
                break;
            case 'ended':
                handleEnded()
                break;
            case 'waiting':
                break;
            case 'timeupdate':
                progress();
                break;
        }
    }
    const listenEvents = () => {
        const onEdEvents = {};

        for (let i = 0; i < events.length; i += 1) {
            if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
                (event => {
                    const handleEvent = (value) => {
                        handleVideoJsEvent(event, value);
                    }
                    onEdEvents[event] = null;
                    (playerRef as any)?.current.off(event);
                    (playerRef as any)?.current.on(event, handleEvent);
                })(events[i]);
            }
        }
    }

    useEffect(() => {

        if (!props.source) {
            return;
        }

        const video = videoRef?.current as any;
        if (!video) {
            return;
        }

        if (!playerRef?.current) {
            if (props.playInline) {
                video.setAttribute('webkit-playsinline', true);
                video.setAttribute('playsInline', true);
                video.setAttribute('x5-playsinline', true);
                video.setAttribute('x5-video-player-type', 'h5');
                video.setAttribute('x5-video-player-fullscreen', false);
            }

            video.crossOrigin = true;
            video.setAttribute('crossOrigin', 'anonymous');


            playerRef.current = videojs(video, {
                controls: false,
                aspectRatio: '16:9', // 比例
                fluid: true,
                children: [],
            }, () => {
                //  (playerRef as any).current.mediainfo.projection = '360';
                (playerRef as any)?.current?.vr({ projection: '360' });
                console.log("Set VR");
                listenEvents()

            });
            (playerRef as any)?.current?.src({ src: props.source });

            props.onCreateRef(playerRef.current);
        } else {


            console.log("Source change", isPlayingRef.current, prevPlayed);
            setIsLoading(true);
            setOnDurationCalled(false);

            if (isPlayingRef.current) {
                console.log("prevPlayed", prevPlayed)
                seekOnPlay.current = prevPlayed.current;
            }
            isReadyRef.current = false;
            isPlayingRef.current = false;
            (playerRef as any)?.current?.src({ src: props.source });

        }


    }, [props.source])
    useEffect(() => {
        return () => {
            if (!(playerRef as any)?.current) {
                return;
            }
            console.log("off Envets")
            for (let i = 0; i < events.length; i += 1) {
                (event => {
                    (playerRef as any)?.current.off(event);
                })(events[i]);

            }
        }
    }, [])
    return (<video onClick={() =>  isPlayingRef?.current ? (playerRef as any)?.current.pause() : (playerRef as any)?.current.play()} ref={videoRef} width='100%'  controls={false}
                   height='100%'>

        </video>
    );
};



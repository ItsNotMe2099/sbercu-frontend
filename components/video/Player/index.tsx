import Pause from "components/svg/Pause";
import Play from "components/svg/Play";
import QualitySelect from "components/video/controls/QualitySelect";
import Duration from "components/video/Duration";

import SeekSlider from "components/video/controls/SeekSlider";
import VolumeControl from "components/video/controls/VolumeControl";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import styles from './index.module.scss'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import cx from 'classnames'
import {useThrottleFn} from '@react-cmpt/use-throttle'
import {createVideoViewHistory, getVideoViewHistory} from 'utils/requests'
import useMobileDetect from 'utils/useMobileDetect'

const VideoJs = dynamic(() => import('components/video/VideoJs'), {
    ssr: false
})

interface Props {
    poster?: string
    source: any,
    sources: any[]
    contentType?: string
    isAudio?: boolean,
    getViewHistory?: () => any
    onChangeProgress?: () => void
}

export default function Player(props) {
    const [source, setSource] = useState(null);
    const [pip, setPip] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [controls, setControls] = useState(false);
    const [light, setLight] = useState(false);
    const [volume, setVolume] = useState(50);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullScreen, setFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [loop, setLoop] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const {isMobile} = useMobileDetect();
    const manualSourceSetRes = useRef(false);
    const sourceRef = useRef(false);
    const viewHistoryRef = useRef(false);
    const playingRef = useRef(false);
    const slowInternetTimeoutRef = useRef(null);
    const showAlertTimeoutRef = useRef(null);

    const player = useRef();
    const root = useRef();

    const handleSaveViewHistory = async (progress) => {
        const currentTime = Math.ceil(progress);
        if(props.onChangeProgress) {
            props.onChangeProgress({
                currentTime: currentTime - 3 <= 0 ? currentTime : currentTime - 3,
                muted,
                volume,
                rate: playbackRate
            })
        }
    }
    const { callback: saveViewHistory, cancel: cancelSaveViewHistory, callPending: saveViewHistoryPending } = useThrottleFn(handleSaveViewHistory, 3000)

    useEffect(() => {
        setSource(props.source)
        sourceRef.current = props.source;
    }, [])


    const resetPlay = () => {
        setTimeout(() => {
            if (playingRef.current) {
                (player as any)?.current?.pause();
                setTimeout(() => {
                    (player as any)?.current?.play();
                }, 300);
            }
        }, 500)
    }
    const handleWaiting = () => {
        if( manualSourceSetRes.current){
            return;
        }
        slowInternetTimeoutRef.current = setTimeout(() => {
            if( manualSourceSetRes.current){
                return;
            }
            const currentIndex = props.sources.findIndex(i => i.value === sourceRef.current);
            if(currentIndex > 0){
                const newSource = props.sources[currentIndex - 1];
                if( showAlertTimeoutRef.current){
                    clearTimeout( showAlertTimeoutRef.current);
                }
                setSource(newSource.value);
                showAlertTimeoutRef.current = setTimeout(() => {
                    setShowAlert(false);
                }, 3000)
                setShowAlert(true);
                sourceRef.current = newSource.value;
                resetPlay();
                handleWaiting();
            }
              }, 5000);
    }
    const handlePlaying = () => {
         if(slowInternetTimeoutRef.current ){
            clearTimeout(slowInternetTimeoutRef.current)
            slowInternetTimeoutRef.current = null;
        }
    }
    const handlePlayPause = (e) => {
        e.stopPropagation();
        e.preventDefault()
       if (!playing) {
                 (player as any)?.current?.play();
        } else {
               (player as any)?.current?.pause();
        }
        setPlaying((playing) => !playing);
        playingRef.current = !playing;

    }

    const handleStop = () => {
        setSource(null);
        sourceRef.current = null;
        setPlaying(false);
        playingRef.current = false;
    }


    const handleVolumeChange = value => {
        setVolume(value);
    }

    const handleToggleMuted = () => {
        setMuted((muted) => !muted);
    }

    const handleSetPlaybackRate = e => {
        setPlaybackRate(e.value);
    }

    const handleTogglePIP = () => {
        setPip((pip) => !pip);
    }

    const handlePlay = () => {
        setPlaying(true);
        playingRef.current = true;
    }

    const handleEnablePIP = () => {
        setPip(true);
    }

    const handleDisablePIP = () => {

        setPip(false);
    }

    const handlePause = () => {
        setPlaying(false);
        playingRef.current = false;
    }


    const handleSeekChange = value => {
        setPlayed(value / duration);
        (player?.current as any).currentTime(value);
    }


    const handleProgress = state => {
        setPlayed(state.played);
        setLoaded(state.loaded);
        saveViewHistory(state.playedSeconds);
    }

    const handleEnded = () => {
        setPlaying(false);
        playingRef.current = false;
        props.onChangeProgress({
            currentTime: 0,
            muted,
            volume,
            rate: playbackRate
        })
    }

    const handleDuration = async (duration) => {
        setDuration(duration);

        if(props.getViewHistory && !viewHistoryRef.current) {
            const viewHistory = await props.getViewHistory();
            if (viewHistory?.currentTime && viewHistory.currentTime < duration && viewHistory.currentTime > 0) {
                handleSeekChange(viewHistory?.currentTime);
                setPlayed(viewHistory?.currentTime / duration);
                (player?.current as any).currentTime(viewHistory?.currentTime);

                setVolume(viewHistory.volume);
            }
            viewHistoryRef.current = true;
            if(playingRef.current){
                resetPlay();
            }
        }
    }

    const handleClickFullscreen = (event) => {
        if (player?.current) {
            if (fullScreen) {
                (screenfull as any).exit();
            }else {
                (screenfull as any).request(findDOMNode(root?.current))
            }
            setFullscreen(f => !f);
        }
    }

    const renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    }
    const handleReady = () => {

    }
    const handleChangeCurrentTime = (value) => {
    }
    const handleSourceChange = (item) => {

        setLoaded(0);
        setPip(false);
        setSource(item.value);
        sourceRef.current = item.value;
        manualSourceSetRes.current = true;

    }

    return (<div className={cx(styles.root, {
        [styles.fullSize]: props.fullSize,
          [styles.audio]: props.isAudio,
          [styles.audioNoPoster]: props.isAudio && !props.poster,
    })} ref={root}>
            {/*<ReactPlayer
              ref={player}
              className={styles.player}
              width='100%'
              height='100%'
              url={source}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={handleReady}
              onStart={() => console.log('onStart')}
              onPlay={handlePlay}
              onEnablePIP={handleEnablePIP}
              onDisablePIP={handleDisablePIP}
              onPause={handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={handleProgress}
              onDuration={handleDuration}
          />*/}
          <div style={{background: 'black', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: 0, borderRadius: '7px'}}/>
            <VideoJs
                isAudio={props.isAudio}
                contentType={props.contentType}
                poster={props.poster}
                playing={playing}
                onCreateRef={(ref) => player.current = ref}
                source={source}
                playbackRate={playbackRate}
                volume={volume / 100}
                onDuration={handleDuration}
                onProgress={handleProgress}
                onPlay={handlePlay}
                onEnded={handleEnded}
                onPause={handlePause}
                onError={e => console.log('onError', e)}
                onReady={handleReady}
                onWaiting={handleWaiting}
                onPlaying={handlePlaying}
                onBuffer={() => console.log('onBuffer')}
            />

         <div className={styles.shadow}></div>
        {isMobile() && <div className={styles.playBg}  onClick={handlePlayPause}></div>}
        <div className={cx(styles.alert, {[styles.showAlert]: showAlert})}><div className={styles.circle}/>Плохой интернет. Качество видео уменьшено.</div>
          <div className={styles.controls}>
                <div className={styles.progress}>
                    <SeekSlider hideHoverTime={false} fullTime={duration} bufferColor={'#D4ECDE'} bufferProgress={duration * loaded}
                                currentTime={duration * played} onChange={handleSeekChange}
                                onChangeCurTime={handleChangeCurrentTime}/>
                </div>
                <div className={styles.controlsBar}>
                    <div className={styles.controlsLeft}>
                        <div className={styles.playButton} onClick={handlePlayPause}>{playing ? <Pause/> :
                            <Play/>}</div>
                        <div className={styles.progressText}><Duration seconds={duration * played}/>
                            <div className={styles.progressSeparator}>/</div>
                            <Duration seconds={duration}/></div>

                    </div>
                    {/*<div className={styles.pictureInPicture} onClick={handleTogglePIP}><img src={'/img/icons/picture_in_picture.svg'}/></div>*/}
                    <VolumeControl value={volume} onChange={handleVolumeChange}/>

                    <div className={styles.playbackRateSelect}>
                        <QualitySelect options={[
                            { value: 0.25, label: '0.25x' },
                            { value: 0.5, label: '0.5x' },
                            { value: 0.75, label: '0.75x' },
                            { value: 1.0, label: '1x' },
                            { value: 1.25, label: '1.25x' },
                            { value: 1.5, label: '1.5x' },
                            { value: 1.75, label: '1.75x' },
                            { value: 2, label: '2x' },
                        ]} value={playbackRate} onChange={handleSetPlaybackRate}/>
                    </div>
                    {props.sources.length > 0 && <div className={styles.qualitySelect}>
                        <QualitySelect options={props.sources} value={source} onChange={handleSourceChange}/>
                    </div>}
                    {!props.isAudio && <div className={styles.fullscreen} onClick={handleClickFullscreen}><img
                        src={'/img/icons/video_fullscreen.svg'}/></div>}
                </div>
            </div>
        </div>
    );
};



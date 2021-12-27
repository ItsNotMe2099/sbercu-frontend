import Pause from "components/svg/Pause";
import Play from "components/svg/Play";
import Button from "components/ui/Button";
import QualitySelect from "components/video/controls/QualitySelect";
import Duration from "components/video/Duration";
import SeekSlider from "components/video/controls/SeekSlider";
import VolumeControl from "components/video/controls/VolumeControl";
import EditorCutInfo from "components/video/Editor/EditorCutInfo";
import EditorTrimmer from "components/video/Editor/EditorTrimmer";
import EditorTooltip from "components/video/Editor/EditorTooltip";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from 'react'
import { IVideoTrimRange } from "types";
import styles from './index.module.scss'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'

const VideoJs = dynamic(() => import('components/video/VideoJs'), {
    ssr: false
})

interface Props {
    poster: string
    source: any,
    sources: any[],
    onCancel: (cutItems, duration) => void
    onSubmit:(cutItems, duration) => void
}

export default function VideoEditor(props: Props) {
    const [source, setSource] = useState(null);
    const [pip, setPip] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [controls, setControls] = useState(false);
    const [light, setLight] = useState(false);
    const [volume, setVolume] = useState(50);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [loop, setLoop] = useState(false);

    const [fullScreen, setFullscreen] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const player = useRef();
    const root = useRef();

    const timeOutRef = useRef(null);
    const tooltipRef = useRef(null);
    const rangeRef = useRef(null);
    const currentSecondsRef = useRef(null);
    const [currentSecond, setCurrentSecond] = useState(0);

    const [cutItems, setCutItems] = useState([]);
    useEffect(() => {
        setSource(props.source)
    }, [])

    const handlePlayPause = () => {
        if (!playing) {
            (player as any)?.current?.play();
        } else {
            (player as any)?.current?.pause();
        }
        setPlaying((playing) => !playing);
    }

    const handleStop = () => {
        setSource(null);
        setPlaying(false);
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
        console.log('onPlay')
        setPlaying(true);
    }

    const handleEnablePIP = () => {
        console.log('onEnablePIP')
        setPip(true);
    }

    const handleDisablePIP = () => {

        setPip(false);
    }

    const handlePause = () => {
        console.log('handlePause')
        setPlaying(false);
    }


    const handleSeekChange = value => {
        console.log("SeekChange", value, loaded);
        setPlayed(value / duration);
        console.log("SeekChange111", value, value / duration, (value / duration) * duration);
        (player?.current as any).currentTime(value);
    }


    const handleProgress = state => {
        console.log("handleProgress", state)
        setPlayed(state.played);
        setLoaded(state.loaded);
    }

    const handleEnded = () => {
        setPlaying(loop);
    }

    const handleDuration = (duration) => {
        setDuration(duration);
    }

    const handleClickFullscreen = () => {
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
        console.log("handleChangeCurrentTime", value);
    }
    const handleSourceChange = (item) => {
        console.log("setSource", item.value)

        setLoaded(0);
        setPip(false);
        setSource(item.value);

    }


    const handleMouseMove = (e) => {
        if (!tooltipRef?.current) {
            return;
        }
        if(timeOutRef?.current){
            clearTimeout(timeOutRef.current)
        }
        if(  tooltipRef.current.style.display === 'none') {
            tooltipRef.current.style.display = 'flex'
        }
        const sliderWidth = rangeRef?.current.offsetWidth;

        const percent = e.clientX / sliderWidth;

        setCurrentSecond(duration * percent)
        currentSecondsRef.current = Math.ceil(duration * percent);

        const tooltipWidth = tooltipRef?.current.offsetWidth;
        let positionTooltipLeft = e.clientX;
        if (positionTooltipLeft - (tooltipWidth / 2) < 0) {
            positionTooltipLeft = 0;
        } else {
            positionTooltipLeft = positionTooltipLeft - (tooltipWidth / 2);
        }
        tooltipRef.current.style.left = `${positionTooltipLeft - 10}px`;

    }
    const handleMouseLeave = () => {
        if (!tooltipRef?.current) {
            return;
        }
        timeOutRef.current = setTimeout(() => {
            tooltipRef.current.style.display = 'none'
        }, 300)

    }
    const handleMouseEnter = () => {
        if (!tooltipRef?.current) {
            return;
        }
        if(timeOutRef?.current){
            clearTimeout(timeOutRef.current)
        }
        tooltipRef.current.style.display = 'flex'
    }

    const handleAddCutRegion = () => {
        const seconds =  currentSecondsRef.current;
        console.log("HandleCut", seconds);
        const range = duration * 0.01
        const start = Math.floor(seconds - range /2);
        const end = Math.floor(seconds + range /2);

        const overlapsRegion = cutItems.find((it) => (start >= it.start && start <= it.end) || (end >= it.start && end <= it.end)  )
        if(overlapsRegion){

            if((start >= overlapsRegion.start && start <= overlapsRegion.end) && (end >= overlapsRegion.start && end <= overlapsRegion.end)){
                console.log("TOTAL OverLaps")
            }else if((start >= overlapsRegion.start && start <= overlapsRegion.end)){
                console.log("OnlyStartOverlaps")
            }else{
                console.log("OnlyEndOverlaps")
            }
            console.log("OverLaps!!", overlapsRegion);
            return;
        }
        const trimItem : IVideoTrimRange = {
           id: `${start}${end}`, start, end, color: 'red'
        }

        console.log("vutIyems", [...cutItems, trimItem])
        setCutItems((items) => ([...items, trimItem].sort((a, b) => a.start < b.start ? -1 : a.start > b.start  ? 1 : 0 )));
    }
    const handleChangeTrimmer = (value) => {
        setCutItems(value);
    }
    const handleClear = () => {
        setCutItems([]);
    }
    const handleDelete = (item) => {
        setCutItems(items => items.filter(i => i.id != item.id));
    }
    useEffect(() => {
    }, [cutItems])
    return (<div className={styles.root} ref={root} id={'video-editor'}>
            <EditorCutInfo cutItems={cutItems} duration={duration} onSeek={handleSeekChange} onClear={handleClear} onDelete={handleDelete} onSetCutItems={handleChangeTrimmer}/>

            <VideoJs
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
                onBuffer={() => console.log('onBuffer')}
            />
            <div className={styles.shadow}></div>
            <div className={styles.controls}>

                    <EditorTooltip  rootRef={tooltipRef} cutItems={cutItems}  seconds={currentSecond} onAdd={handleAddCutRegion} onMouseMove={handleMouseMove}  onMouseLeave={handleMouseLeave}  onMouseEnter={handleMouseEnter} onDelete={handleDelete}/>


                <div className={styles.sliderWrapper} ref={rangeRef} onMouseMove={handleMouseMove}  onMouseLeave={handleMouseLeave}
                     onMouseEnter={handleMouseEnter}>
                    <EditorTrimmer duration={duration} trimItems={cutItems} onChange={handleChangeTrimmer}/>
                    <div className={styles.progress}>
                        <SeekSlider fullTime={duration} bufferColor={'#D4ECDE'} bufferProgress={duration * loaded}
                                    currentTime={duration * played} onChange={handleSeekChange}
                                    onChangeCurTime={handleChangeCurrentTime}/>
                    </div>
                </div>
                <div className={styles.controlsBar}>
                    <div className={styles.controlsLeft}>
                        <div className={styles.playButton} onClick={handlePlayPause}>{playing ? <Pause/> :
                            <Play/>}</div>
                        <div className={styles.progressText}><Duration seconds={duration * played} showMs/>
                            <div className={styles.progressSeparator}>/</div>
                            <Duration seconds={duration} showMs/></div>

                    </div>
                    {/*<div className={styles.pictureInPicture} onClick={handleTogglePIP}><img src={'/img/icons/picture_in_picture.svg'}/></div>*/}
                    <div className={styles.submitActions}>
                        {cutItems.length > 0 && <Button className={styles.saveButton} green size="5px 15px" onClick={() => props.onSubmit(cutItems, duration)}>{'Сохранить'}</Button>}
                    <Button  transparent textWhite size="5px 15px" onClick={() => props.onCancel(cutItems, duration)}>{'Отмена'}</Button>
                    </div>
                    <VolumeControl value={volume} onChange={handleVolumeChange}/>

                    <div className={styles.playbackRateSelect}>
                        <QualitySelect options={[
                            { value: 1.0, label: '1x' },
                            { value: 1.5, label: '1.5x' },
                            { value: 2, label: '2x' },
                            { value: 4, label: '4x' },
                        ]} value={playbackRate} onChange={handleSetPlaybackRate}/>
                    </div>
                    <div className={styles.qualitySelect}>


                        <QualitySelect options={props.sources} value={source} onChange={handleSourceChange}/>
                    </div>
                    <div className={styles.fullscreen} onClick={handleClickFullscreen}><img
                        src={'/img/icons/video_fullscreen.svg'}/></div>
                </div>
            </div>
        </div>
    );
};



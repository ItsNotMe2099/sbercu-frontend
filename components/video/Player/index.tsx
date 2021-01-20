import Pause from "components/svg/Pause";
import Play from "components/svg/Play";
import Duration from "components/video/Player/Duration";
import QualitySelect from "components/video/Player/QualitySelect";
import SeekSlider from "components/video/Player/SeekSlider";
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import styles from './index.module.scss'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
interface Props {
    source: any,
    sources: any[]
}
export default function Player(props) {

    console.log("Sources", props.sources, props.source);
    const [source, setSource] = useState(null);
    const [pip, setPip] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [controls, setControls] = useState(false);
    const [light, setLight] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [loop, setLoop] = useState(false);
    const [seeking, setSeeking] = useState(false);

    useEffect(() => {
        setSource(props.source)
    }, [])
    const player = useRef();
    const handlePlayPause = () => {
        setPlaying((playing) => !playing );
    }

    const  handleStop = () => {
        setSource(null);
        setPlaying(false);
    }

    const handleToggleControls = () => {
        const url = this.state.url
        setControls((controls) => !controls);
        setUrl(null);
        //load(url);
    }

    const  handleToggleLight = () => {
        setLight((light) => !light);
    }

    const  handleToggleLoop = () => {
        setLoop((loop) => !loop);
    }

    const   handleVolumeChange = e => {
        setVolume(parseFloat(e.target.value) );
    }

    const  handleToggleMuted = () => {
        setMuted((muted) => !muted);
    }

    const  handleSetPlaybackRate = e => {
        setPlaybackRate(parseFloat(e.target.value));
    }

    const  handleTogglePIP = () => {
        setPip((pip) => !pip);
    }

    const  handlePlay = () => {
        console.log('onPlay')
        setPlaying(true);
    }

    const  handleEnablePIP = () => {
        console.log('onEnablePIP')
        setPip(true);
    }

    const  handleDisablePIP = () => {

        setPip(false);
    }

    const  handlePause = () => {
        console.log('onPause')
        setPlaying(false);
    }



    const  handleSeekChange = value => {
        console.log("SeekChange", value, loaded);
            setPlayed(value/duration);
        (player?.current as any).seekTo(value);
    }


    const   handleProgress = state => {
        setPlayed(state.played);
        setLoaded(state.loaded);
    }

    const  handleEnded = () => {
        setPlaying(loop);
    }

    const  handleDuration = (duration) => {
        setDuration(duration);
    }

    const  handleClickFullscreen = () => {
        (screenfull as any).request(findDOMNode(this.player))
    }

    const  renderLoadButton = (url, label) => {
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
        setPlaying(false);
        setLoaded(0);
        setPip(false);
        setSource(item.value);
        setTimeout(() => {
            if(played > 0) {
                (player?.current as any).seekTo(played);
                setPlaying(true);
            }
        }, 200)
    }
  return (<div className={styles.root}>
          <ReactPlayer
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
          />
          <div className={styles.controls}>
              <div className={styles.controlsBar}>
               <div className={styles.controlsLeft}>
                  <div className={styles.playButton} onClick={handlePlayPause}>{playing ? <Pause/> : <Play/>}</div>
                  <div className={styles.progressText}><Duration seconds={duration * played}/><div className={styles.progressSeparator}>/</div><Duration seconds={duration}/></div>

               </div>
                  <div className={styles.qualitySelect}>
                  <QualitySelect options={props.sources} value={source} onChange={handleSourceChange}/>
                  </div>
              </div>
              <div className={styles.progress}>
                  <SeekSlider fullTime={duration} bufferColor={'#D4ECDE'}  bufferProgress={duration * loaded} currentTime={duration * played} onChange={handleSeekChange} onChangeCurTime={handleChangeCurrentTime}/>
              </div>
          </div>
  </div>
  );
};



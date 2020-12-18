import React from 'react'
import ReactPlayer from 'react-player'
import styles from './index.module.scss'

export default function Player(props) {
  return (
      <ReactPlayer url='http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4'
      className={styles.player}
      controls
      width='100%'
      height='100%'
      />
  );
};



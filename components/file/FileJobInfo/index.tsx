import React, { useRef } from "react";
import { ICatalogEntry } from "types";
import {formatJobStatusName, formatSeconds, formatSize} from "utils/formatters";
import styles from './index.module.scss'
import Dots from "components/svg/Dots";
import {Circle} from 'rc-progress'
import Cross from 'components/svg/Cross'
interface FileJobProps{
  item: ICatalogEntry
}
export const FileJobInfo = ({item}: FileJobProps) => {
  const job = item?.media?.lastJob;
  console.log("estimatedTimeInSeconds", job?.estimatedTimeInSeconds)
  return <div className={styles.jobInfo}>

    {['pending'].includes(job.state) && <div className={styles.statusIcon} style={{borderColor: '#F2C94C'}}><Dots color={'#F2C94C'}/></div>}

    {['canceled'].includes(job.state) && <div className={styles.statusIcon} style={{borderColor: '#F2C94C'}}><Cross color={'#F2C94C'}/></div>}
    {['error'].includes(job.state) && <div className={styles.statusIcon} style={{borderColor: '#EB5757'}}><Cross color={'#EB5757'}/></div>}

    {['finished'].includes(job.state) && <div className={styles.statusIcon}><img src={'/img/icons/mark.svg'}/></div>}
    {['started'].includes(job.state) && <div className={styles.loader}>
        <div className={styles.progressCircle}>
            <Circle percent={job.progress?.percent} strokeWidth={4} strokeColor="#27AE60"/>
        </div>
        <div className={styles.loaderProgress}>{job.progress?.percent > 100 ? 100 : job.progress?.percent?.toFixed(1)}%</div>
    </div>}
    <div className={styles.status}>
      {formatJobStatusName(job.state)}
      {job?.estimatedTimeInSeconds > 0 && <div className={styles.estimate}>
        Осталось: ~{formatSeconds(job?.estimatedTimeInSeconds)}
      </div>}
    </div>

  </div>
}
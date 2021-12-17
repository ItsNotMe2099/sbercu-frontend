import ButtonDots from "components/ui/ButtonDots";
import {format} from "date-fns";
import {IJob, IUser} from "types";
import styles from './index.module.scss'
import {formatJobDuration, formatJobStatusName, formatSize} from "utils/formatters";
import {Circle} from "rc-progress";
import React from "react";
import Cross from "components/svg/Cross";
import Dots from "components/svg/Dots";
import Link from "next/link";
interface Props {
    job: IJob
    onCancelClick?: (item: IJob) => void
    onDeleteClick?: (item: IJob) => void
}

export default function JobListRow({job, onCancelClick, onDeleteClick}: Props) {

    const handleCancelClick = () => {
        if (onCancelClick) {
            onCancelClick(job)
        }
    }
    const handleDeleteClick = () => {
        if (onDeleteClick) {
            onDeleteClick(job)
        }
    }
    const getTypeName = (type) => {
        switch (type) {
            case 'converting':
                return 'Конвертация';
            case  'cutting':
                return 'Редактирование';
        }
    }

    return (
        <>
            <div className={styles.root}>
                <div className={`${styles.cell}`}>{job.id}</div>
                <div className={`${styles.cell} ${styles.cellFileInfo}`}>
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
                    <div className={styles.fileInfo}>
                        <div className={styles.fileName}>
                            {job.catalog && <Link href={`/video/${job.catalog?.id}`}  >{job.catalog?.name}</Link>}
                        </div>
                        <div className={styles.additionalInfo}>
                            <div className={styles.greyText}>{getTypeName(job.type)}</div>
                            <div className={styles.separator}></div>
                            {job.media?.size && <div className={styles.greyText}>{formatSize(job.media?.size)}</div>}
                            <div className={styles.separator}></div>
                            {job.codecInfo?.duration &&
                            <div className={styles.greyText}>{formatJobDuration(job.codecInfo?.duration)}</div>}
                        </div>
                    </div>
                </div>
                <div className={`${styles.cell}`}>{job.user?.firstName} {job.user?.lastName}</div>
                <div className={`${styles.cell} ${styles.cellStat}`}>
                    {job.createdAt && <div>Создано: {format(new Date(job.createdAt), 'dd.MM.yyy HH:mm')}</div>}
                    <div className={styles.statRange}> {job.startedAt && job.finishedAt && <div>{format(new Date(job.startedAt), 'dd.MM.yyy HH:mm')} - {format(new Date(job.finishedAt), 'dd.MM.yyy HH:mm')}</div>}</div>
                </div>
                <div className={`${styles.cell}`}></div>

                <div className={`${styles.cell} ${styles.editCell}`}>
                    {['pending', 'canceled', 'started'].includes(job.state) &&<ButtonDots onDeleteClick={handleDeleteClick} onCancelClick={handleCancelClick} showCancel={['started'].includes(job.state)} showEdit={false} showDelete={['pending', 'canceled'].includes(job.state)} showCopy={false} />}
                </div>
            </div>
            <div className={styles.root__mobile}>
                <div className={styles.row}>
                    <div className={styles.name}>{job.id}</div>
                    <div className={`${styles.editCell}`}>
                        {['pending', 'canceled', 'started'].includes(job.state) && <ButtonDots onDeleteClick={handleDeleteClick} onCancelClick={handleCancelClick} showCancel={['started'].includes(job.state)} showPaste={false} showDelete={['pending', 'canceled'].includes(job.state)} showEdit={false} showCopy={false} />}
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>      {job.catalog?.name}</div>
                    <div className={styles.greyText}>Файл</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>{job.progress?.percent?.toFixed(0)}%</div>
                    <div className={styles.greyText}>Прогресс</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>{formatJobStatusName(job.state)}</div>
                    <div className={styles.greyText}>Статус</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>{getTypeName(job.type)}</div>
                    <div className={styles.greyText}>Тип</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>{format(new Date(job.createdAt), 'dd.MM.yyy HH:mm')}</div>
                    <div className={styles.greyText}>Время создания</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>{formatSize(job.media?.size)}</div>
                    <div className={styles.greyText}>Размер</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>{formatJobDuration(job.codecInfo?.duration)}</div>
                    <div className={styles.greyText}>Длительность</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>{job.user?.firstName} {job.user?.lastName}</div>
                    <div className={styles.greyText}>Пользователь</div>
                </div>

            </div>
        </>
    )
}

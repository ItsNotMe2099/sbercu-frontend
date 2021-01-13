import ContentLoader from 'react-content-loader'
import Layout from 'components/layout/Layout';
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { IRootState } from "types";

interface Props{
}

export default function SearchSuggestionLoader(props: Props){

  return (
    <div className={styles.root}>
      <div className={styles.loading}><span>Загружаем результаты</span></div>
      <div className={styles.separator}></div>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        height={11}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="56" height="11" />
      </ContentLoader>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        height={8}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="151" height="8" />
      </ContentLoader>
      <div className={styles.separatorMini}></div>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        height={20}
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="238" height="8" />
        <rect x="0" y="12" rx="0" ry="0" width="142" height="8" />
      </ContentLoader>
      <div className={styles.separatorMini}></div>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        height={20}
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="238" height="8" />
        <rect x="0" y="12" rx="0" ry="0" width="142" height="8" />
      </ContentLoader>
      <div className={styles.separatorAvrg}></div>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        height={11}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="56" height="11" />
      </ContentLoader>
      <div className={styles.separatorMini}></div>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        height={20}
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="17" height="6" />
        <rect x="0" y="0" rx="0" ry="0" width="6" height="17" />
        <rect x="0" y="12" rx="0" ry="0" width="17" height="6" />
        <rect x="12" y="0" rx="0" ry="0" width="6" height="17" />
        <rect x="26" y="0" rx="0" ry="0" width="238" height="8" />
        <rect x="26" y="12" rx="0" ry="0" width="142" height="8" />
      </ContentLoader>
      <div className={styles.separatorAvrg}></div>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        height={20}
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="17" height="6" />
        <rect x="0" y="0" rx="0" ry="0" width="6" height="17" />
        <rect x="0" y="12" rx="0" ry="0" width="17" height="6" />
        <rect x="12" y="0" rx="0" ry="0" width="6" height="17" />
        <rect x="26" y="0" rx="0" ry="0" width="238" height="8" />
        <rect x="26" y="12" rx="0" ry="0" width="142" height="8" />
      </ContentLoader>
      <div className={styles.separatorAvrg}></div>
      <ContentLoader
        speed={1}
        style={{ width: '100%' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        height={20}
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="17" height="6" />
        <rect x="0" y="0" rx="0" ry="0" width="6" height="17" />
        <rect x="0" y="12" rx="0" ry="0" width="17" height="6" />
        <rect x="12" y="0" rx="0" ry="0" width="6" height="17" />
        <rect x="26" y="0" rx="0" ry="0" width="238" height="8" />
        <rect x="26" y="12" rx="0" ry="0" width="142" height="8" />
      </ContentLoader>
  </div>
  )
}

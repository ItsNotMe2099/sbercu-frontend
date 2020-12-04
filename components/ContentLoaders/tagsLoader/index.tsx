import ContentLoader from 'react-content-loader'
import Layout from 'components/layout/Layout';
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { IRootState } from "types";

interface Props{
}

export default function TagsLoader(props: Props){

  return (
    <>
    <div className={styles.root}>
    <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="100" height="15" />
    <rect x="0" y="70" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="120" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="120" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="120" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="132" r="14" width="27" height="27"/>

  </ContentLoader>
  <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    style={{ marginTop: '24px' }}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="80" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="92" r="14" width="27" height="27"/>
    
  </ContentLoader>
  <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="80" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="92" r="14" width="27" height="27"/>
    
  </ContentLoader>
  <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="80" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="92" r="14" width="27" height="27"/>
    
  </ContentLoader>
  <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="80" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="92" r="14" width="27" height="27"/>
    
  </ContentLoader>
  <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="80" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="92" r="14" width="27" height="27"/>
    
  </ContentLoader>
  <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="80" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="92" r="14" width="27" height="27"/>
    
  </ContentLoader>
  <ContentLoader
    speed={1}
    width={1250}
    height={150}
    viewBox="0 0 1250 150"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="15" />
    <rect x="0" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="80" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="80" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="92" r="14" width="27" height="27"/>
    
  </ContentLoader>
  </div>
    </>
  )
}

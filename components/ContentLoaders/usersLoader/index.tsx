import ContentLoader from 'react-content-loader'
import styles from './index.module.scss'

interface Props{
  showFilters: boolean
}

export default function UsersLoader({showFilters, ...props}: Props){

  return (
    <>
    <div className={styles.root}>
      {showFilters && <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={190}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="100" height="15" />
    <rect x="0" y="70" rx="20" ry="20" width="120" height="27" />
    <rect x="136" y="70" rx="20" ry="20" width="120" height="27" />
    <rect x="272" y="70" rx="20" ry="20" width="120" height="27" />
    <circle cx="424" cy="82" r="14" width="27" height="27"/>
    <rect x="0" y="130" rx="5" ry="5" width="430" height="32"/>
  </ContentLoader>}
   {showFilters && <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={25}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="150" height="14" />
    <rect x="250" y="0" rx="0" ry="0" width="150" height="14" />
    <rect x="500" y="0" rx="0" ry="0" width="150" height="14" />
    <rect x="750" y="0" rx="0" ry="0" width="150" height="14" />
    <rect x="1000" y="0" rx="0" ry="0" width="150" height="14"/>
  </ContentLoader>}
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={50}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="250" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="500" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="750" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="1000" y="15" rx="0" ry="0" width="150" height="14"/>
    <rect x="1200" y="10" rx="5" ry="5" width="30" height="30"/>
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={50}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="250" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="500" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="750" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="1000" y="15" rx="0" ry="0" width="150" height="14"/>
    <rect x="1200" y="10" rx="5" ry="5" width="30" height="30"/>
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={50}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="250" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="500" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="750" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="1000" y="15" rx="0" ry="0" width="150" height="14"/>
    <rect x="1200" y="10" rx="5" ry="5" width="30" height="30"/>
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={50}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="250" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="500" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="750" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="1000" y="15" rx="0" ry="0" width="150" height="14"/>
    <rect x="1200" y="10" rx="5" ry="5" width="30" height="30"/>
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={50}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="250" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="500" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="750" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="1000" y="15" rx="0" ry="0" width="150" height="14"/>
    <rect x="1200" y="10" rx="5" ry="5" width="30" height="30"/>
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={50}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="250" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="500" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="750" y="15" rx="0" ry="0" width="150" height="14" />
    <rect x="1000" y="15" rx="0" ry="0" width="150" height="14"/>
    <rect x="1200" y="10" rx="5" ry="5" width="30" height="30"/>
  </ContentLoader>
  </div>



  <div className={styles.root__mobile}>
    <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={190}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="100" height="15" />
    <rect x="0" y="70" rx="20" ry="20" width="120" height="27" />
    <circle cx="150" cy="82" r="14" width="27" height="27"/>
    <rect x="0" y="130" rx="5" ry="5" width="430" height="32"/>
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={140}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="15" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="41" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="41" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="67" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="67" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="93" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="93" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="119" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="119" rx="0" ry="0" width="35" height="18" />
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={140}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="15" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="41" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="41" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="67" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="67" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="93" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="93" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="119" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="119" rx="0" ry="0" width="35" height="18" />
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={140}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="15" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="41" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="41" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="67" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="67" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="93" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="93" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="119" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="119" rx="0" ry="0" width="35" height="18" />
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={140}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="15" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="41" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="41" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="67" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="67" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="93" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="93" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="119" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="119" rx="0" ry="0" width="35" height="18" />
  </ContentLoader>
  <ContentLoader
    speed={1}
    style={{ width: '100%'}}
    height={140}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="1" />
    <rect x="0" y="15" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="15" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="41" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="41" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="67" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="67" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="93" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="93" rx="0" ry="0" width="35" height="18" />
    <rect x="0" y="119" rx="0" ry="0" width="128" height="18" />
    <rect x="228" y="119" rx="0" ry="0" width="35" height="18" />
  </ContentLoader>
  </div>
    </>
  )
}

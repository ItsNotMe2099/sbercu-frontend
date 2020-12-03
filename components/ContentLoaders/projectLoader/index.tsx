import ContentLoader from 'react-content-loader'
import Layout from 'components/layout/Layout';
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { IRootState } from "types";

interface Props{
}

export default function ProjectLoader(props: Props){

  return (
    <>
    <div className={styles.root}>
    <ContentLoader
    speed={1}
    width={1250}
    height={800}
    viewBox="0 0 1250 800"
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="359" height="10" />

    <rect x="0" y="60" rx="0" ry="0" width="1059" height="1" />
    <rect x="10" y="71" width="39" height="6"/>
    <rect x="10" y="98" width="39" height="6"/>
    <rect x="10" y="71" width="6" height="31"/>
    <rect x="43" y="71" width="6" height="31"/>
    <rect x="64" y="71" width="984" height="10"/>
    <rect x="64" y="93" width="450" height="10"/>
    <rect x="0" y="120" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="132" width="39" height="6"/>
    <rect x="10" y="159" width="39" height="6"/>
    <rect x="10" y="132" width="6" height="31"/>
    <rect x="43" y="132" width="6" height="31"/>
    <rect x="64" y="132" width="984" height="10"/>
    <rect x="64" y="154" width="450" height="10"/>
    <rect x="0" y="181" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="193" width="39" height="6"/>
    <rect x="10" y="220" width="39" height="6"/>
    <rect x="10" y="193" width="6" height="31"/>
    <rect x="43" y="193" width="6" height="31"/>
    <rect x="64" y="193" width="984" height="10"/>
    <rect x="64" y="215" width="450" height="10"/>
    <rect x="0" y="242" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="254" width="39" height="6"/>
    <rect x="10" y="281" width="39" height="6"/>
    <rect x="10" y="254" width="6" height="31"/>
    <rect x="43" y="254" width="6" height="31"/>
    <rect x="64" y="254" width="984" height="10"/>
    <rect x="64" y="276" width="450" height="10"/>
    <rect x="0" y="303" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="315" width="39" height="6"/>
    <rect x="10" y="342" width="39" height="6"/>
    <rect x="10" y="315" width="6" height="31"/>
    <rect x="43" y="315" width="6" height="31"/>
    <rect x="64" y="315" width="984" height="10"/>
    <rect x="64" y="337" width="450" height="10"/>
    <rect x="0" y="364" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="376" width="39" height="6"/>
    <rect x="10" y="403" width="39" height="6"/>
    <rect x="10" y="376" width="6" height="31"/>
    <rect x="43" y="376" width="6" height="31"/>
    <rect x="64" y="376" width="984" height="10"/>
    <rect x="64" y="398" width="450" height="10"/>
    <rect x="0" y="425" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="437" width="39" height="6"/>
    <rect x="10" y="464" width="39" height="6"/>
    <rect x="10" y="437" width="6" height="31"/>
    <rect x="43" y="437" width="6" height="31"/>
    <rect x="64" y="437" width="984" height="10"/>
    <rect x="64" y="459" width="450" height="10"/>
    <rect x="0" y="486" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="498" width="39" height="6"/>
    <rect x="10" y="525" width="39" height="6"/>
    <rect x="10" y="498" width="6" height="31"/>
    <rect x="43" y="498" width="6" height="31"/>
    <rect x="64" y="498" width="984" height="10"/>
    <rect x="64" y="520" width="450" height="10"/>
    <rect x="0" y="547" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="559" width="39" height="6"/>
    <rect x="10" y="586" width="39" height="6"/>
    <rect x="10" y="559" width="6" height="31"/>
    <rect x="43" y="559" width="6" height="31"/>
    <rect x="64" y="559" width="984" height="10"/>
    <rect x="64" y="581" width="450" height="10"/>
    <rect x="0" y="608" rx="0" ry="0" width="1059" height="1" />

    <rect x="10" y="620" width="39" height="6"/>
    <rect x="10" y="647" width="39" height="6"/>
    <rect x="10" y="620" width="6" height="31"/>
    <rect x="43" y="620" width="6" height="31"/>
    <rect x="64" y="620" width="984" height="10"/>
    <rect x="64" y="642" width="450" height="10"/>
    <rect x="0" y="669" rx="0" ry="0" width="1059" height="1" />
  </ContentLoader>
  </div>
    </>
  )
}

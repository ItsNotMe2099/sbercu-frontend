import styles from './index.module.scss'
import PlusSvg from 'components/svg/PlusSvg'
import Search from 'components/svg/Search'
import Folder from 'components/svg/Folder'
import CreateGroup from 'components/svg/CreateGroup'
import Invite from 'components/svg/Invite'

import Link from 'next/link'
interface Props {
 items: any[]
}

export default function BreadCrumbs({items}: Props) {
  return (
      <div className={styles.root}>
          {items.map((item, index) => <div className={styles.item}>{index > 0 &&  <div className={styles.separator}>←</div>}<Link href={item.link}><a className={styles.link}>{item.name}</a></Link></div>)}
      </div>

  )
}

BreadCrumbs.defaultProps = {

}

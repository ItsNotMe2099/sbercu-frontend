import styles from './index.module.scss'
import cx from 'classnames'
import Link from 'next/link'

interface Props {
    items: any[]
    className?: string
}

export default function BreadCrumbs({ items, className }: Props) {
    console.log("breadItems", items, className);
    const noop = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <div className={cx(styles.root, className)}>
            {items.map((item, index) => <div
                className={`${styles.item} ${(index === items.length - 2 && items.length > 2) && styles.itemPrevious}`}>{index > 0 &&
            <div className={styles.separator}>←</div>}{(index === items.length - 2 && items.length > 2) &&
            <Link href={item.link}><a className={cx(styles.previousLink, {[styles.deleted]: item.deleted})} onClick={item.deleted ? noop : null}>...</a></Link>}
            <Link href={item.link}><a
                className={cx(styles.link,  {[styles.deleted]: item.deleted})} onClick={item.deleted ? noop : null}>{item.name}</a></Link></div>)}
        </div>

    )
}

BreadCrumbs.defaultProps = {}

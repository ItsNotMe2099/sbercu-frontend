import Button from 'components/ui/Button'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import {useThrottleFn} from '@react-cmpt/use-throttle'


interface Props {
    placeholder?: string,
    onChange?: (value) => void
    onClick?: () => void
    searchValue?: string
}

export default function InputSearch(props: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('');
    const router = useRouter();


    useEffect(() => {
        if(props.searchValue && !value) {
            setValue(props.searchValue);
        }
    }, [props.searchValue])
    const handleSubmit = () => {
        if(value) {
            router.push(`/search?query=${value}`);
        }
    }
    const { callback: onChange, cancel: cancelSaveViewHistory, callPending: saveViewHistoryPending } = useThrottleFn(props.onChange, 800)

    const handleSearch = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    }

    return (
            <div className={isOpen ? styles.inputContainer__mobile : styles.inputContainer}>
                <input
                    name="query"
                    type='text'
                    value={value}
                    autoComplete={'off'}
                    onChange={handleSearch}
                    placeholder={props.placeholder}
                />
                <div onClick={props.onClick} className={styles.btn}><Button search type="button"></Button></div>
                <div onClick={props.onClick} className={styles.mobileBtns}>
                    {isOpen ?
                        <div className={styles.cross}><Button cross type="button" onClick={() => setIsOpen(false)}></Button></div>
                        :
                        <Button search type="button" onClick={() => setIsOpen(true)}></Button>}</div>
            </div>
    )
}

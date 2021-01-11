import Button from 'components/ui/Button'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import styles from './index.module.scss'


interface Props {
  placeholder?: string,
    onChange?: (value) => void
    onClick?: () => void
    searchValue?: string
    suggestions?: any[]
}

export default function InputSearch(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("");
    const [filtered, setFiltered] = useState([])
    const [showSuggestions, setIsShow] = useState(false)
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
    const handleSearch = (e) => {
        const suggestions = props.suggestions
        const userInput = e.currentTarget.value
        const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        setValue(e.currentTarget.value);
        setFiltered(filteredSuggestions)
        setIsShow(true)
    }
    const handleClick = (e) => {
      setValue(e.currentTarget.innerText);
      setFiltered([])
      setIsShow(false)
    }
  return (
    <form className={isOpen ? styles.open : styles.form} action='/search' onSubmit={handleSubmit}>
      <div className={isOpen ? styles.inputContainer__mobile : styles.inputContainer}>
          <input
              name="query"
              type='text'
              value={value}
              onChange={handleSearch}
              placeholder={props.placeholder}
          />
          {showSuggestions && value ? filtered.length ? 
          <ul>
            {filtered.map((suggestion) => 
              <li key={suggestion} onClick={handleClick}>{suggestion}</li>
            )}
          </ul> : <div>No suggestions</div>: null}
          <div onClick={props.onClick} className={styles.btn}><Button search type="button"></Button></div>
          <div onClick={props.onClick} className={styles.mobileBtns}>
          {isOpen ?
          <div className={styles.cross}><Button cross type="button" onClick={() => setIsOpen(false)}></Button></div>
          :
          <Button search type="button" onClick={() => setIsOpen(true)}></Button>}</div>
      </div>
    </form>
  )
}

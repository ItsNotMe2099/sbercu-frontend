import SelectInput from "components/ui/Inputs/SelectInput";
import { useCallback, useEffect, useState } from "react";
import request from "utils/request";
import { useDispatch, useSelector } from 'react-redux'


interface Props {

}

export default function SelectTagCategory(props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const handleOnChange = (value) => {
    console.log("OnChangeLocValue", value)
    props.input.onChange(value);
  }
  const getSearchCategory = ({id = '',search = ''}) => {
    return request({url: `/api/tag-category?s=${JSON.stringify({categoryType: props.categoryType})}`, method: 'GET'})
        .then((response) => {
          const data = response.data;
          console.log("Response", data)
          setOptions(data ? data.map(item => {
            return {
              value: item.id,
              label: item.name,
            }
          }) : [])
        })
  }
  useEffect(() => {
    getSearchCategory({id: props.input.value?.value || props.input.value});
  }, [])
  const handleOnSearchChange = (value) => {
    if(!value){
      return;
    }
    setValue(value)
    getSearchCategory({search: value})
  }

  return (
      <div>
        <SelectInput {...props} options={options} onSearchChange={handleOnSearchChange}/>
      </div>
  )
}

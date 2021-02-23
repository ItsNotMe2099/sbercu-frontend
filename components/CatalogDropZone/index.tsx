import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import AddFileButton from "components/ui/Inputs/FilesUploadInput/components/AddFileBtn";
import FileWrapper, { FileEntity } from "components/ui/Inputs/FilesUploadInput/components/FileWrapper";
import React, {
  FunctionComponent,
  Children,
  cloneElement,
  isValidElement,
  ReactElement, useState, useCallback, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { shallowEqual } from 'recompose'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import styles from './index.module.scss'
import Cookies from 'js-cookie'
import nextId from "react-id-generator";


interface Props{
  onDrop: (files: File[]) => void
}

const CatalogDropZone = (props: Props) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const dragCounter = React.useRef(0);

  const handleDrag = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  const handleDragIn = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("DragIn", event.dataTransfer.items );
    dragCounter.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);
  const handleDragOut = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current > 0) return;
    setIsDragging(false);
  }, []);
  const handleDrop = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dragCounter.current = 0;
      console.log(event.dataTransfer.files);
      props.onDrop(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("dragenter", handleDragIn);
    window.addEventListener("dragleave", handleDragOut);
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrop);
    return function cleanUp() {
      window.removeEventListener("dragenter", handleDragIn);
      window.removeEventListener("dragleave", handleDragOut);
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrop);
    };
  });

  return (
    <div className={`${styles.root} ${isDragging && styles.rootIsDragging}`}>
      <div className={styles.wrapper}>
      <div className={styles.text}>Загрузите файлы</div>
      </div>

    </div>
  )
}



export default CatalogDropZone

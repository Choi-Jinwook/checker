import styled from '@emotion/styled'
import { Label } from '@shared/components'
import Dropzone from 'react-dropzone'

interface ImageDropProps {
  handleSelectedFile: (files: any) => void
  imageFile: any
}

const ImageDrop = ({ handleSelectedFile, imageFile }: ImageDropProps) => {
  return (
    <Dropzone onDrop={handleSelectedFile}>
      {({ getRootProps, getInputProps }) => {
        return (
          <FileContainer {...getRootProps()}>
            <FileInput {...getInputProps()} style={{ display: 'none' }} />
            <FileInput
              id="file"
              value={imageFile?.name || '첨부파일'}
              placeholder="첨부파일"
              onChange={(files) => handleSelectedFile(files.target.files)}
              readOnly
            />
            <FileLabel text="파일 찾기" htmlFor="file" />
          </FileContainer>
        )
      }}
    </Dropzone>
  )
}

export default ImageDrop

const FileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FileInput = styled.input`
  display: inline-block;
  width: 60%;
  height: 2.1rem;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  color: #999999;
`

const FileLabel = styled(Label)`
  display: inline-block;
  width: 40%;
  height: 1.2rem;
  margin-left: 0.5rem;
  padding: 0.5rem 0.8rem;
  vertical-align: middle;
  background-color: #999999;
`

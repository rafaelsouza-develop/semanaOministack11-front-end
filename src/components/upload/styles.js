import styled, { css} from 'styled-components';

const dragActive = css`
    border-color: #78e5d5
`

const dragRejected = css`
    border-color: #e57878
`


export const DropContainer = styled.div.attrs({
        className:'dropzone'
})`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;

    transition: height 0.2s ease;

    ${props => props.isDraActive && dragActive}
    ${props => props.isDragRejected && dragRejected}
`

export const UploadMessage = styled.p`

`

   

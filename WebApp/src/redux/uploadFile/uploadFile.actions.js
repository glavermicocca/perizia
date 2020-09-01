import axios from 'axios'
import uploadFileTypes from './uploadFile.types'
import {
  loadIdToken
} from "../../utils/apiUtils";

import { datiSuccess } from '../../actions/immagini'

export const setUploadFile = data => ({
  type: uploadFileTypes.SET_UPLOAD_FILE,
  payload: data,
})

export const setUploadProgress = (id, progress) => ({
  type: uploadFileTypes.SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
})

export const successUploadFile = id => ({
  type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
  payload: id,
})

export const failureUploadFile = id => ({
  type: uploadFileTypes.FAILURE_UPLOAD_FILE,
  payload: id,
})

export const uploadFile = (files, id) => dispatch => {
  if (files.length) {
    const idToken = loadIdToken();
    files.forEach(async file => {
      const formPayload = new FormData()
      formPayload.append('file', file.file)

      const headers = {
        Authorization: `Bearer ${idToken}`,
        id
      }

      try {
        await axios({
          baseURL: '/',
          url: '/file_immagini',
          method: 'post',
          data: formPayload,
          headers,
          onUploadProgress: progress => {
            const { loaded, total } = progress

            const percentageProgress = Math.floor((loaded / total) * 100)
            dispatch(setUploadProgress(file.id, percentageProgress))
          },
        })
        dispatch(successUploadFile(file.id))
        dispatch()
      } catch (error) {
        dispatch(failureUploadFile(file.id))
      }
    })
  }
}

import axios from 'axios'
import uploadFileTypes from './uploadFile.types'
import {
  loadIdToken
} from "../../utils/apiUtils";

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

export const uploadFile = files => dispatch => {
  if (files.length) {
    const idToken = loadIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`
    }
    files.forEach(async file => {
      const formPayload = new FormData()
      formPayload.append('file', file.file)

      try {
        await axios({
          baseURL: '/',
          url: '/file',
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
      } catch (error) {
        dispatch(failureUploadFile(file.id))
      }
    })
  }
}

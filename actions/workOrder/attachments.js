import AttachmentsService from '../../services/workOrder/attachments'

export const ACTION_ATTACHMENTS_DOWNLOAD_SUCCESS = 'attachment-download-success';

export const ACTION_ATTACHMENTS_SUCCESS = 'attachment-success';
export const ACTION_ATTACHMENTS_CREATE_SUCCESS = 'attachment-create-success';
export const ACTION_ATTACHMENTS_REQUESTED_ERROR = 'attachment-requested-error';
export const ACTION_ATTACHMENTS_REQUEST = 'attachment-request';

export function attachmentsRequest(token, id) {

  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_ATTACHMENTS_REQUEST, payload: true
      });

      const attachment = await AttachmentsService.getAttachmentList(token, id);
      dispatch({
        type: ACTION_ATTACHMENTS_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_ATTACHMENTS_SUCCESS, payload: attachment
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_ATTACHMENTS_REQUESTED_ERROR, payload: err
      });
    }
  }
}

export function attachmentsDownloadRequest(token, id) {

  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_ATTACHMENTS_REQUEST, payload: true
      });

      const attachmentData = await AttachmentsService.downloadAttachmentById(token, id);
      dispatch({
        type: ACTION_ATTACHMENTS_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_ATTACHMENTS_DOWNLOAD_SUCCESS, payload: attachmentData
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_ATTACHMENTS_REQUESTED_ERROR, payload: err
      });
    }
  }
}

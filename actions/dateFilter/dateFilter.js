export const ACTION_FILTER_SELECTED_DATE = 'filter-selected-date';

export function setSelectedDate(data) {

  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_FILTER_SELECTED_DATE, payload: data
      });

    } catch (err) {
      console.log(err)
    }
  }
}

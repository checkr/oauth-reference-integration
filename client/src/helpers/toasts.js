const toastSuccess = options => {
  return {
    ...{
      variant: 'success',
      body: 'Your request has been processed successfully',
      header: 'Success',
    },
    ...options,
  }
}

const toastFailure = options => {
  return {
    ...{
      variant: 'danger',
      body: 'Your request has been processed unsuccessfully',
      header: 'Something went wrong',
    },
    ...options,
  }
}

export {toastSuccess, toastFailure}

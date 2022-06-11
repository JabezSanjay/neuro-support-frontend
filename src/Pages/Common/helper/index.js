import axios from '../../../axiosConfig'

export const getConnectedUser = async () => {
  return await axios.get('/connected/users')
}

import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'

export const GoBack = () => {
  return (
    <Link to={paths.home} 
      className='flex items-center gap-2 mb-10 cursor-pointer text-default-500'
    >
      <FaRegArrowAltCircleLeft />
      Back
    </Link>
  )
}

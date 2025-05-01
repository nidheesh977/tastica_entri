import { FaUserShield } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa'; 
import { DashboardCard } from '../../../components/shared/DashboardCard/DashboardCard'
import { tertiary } from '../../../utils/constants';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className={`mx-2  bg-[${tertiary}]`}>
        <div className='flex flex-col pb-20  py-10 mx-auto my-20 h-1/2 md:w-1/2 xl:w-1/4 items-center justify-center shadow-2xl rounded-lg '>
         <h1 className="text-3xl py-5 font-thin text-center text-[#155E95] ">
          Welcome
        </h1>
<div className='w-full flex flex-col gap-2  px-10'>

<Link to='admin/login'><DashboardCard icon={<FaUserShield className='text-white text-2xl'/>} action='Admin Login'/></Link>

<Link to='staff/login'><DashboardCard icon={<FaUserTie className='text-white text-2xl'/>} action='Staff Login'/></Link>
</div>
        </div>


    </div>
  )
}

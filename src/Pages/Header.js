import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { enqueueSnackbar } from 'notistack';

import { UserContext } from '../UserContext';
import { FaBlog } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { FaCashRegister } from "react-icons/fa6";
import { MdOutlineCreateNewFolder } from "react-icons/md";



export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
//  const [loadingS, setLoading] = useState(true);



  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
     console.log(token)
      const response = await fetch(`${process.env.REACT_APP_URL}profile`, {
        credentials: 'include',
        method:'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userInfo = await response.json();
      setUserInfo(userInfo);
      // setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // setLoading(false); // Set loading to false on error as well
    }
  };

  fetchData();
}, [setUserInfo]);


 async function logout() {
    const response=await fetch(`${process.env.REACT_APP_URL}logout`, {
      credentials: 'include',
      method: 'POST'
    });
if(response.ok){
  localStorage.removeItem('token');
    enqueueSnackbar("Logout Successfull...",{variant:'success'},{ autoHideDuration: 2000 })
}else{
    enqueueSnackbar("Logout Failed...",{variant:'error'},{ autoHideDuration: 2000 })
}
    setUserInfo(null);
  }

  // const override = {
     
  //   minHeight: "100vh",  // Center vertically
  //   margin: "0 auto",
    
  //   color: '#767676'
  //   };
    
  //   const color = '#767676';  // Define color
  //   const loading = true;  // Define loading

  const username = userInfo?.username;

  return (
    <header className="flex justify-between gap-5 mb-20 items-baseline">
        
        <Link to="/" className="font-bold md:text-2xl test-sm">
        <div className='flex md:gap-2 '>
            <div> <FaBlog /></div>
            <div>MyBlog</div>
        </div>
            
      </Link>
    

      

      {/* { {loadingS ? (
        // Show loading spinner while fetching data
        <div className="flex  items-center justify-center  mx-auto">
            <ClipLoader className=" mt-20"
          color={color}
          loading={loading}
          css={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      ) :  */}
        <nav className="flex md:gap-5 ">
          {username && (
            <div className="flex items-baseline md:gap-7 gap-3">
              <Link to={'/create'} className="md:text-xl text-xs font-semibold ">
              <div className='flex md:gap-1 items-baseline justify-between '>
                
                <div>Create New Post</div>
                <div> <MdOutlineCreateNewFolder  /></div>
             </div>
              </Link>
              <button className="hover:cursor-pointer text-xs md:text-xl font-semibold" onClick={logout}>
              <div className='flex gap-2 items-baseline '>
                
                <div>Logout</div>
                <div> <TbLogout2  /></div>
             </div>
              </button>
            </div>
          )}
          {!username && (
            <div className='flex gap-1'>
              <Link to="/login" className="md:text-xl font-bold ">
              <div className='flex md:gap-0 items-baseline justify-between'>
                
                 <div>Login</div>
                 <div> <BiLogIn /></div>
              </div>
              </Link>
              <Link to="/register" className="md:text-xl font-bold">
              <div className='flex md:gap-1 items-baseline gap-1 mx-1 '>
                
                <div>Register</div>
                <div> <FaCashRegister /></div>
             </div>
              </Link>
            </div>
          )}
        </nav>
      {/* )} */}
    </header>
  );
}
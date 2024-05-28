import { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader"; // Import the ClipLoader component
import Post from "../Post";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}post`)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false); // Set loading to false when posts are fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false in case of an error
      });

      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log(token)
          const response = await fetch(`${process.env.REACT_APP_URL}profile`, {
            credentials: 'include',
            method: 'GET',
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
      }
        fetchData()
  }, [setUserInfo]);

  return (
    <>
      {loading ? (
        // Render loading indicator while posts are being fetched
        <div className="flex items-center justify-center mt-20">
          <ClipLoader
            color="#767676"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        // Render posts once fetched
        posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)
      )}
    </>
  );
}
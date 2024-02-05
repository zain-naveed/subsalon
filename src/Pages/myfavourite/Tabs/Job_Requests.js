import React, { useState, useEffect } from 'react';
import Posts from './Shared/Posts';
import ListPagination from '../../../Shared/Components/Pagination/ListPagination';
import { vectorMan, SearchIcons, Searchicon } from "./../../../Assets/index";
// import Data from "./Shared/Data.json";
import { Spinner } from 'react-bootstrap'
import Data from "./Shared/Applied.json";
import { getAllRequestJobs } from '../../../Shared';
import { getMyFavSalon } from "../../../Shared/Services/myFavouriteServices"


const Job_Requests = ({ check, favSaloonup }) => {
  const [posts, setPosts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState();
  const [loader, setLoader] = useState(false);
  const [removePage,setremovePage] = useState(false);
  // const [Data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [TotalDoc, setTotalDoc] = useState(0)
  const [search, setSearch] = useState("")
  const [reload, setReload] = useState("")


  // Get current posts
  let indexOfLastPost = currentPage * TotalDoc;
  // const indexOfFirstPost = indexOfLastPost - TotalDoc;
  // indexOfLastPost = (indexOfLastPost > TotalDoc) ? TotalDoc : indexOfLastPost
  const indexOfFirstPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage-1) + 10):1
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  indexOfLastPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage) * 10):10
  
  // Change page
  const paginate = pageNumber => {
    
    setCurrentPage(pageNumber)
  };

  const handleSearch = (search) => {
    setSearch(search)
  }

  
  useEffect(() => {
    getFav()
  }, [currentPage, search]);
  const getFav = () => {
    !search && setLoader(true)
    let query = `?limit=${10}&page=${currentPage &&(currentPage - 1)}${search ? '&search=' + search : ""}`
    getMyFavSalon(query).then(({ data: { data } }) => {
      
      setTotalDoc(data?.doc)
      setPosts(data?.fav);
    }).catch(err => {
      
    }).finally(() => setLoader(false))
  }

  useEffect(()=>{
    if(currentPage > 1 && !posts.length && removePage){
      getFav();
      setCurrentPage(currentPage - 1)
      setremovePage(false)
    }
  })

  return (
    <div className='text-center'>
      <div className='divForSearch'>
        <div style={{ position: "relative" }}>
          <img className='SearchIcon' src={Searchicon} />
          <input className='JobIpt' placeholder='Search for Items' onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>
      {
        loader ? <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> : <>
          <Posts posts={posts} setPosts={setPosts} favSaloonup={favSaloonup} handleSearch={handleSearch} TotalDoc={TotalDoc} currentPage={currentPage}
            setTotalDoc={setTotalDoc} indexOfFirstPost={indexOfFirstPost} check setremovePage={setremovePage} />
          <ListPagination
            indexOfLastPost={indexOfLastPost}
            indexOfFirstPost={indexOfFirstPost}
            postsPerPage={postsPerPage}
            totalPosts={TotalDoc}
            paginate={paginate}
            posts={posts}
            setCurrentPage={setCurrentPage}

          />
        </>
      }



    </div>
  );
};

export default Job_Requests;

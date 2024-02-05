import React, { useState, useEffect } from 'react';
import Posts from './Shared/Posts';
import { vectorMan, SearchIcons, Searchicon } from "./../../../Assets/index";
import ListPagination from '../../../Shared/Components/Pagination/ListPagination';
import './../JobListings.css';
// import Data from "./Shared/Data.json";
import Data from "./Shared/TableData.json";
import { getAllOpenJob, toastMessage } from '../../../Shared'
import { toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";
import { deleteAJob } from "../../../Shared/Services/allJobs"
import { de } from 'date-fns/locale';




const Opened = ({ setOpenJobCount }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  // const [Data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [TotalDoc, setTotalDoc] = useState(0);

  // Get current posts
  let indexOfLastPost = currentPage * TotalDoc;
  
  const indexOfFirstPost = ((currentPage > 1 && (currentPage) * 10) > TotalDoc) ? TotalDoc : currentPage > 1 ? (((currentPage - 1) * 10) + 1) : 1
  
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  indexOfLastPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc : currentPage > 1 ? ((currentPage) * 10) : 10

  // Get current posts
  // let indexOfLastPost = currentPage * TotalDoc;
  // const indexOfFirstPost = indexOfLastPost - TotalDoc;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // indexOfLastPost = (indexOfLastPost > TotalDoc) ? TotalDoc : indexOfLastPost

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = (search) => {

    setSearch(search)
  }

  const handlePosts = (jobId, arr) => {

    // setPosts(arr);

  }

  useEffect(() => {
    handlePosts();
  })


  useEffect(() => {
    // const fetchPosts = async () => {
    // setPosts(Data)
    // };

    getOpenJobs()
    // fetchPosts();
  }, [search, currentPage]);

  const getOpenJobs = () => {
    !search && setLoader(true)
    let query = `?limit=${10}&page=${(currentPage - 1)}${search ? '&search=' + search : ""}`

    getAllOpenJob(query).then(({ data: { data } }) => {
      
      setTotalDoc(data?.doc)
      // setPosts(Data);
      setPosts(data?.openJob);
      setOpenJobCount(data?.doc)
      
    }).catch((err) => {
      toastMessage("error", err?.response?.data?.message)
    }).finally(() => setLoader(false))
  }


  return (
    <div className="text-center">
      <div className='divForSearch'>
        <div style={{ position: "relative" }}>
          <img className='SearchIcon' src={Searchicon} />
          <input className='JobIpt' placeholder='Search for Items' onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>
      {loader ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Posts
            posts={posts}
            handleSearch={handleSearch}
            title={"Closed"}
            setPosts={setPosts}
          />
          {/* <ListPagination
            indexOfLastPost={indexOfLastPost}
            indexOfFirstPost={indexOfFirstPost}
            postsPerPage={postsPerPage}
            totalPosts={TotalDoc}
            paginate={paginate}
          /> */}
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
      )}
    </div>
  );
};

export default Opened;
